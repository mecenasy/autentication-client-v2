import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  code: string;
}

export const CodeBlock = ({ code }: CodeBlockProps) => {
  return (
    <SyntaxHighlighter language="javascript" wrapLines showLineNumbers={true} style={vscDarkPlus}>
      {code}
    </SyntaxHighlighter>
  );
}; 