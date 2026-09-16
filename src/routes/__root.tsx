import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/923467558646"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 focus:ring-offset-background"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="h-7 w-7"
        aria-hidden="true"
      >
        <path d="M16 0C7.164 0 0 7.164 0 16c0 2.977.81 5.762 2.227 8.157l-2.227 6.843 7.063-1.85A15.93 15.93 0 0 0 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm8.057 22.49c-.368 1.036-2.064 1.894-2.85 1.95-.735.052-1.437.15-4.158-.897-3.51-1.417-5.773-4.958-5.95-5.19-.175-.233-1.418-1.886-1.418-3.596s.9-2.545 1.22-2.886c.317-.34.735-.425.98-.425.244 0 .49 0 .704.01.246.01.574-.094.896.684.32.78 1.09 2.73 1.184 2.927.093.197.155.425.032.68-.123.246-.184.397-.368.626-.184.23-.38.48-.55.65-.184.183-.374.38-.16.747.214.367.954 1.57 2.04 2.54 1.4 1.254 2.58 1.643 3.02 1.82.436.175.69.147.945-.09.255-.233 1.1-1.28 1.39-1.72.29-.437.58-.365.98-.22.396.147 2.53 1.19 2.96 1.407.43.217.72.33.825.514.107.184.07 1.07-.3 2.107z" />
      </svg>
    </a>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "EcommercewithFaisal — Ecommerce" },
      {
        name: "description",
        content:
          "Faisal  helps e-commerce brands scale Amazon storefronts to $50K–$300K+/month with precision PPC, listing architecture, and supply chain strategy.",
      },
      { name: "author", content: "Faisal Abdul" },
      { property: "og:title", content: "EcommercewithFaisal — Amazon Ecommerce Expert & Growth Strategist" },
      {
        property: "og:description",
        content:
          "Faisal  helps e-commerce brands scale Amazon storefronts to $50K–$300K+/month with precision PPC, listing architecture, and supply chain strategy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "EcommercewithFaisal — Amazon Ecommerce Expert & Growth Strategist" },
      { name: "twitter:description", content: "Faisal  helps e-commerce brands scale Amazon storefronts to $50K–$300K+/month with precision PPC, listing architecture, and supply chain strategy." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/gm8FIh4ueiXEknuMNcxksFnxalA3/social-images/social-1783530470390-ChatGPT_Image_Jul_8,_2026,_08_22_00_PM.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/gm8FIh4ueiXEknuMNcxksFnxalA3/social-images/social-1783530470390-ChatGPT_Image_Jul_8,_2026,_08_22_00_PM.webp" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png?v=3", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster />
      <FloatingWhatsApp />
    </QueryClientProvider>
  );
}
