/**
 * Mac Chrome does not follow 302 redirects when writing to Cache/IndexedDB via fetch;
 * Hugging Face CDN redirects (e.g. huggingface.co → cdn-lfs.huggingface.co), and the
 * cache layer chokes on the redirected response. Re-fetch the final URL directly so
 * the cache gets a clean non-redirected response. Must run before any WebLLM import/init.
 */
if (typeof window !== "undefined" && typeof globalThis.fetch === "function") {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (
    input: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<Response> => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof Request
          ? input.url
          : input.toString();

    const response = await originalFetch(input, {
      ...init,
      redirect: "follow",
      credentials: "omit",
      mode: "cors",
    });

    if (response.redirected && response.url !== url) {
      return originalFetch(response.url, {
        ...init,
        redirect: "follow",
        credentials: "omit",
        mode: "cors",
      });
    }

    return response;
  };
}
