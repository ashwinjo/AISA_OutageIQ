import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface RCAReportProps {
  markdown: string
}

const RCAReport: React.FC<RCAReportProps> = ({ markdown }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">RCA Report</h2>
      <div className="prose max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h3: ({node, ...props}) => <h3 className="text-xl font-semibold mt-6 mb-3 text-indigo-700" {...props} />,
            p: ({node, ...props}) => <p className="mb-4 text-gray-700" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4" {...props} />,
            li: ({node, ...props}) => <li className="mb-2" {...props} />,
            table: ({node, ...props}) => <div className="overflow-x-auto mb-4"><table className="min-w-full border-collapse border border-gray-300" {...props} /></div>,
            thead: ({node, ...props}) => <thead className="bg-gray-100" {...props} />,
            th: ({node, ...props}) => <th className="border border-gray-300 px-4 py-2 text-left font-semibold" {...props} />,
            td: ({node, ...props}) => <td className="border border-gray-300 px-4 py-2" {...props} />,
            a: ({node, ...props}) => <a className="text-blue-600 hover:underline" {...props} />,
            blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4" {...props} />,
            code: ({node, inline, ...props}) => 
              inline 
                ? <code className="bg-gray-100 rounded px-1 py-0.5" {...props} />
                : <pre className="bg-gray-100 rounded p-4 overflow-x-auto"><code {...props} /></pre>,
          }}
        >
          {markdown}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default RCAReport
