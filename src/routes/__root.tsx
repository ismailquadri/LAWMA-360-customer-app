import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";
import { StoreProvider } from "../lib/store";
import { MockupFrame } from "../components/MockupFrame";
// import { EvaluationAccessWall } from "../components/legal/EvaluationAccessWall";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="ios-card w-full max-w-[340px] p-6 text-center">
        <p className="text-[48px] font-bold leading-none tracking-tight text-primary">404</p>
        <h1 className="mt-3 text-[20px] font-bold tracking-tight text-foreground">Page not found</h1>
        <p className="mt-1.5 text-[14px] text-muted-foreground">The screen you’re looking for doesn’t exist or has been moved.</p>
        <div className="mt-5">
          <Link to="/" className="inline-flex min-h-[46px] w-full items-center justify-center rounded-[12px] bg-primary px-4 text-[16px] font-semibold text-primary-foreground">Go home</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5">
      <div className="ios-card w-full max-w-[340px] p-6 text-center">
        <h1 className="text-[20px] font-bold tracking-tight text-foreground">This screen didn’t load</h1>
        <p className="mt-1.5 text-[14px] text-muted-foreground">Something went wrong. You can try again or head back home.</p>
        <div className="mt-5 flex flex-col gap-2">
          <button type="button" onClick={() => { router.invalidate(); reset(); }} className="inline-flex min-h-[46px] w-full items-center justify-center rounded-[12px] bg-primary px-4 text-[16px] font-semibold text-primary-foreground">Try again</button>
          <a href="/" className="inline-flex min-h-[46px] w-full items-center justify-center rounded-[12px] bg-[#767680]/[0.12] px-4 text-[16px] font-semibold text-foreground">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LAWMA 360 — Customer app" },
      { name: "description", content: "Request smart bins and pickups, pay your partner and reach LAWMA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
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
      {/* Security layer commented out for now:
      <EvaluationAccessWall>
      */}
        <StoreProvider>
          <MockupFrame>
            <Outlet />
          </MockupFrame>
        </StoreProvider>
      {/*
      </EvaluationAccessWall>
      */}
    </QueryClientProvider>
  );
}
