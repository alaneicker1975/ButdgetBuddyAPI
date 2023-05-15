export const toRouteSegment = (str) =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? '/' : '') + $.toLowerCase(),
  );
