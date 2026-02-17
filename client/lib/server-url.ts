import { headers } from "next/headers";

export function getBaseUrl() {
  const envUrl = process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl) {
    return envUrl.replace(/\/$/, "");
  }

  const headerList = headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const proto = headerList.get("x-forwarded-proto") ?? "http";

  if (host) {
    return `${proto}://${host}`;
  }

  return "http://localhost:3000";
}
