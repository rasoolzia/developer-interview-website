import type { ReactElement, ReactNode } from "react";

import { highlightCode } from "../lib";
import { MarkdownCodeCopy } from "./markdown-code-copy";

type CodeElementProps = {
  children?: ReactNode;
};

type Props = {
  codeElement: ReactElement<CodeElementProps>;
  language?: string;
};

function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  if (node && typeof node === "object" && "props" in node) {
    return getTextContent(
      (node as ReactElement<CodeElementProps>).props.children,
    );
  }

  return "";
}

export function MarkdownCode({ codeElement, language }: Props) {
  const code = getTextContent(codeElement.props.children).replace(/\n$/, "");

  const highlightedCode = highlightCode(code, language);

  return (
    <div className="bg-muted/50 my-5 rounded-lg border">
      <div className="bg-muted sticky top-16 z-10 flex items-center justify-between rounded-lg border-b px-3 py-2">
        <span className="text-muted-foreground text-xs">{language ?? ""}</span>

        <MarkdownCodeCopy code={code} />
      </div>

      <pre dir="ltr" className="m-0! overflow-x-auto p-4 text-sm leading-6">
        <code
          className="question-code font-mono"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
}
