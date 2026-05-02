import { NextResponse } from "next/server";

/**
 * Apple App Site Association (Universal Links).
 * Must be at /.well-known/apple-app-site-association with application/json
 * and no redirect. See: https://developer.apple.com/documentation/xcode/supporting-associated-domains
 */

/** Serve a fixed document at build time when possible (edge/CDN friendly). */
export const dynamic = "force-static";

const APPLE_APP_SITE_ASSOCIATION = {
  applinks: {
    apps: [],
    details: [
      {
        appID: "JAGSDR4G38.com.dopin.app.beta",
        paths: ["/profile/*", "/dopin/*"],
      },
    ],
  },
} as const;

export async function GET() {
  return NextResponse.json(APPLE_APP_SITE_ASSOCIATION, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // Short TTL + revalidation so association updates propagate without stale CDN forever
      "Cache-Control": "public, max-age=300, s-maxage=300, must-revalidate",
    },
  });
}
