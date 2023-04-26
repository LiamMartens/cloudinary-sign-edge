export type SignApiOptions = Record<string, unknown>;

export async function api_sign_request(
  options: SignApiOptions,
  secret: string
): Promise<string> {
  const toSign = Object.entries(options).filter(([, v]) => (
    typeof v !== 'undefined'
    && v !== null
    && String(v).length > 0
  )).map(([k, v]) => {
    const value = Array.isArray(v) ? v.join(',') : String(v);
    return `${k}=${value}`;
  }).sort().join('&');
  const digest = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(toSign + secret));
  const hashHex = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join('');
  return hashHex;
}
