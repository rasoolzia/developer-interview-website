import type { ReactElement, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/shared/lib";

import { MarkdownCode } from "./markdown-code";

type CodeElementProps = {
  className?: string;
  children?: ReactNode;
};

type Props = {
  markdown: string;
  className?: string;
};

export function QuestionContent({ markdown, className }: Props) {
  return (
    <div className={cn("question-markdown", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          pre: ({ children }) => {
            const codeElement = children as ReactElement<CodeElementProps>;

            const language =
              codeElement?.props?.className?.match(/language-(\w+)/)?.[1];

            return (
              <MarkdownCode codeElement={codeElement} language={language} />
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
