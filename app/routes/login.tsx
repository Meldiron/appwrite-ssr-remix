import { createCookie } from "@remix-run/node";
import { LoaderArgs } from "@remix-run/node";
import {
  AppwriteEndpoint,
  AppwriteHostname,
  AppwriteProject,
  SsrHostname,
} from "~/AppwriteService";
import * as setCookie from "set-cookie-parser";

export async function loader(req: LoaderArgs) {
  try {
    const response = await fetch(
      `${AppwriteEndpoint}/account/sessions/anonymous`,
      {
        method: "POST",
        headers: {
          "x-appwrite-project": AppwriteProject,
        },
      }
    );

    const json = await response.json();

    if (json.code >= 400) {
      return new Response(
        JSON.stringify({
          message: json.message,
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const ssrHostname =
      SsrHostname === "localhost" ? SsrHostname : "." + SsrHostname;
    const appwriteHostname =
      AppwriteHostname === "localhost"
        ? AppwriteHostname
        : "." + AppwriteHostname;

    const cookiesStr = (response.headers.get("set-cookie") ?? "")
      .split(appwriteHostname)
      .join(ssrHostname);

    const cookiesArray = setCookie.splitCookiesString(cookiesStr);
    const cookiesParsed = cookiesArray.map((cookie) =>
      setCookie.parseString(cookie)
    );

    const headers = new Headers();

    for (const cookie of cookiesParsed) {
      const cookieObj = createCookie(cookie.name, {
        domain: cookie.domain,
        secure: cookie.secure,
        sameSite: cookie.sameSite as any,
        path: cookie.path,
        maxAge: cookie.maxAge,
        httpOnly: cookie.httpOnly,
        expires: cookie.expires,
      });

      headers.append("Set-Cookie", await cookieObj.serialize(cookie.value));
    }

    headers.append("Content-Type", "application/json");

    return new Response(JSON.stringify(json), {
      status: 400,
      headers,
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        message: err.message,
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
