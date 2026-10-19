import hljs from "highlight.js/lib/common";

export function highlightCode(code: string, language?: string) {
  if (!language) {
    return hljs.highlightAuto(code).value;
  }

  if (!hljs.getLanguage(language)) {
    return hljs.highlightAuto(code).value;
  }

  return hljs.highlight(code, {
    language,
  }).value;
}
