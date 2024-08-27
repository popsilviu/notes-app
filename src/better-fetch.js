class FetchError extends Error {
  constructor(res) {
    super(`Bad fetch response: ${res.status}`);
    this.response = res;
  }
}

async function fetch2(url, { timeoutMs = -1, ...options } = {}) {
  if (
    typeof options == "object" &&
    !("signal" in options) &&
    typeof timeoutMs == "number" &&
    timeoutMs > 0
  )
    options.signal = AbortSignal.timeout(timeoutMs);

  const res = await fetch(url, options);
  if (!res.ok) throw new FetchError(res);
  return res;
}

fetch2("https://httpbin.org/delay/10", { timeoutMs: 3000 });
