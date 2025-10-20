import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
  title?: string;
  variant?: 'default' | 'preview';
}

export const MarkdownRenderer = ({ content, title, variant = 'default' }: MarkdownRendererProps) => {
  const previewComponents: Components = {
    h1: ({ children }) => <span className="font-semibold text-blue-700">{children}</span>,
    h2: ({ children }) => <span className="font-semibold text-blue-600">{children}</span>,
    h3: ({ children }) => <span className="font-semibold text-blue-500">{children}</span>,
    strong: ({ children }) => <span className="font-semibold">{children}</span>,
    em: ({ children }) => <span className="italic">{children}</span>,
    ul: ({ children }) => <ul className="list-disc list-inside ml-2">{children}</ul>,
    ol: ({ children }) => <ol className="list-decimal list-inside ml-2">{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    p: ({ children }) => <p className="mb-1">{children}</p>,
  };

  const defaultComponents: Components = {
    h1: ({ children }) => (
      <h1 className="text-lg font-semibold text-blue-700 mb-2">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-base font-semibold text-blue-600 mb-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-sm font-semibold text-blue-500 mb-1">{children}</h3>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-gray-700">{children}</em>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-1 ml-4">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1 ml-4">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-gray-900 leading-relaxed">{children}</li>
    ),
    p: ({ children }) => (
      <p className="text-gray-900 leading-relaxed mb-2">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-200 pl-4 italic text-gray-700 bg-blue-50 py-2 rounded-r">
        {children}
      </blockquote>
    ),
  };

  const components = variant === 'preview' ? previewComponents : defaultComponents;

  const contentElement = (
    <ReactMarkdown 
      remarkPlugins={[remarkGfm]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );

  if (title) {
    return (
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
        <div className={`${variant === 'preview' ? '' : 'bg-gray-50 rounded-lg p-4 prose prose-sm max-w-none'}`}>
          {contentElement}
        </div>
      </div>
    );
  }

  return contentElement;
};
