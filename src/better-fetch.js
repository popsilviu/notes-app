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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function exponentialRetry(fn, { level = 0, maxLevel = 3 } = {}) {
  try {
    return await fn();
  } catch (e) {
    if (level > maxLevel) throw e;

    // equivalent to (2 ** level) * 1000 + 1000
    await sleep((1000 << level) + 1000);

    return exponentialRetry(fn, { level: level + 1, maxLevel });
  }
}

function fetchRetry(url, { retries = 3, ...options } = {}) {
  return exponentialRetry(() => fetch2(url, options), { maxLevel: retries });
}
