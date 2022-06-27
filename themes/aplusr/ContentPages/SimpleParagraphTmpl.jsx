import React from 'react'
import ReactMarkdown from 'react-markdown'

const SimpleParagraphTmpl = ({ data }) => {
  return (
    <ReactMarkdown className="simple-paragraph">{data.content}</ReactMarkdown>
  )
}

export default SimpleParagraphTmpl