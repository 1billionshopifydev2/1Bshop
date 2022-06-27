import React from 'react'

const EmbedCodeTmpl = ({ data }) => {
  return <div className="embed-code w-100 my-2" dangerouslySetInnerHTML={{ __html: data.html_embed_code }} />
}

export default EmbedCodeTmpl