import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Mail, MailOpen, Trash2, LogOut, RefreshCw, X } from "lucide-react";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export const Route = createFileRoute("/admin")({
  ssr: false,
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin Panel — EcommercewithFaisal" },
      { name: "description", content: "Private admin panel for managing contact messages." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin Panel — EcommercewithFaisal" },
      { property: "og:description", content: "Private admin panel for managing contact messages." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setSignedIn(!!data.user);
      setChecking(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSignedIn(!!session?.user);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  return signedIn ? <Inbox /> : <SignIn />;
}

function SignIn() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: String(data.get("email")),
      password: String(data.get("password")),
    });
    setLoading(false);
    if (error) toast.error(error.message);
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-[32px] border border-hairline bg-surface/80 p-8 backdrop-blur"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">Admin</p>
        <h1 className="mt-3 font-display text-3xl font-bold">Sign In</h1>
        <div className="mt-8 space-y-5">
          <label className="block">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-2xl border border-hairline bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Password
            </span>
            <input
              name="password"
              type="password"
              required
              className="mt-2 w-full rounded-2xl border border-hairline bg-background/60 px-4 py-3 text-sm outline-none transition focus:border-primary"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          Sign In
        </button>
      </form>
    </div>
  );
}

function Inbox() {
  const [rows, setRows] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Submission | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setRows((data ?? []) as Submission[]);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const toggleRead = async (row: Submission) => {
    const { error } = await supabase
      .from("contact_submissions")
      .update({ is_read: !row.is_read })
      .eq("id", row.id);
    if (error) return toast.error(error.message);
    setRows((r) => r.map((x) => (x.id === row.id ? { ...x, is_read: !row.is_read } : x)));
  };

  const remove = async (row: Submission) => {
    if (!confirm("Delete this message?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", row.id);
    if (error) return toast.error(error.message);
    setRows((r) => r.filter((x) => x.id !== row.id));
    setActive((a) => (a?.id === row.id ? null : a));
    toast.success("Message deleted");
  };

  const openRow = async (row: Submission) => {
    setActive(row);
    if (!row.is_read) await toggleRead(row);
  };

  const unread = rows.filter((r) => !r.is_read).length;

  return (
    <div className="mx-auto min-h-screen w-full max-w-5xl px-6 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">Admin</p>
          <h1 className="mt-2 font-display text-4xl font-bold">Contact Messages</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {rows.length} total · {unread} unread
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => void load()}
            className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm transition hover:border-primary hover:text-primary"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={() => void supabase.auth.signOut()}
            className="inline-flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-sm transition hover:border-primary hover:text-primary"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </div>

      <div className="mt-10 space-y-3">
        {loading && <Loader2 className="animate-spin text-primary" />}
        {!loading && rows.length === 0 && (
          <p className="text-sm text-muted-foreground">No messages yet.</p>
        )}
        {rows.map((row) => (
          <div
            key={row.id}
            className={`flex flex-wrap items-center gap-4 rounded-2xl border p-5 transition ${
              row.is_read ? "border-hairline bg-surface/50" : "border-primary/40 bg-surface"
            }`}
          >
            <button onClick={() => void openRow(row)} className="min-w-0 flex-1 text-left">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{row.name}</span>
                {!row.is_read && (
                  <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    New
                  </span>
                )}
              </div>
              <div className="mt-1 truncate text-sm text-muted-foreground">
                {row.subject ? `${row.subject} — ` : ""}
                {row.message}
              </div>
              <div className="mt-1 text-xs text-muted-foreground/70">
                {row.email} · {new Date(row.created_at).toLocaleString()}
              </div>
            </button>
            <div className="flex gap-2">
              <button
                aria-label={row.is_read ? "Mark unread" : "Mark read"}
                onClick={() => void toggleRead(row)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline transition hover:border-primary hover:text-primary"
              >
                {row.is_read ? <Mail size={15} /> : <MailOpen size={15} />}
              </button>
              <button
                aria-label="Delete"
                onClick={() => void remove(row)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline transition hover:border-destructive hover:text-destructive"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
          onClick={() => setActive(null)}
        >
          <div
            className="max-h-[80vh] w-full max-w-xl overflow-y-auto rounded-[28px] border border-hairline bg-surface p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold">{active.name}</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {active.email}
                  {active.phone ? ` · ${active.phone}` : ""}
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  {new Date(active.created_at).toLocaleString()}
                </p>
              </div>
              <button
                aria-label="Close"
                onClick={() => setActive(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline transition hover:border-primary hover:text-primary"
              >
                <X size={15} />
              </button>
            </div>
            {active.subject && <p className="mt-6 text-sm font-semibold">{active.subject}</p>}
            <p className="mt-3 whitespace-pre-wrap leading-relaxed text-foreground/85">
              {active.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
