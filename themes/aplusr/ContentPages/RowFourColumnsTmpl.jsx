import React from 'react'
import ReactMarkdown from 'react-markdown'

const RowFourColumnsTmpl = ({ data }) => {
  return (
    <div className="container">
      <div className="row">
        <hr className="border-dark border mx-2 my-3 " />
        <h2 className="mb-5">{ data.title }</h2>
        <div className="col-3">
          <ReactMarkdown>{data.first_column}</ReactMarkdown>
        </div>
        <div className="col-3">
          <ReactMarkdown>{data.second_column}</ReactMarkdown>
        </div>
        <div className="col-3">
          <ReactMarkdown>{data.third_column}</ReactMarkdown>
        </div>
        <div className="col-3">
          <ReactMarkdown>{data.fourth_column}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default RowFourColumnsTmpl