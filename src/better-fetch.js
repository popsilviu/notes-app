class FetchError extends Error {
  constructor(res) {
    super("Bad fetch response");
    this.response = res;
  }
}

async function fetch2(...options) {
  const res = await fetch(...options);
  if (!res.ok) {
    throw new FetchError(res);
  }
  return res;
}
