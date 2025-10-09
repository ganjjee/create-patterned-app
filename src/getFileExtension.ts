export function getFileExtension(
  dir: string,
  ts: boolean,
  framework: string
): string {
  const isReact = framework === "react";
  const isReactComponent =
    /components|pages|templates|organisms|molecules|atoms/.test(dir);

  if (ts) {
    return isReact && isReactComponent ? "tsx" : "ts";
  } else {
    return isReact && isReactComponent ? "jsx" : "js";
  }
}
