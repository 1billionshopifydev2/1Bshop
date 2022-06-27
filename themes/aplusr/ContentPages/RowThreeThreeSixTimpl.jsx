import React from 'react'
import ReactMarkdown from 'react-markdown'

const RowThreeThreeSixTimpl = ({ data }) => {
  return (
    <div className="container">
      <div className="row">
        <hr className="border-dark border mx-2 my-3 " />
        <h2 className="mb-5">{ data.title }</h2>
        <div className="col-lg-3">
          <ReactMarkdown>{data.first_column}</ReactMarkdown>
        </div>
        <div className="col-lg-3">
          <ReactMarkdown 
            transformImageUri={uri =>
              uri.startsWith("http") ? uri : `${process.env.STRAPI_URL}${uri}`
            }
          >
            {data.second_column}
          </ReactMarkdown>
        </div>
        <div className="col-lg-6">
          <ReactMarkdown>{data.third_column}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default RowThreeThreeSixTimpl
