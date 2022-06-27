import React from 'react'

const UserErrorsTmpl = ({ errors, overrides = {} }) => (
  <>
    {errors?.length > 0 && (
      <ul>
        {errors.map((e, i) => (
          <li key={i}>
            {typeof overrides[e.code] !== 'undefined' ? (
              <>{overrides[e.code]}</>
            ) : (
              <>{e.message}</>
            )}
          </li>
        ))}
      </ul>
    )}
  </>
)

export default UserErrorsTmpl
