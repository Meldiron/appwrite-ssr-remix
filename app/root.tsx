import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/favicon.png" />

        <Meta />
        <Links />

        <title>Almost SSR | Remix</title>
        <meta
          name="description"
          content="Appwrite Loves Remix! Demo application with authorized server-side and client-side rendering."
        />

        <meta property="og:url" content="https://remix.ssr.almostapps.eu/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Almost SSR | Remix" />
        <meta
          property="og:description"
          content="Appwrite Loves Remix! Demo application with authorized server-side and client-side rendering."
        />
        <meta
          property="og:image"
          content="https://remix.ssr.almostapps.eu/cover.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="remix.ssr.almostapps.eu" />
        <meta
          property="twitter:url"
          content="https://remix.ssr.almostapps.eu/"
        />
        <meta name="twitter:title" content="Almost SSR | Remix" />
        <meta
          name="twitter:description"
          content="Appwrite Loves Remix! Demo application with authorized server-side and client-side rendering."
        />
        <meta
          name="twitter:image"
          content="https://remix.ssr.almostapps.eu/cover.png"
        />

        <link rel="stylesheet" href="/index.css" />
        <link rel="stylesheet" href="https://unpkg.com/@appwrite.io/pink" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@appwrite.io/pink-icons"
        />
      </head>
      <body className="theme-dark">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
