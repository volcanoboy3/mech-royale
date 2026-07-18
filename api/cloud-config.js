export default function handler(request, response) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;

  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    return response.status(405).json({ enabled: false });
  }

  response.setHeader("Cache-Control", "public, max-age=0, s-maxage=300");
  if (!url || !publishableKey) {
    return response.status(503).json({ enabled: false });
  }

  return response.status(200).json({ enabled: true, url, publishableKey });
}
