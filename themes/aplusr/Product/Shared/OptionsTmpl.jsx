import React from 'react'

const OptionsTmpl = props => {
  return (
    <>
      {props.options.map((optionGroup, indexOption) => (
        <div key={indexOption}>
          <select
            value={optionGroup.selected || '-'}
            className="text-capitalize custom-select border-dark h-auto mb-3 py-2"
            title={optionGroup.name}
            onChange={event =>
              props.onChange({
                name: optionGroup.name,
                value: event.target.value,
              })
            }
          >
            <option value="-" disabled>
              Select {optionGroup.name}
            </option>
            {optionGroup.values.map((option, index) => {
              const disabled =
                optionGroup.disabled.findIndex(
                  disabled => disabled === option
                ) >= 0 && indexOption > 0

              return (
                <option
                  key={`${index}-${Number(disabled)}-${Number(
                    optionGroup.selected === option
                  )}`}
                  disabled={disabled}
                  value={option}
                >
                  {option}
                </option>
              )
            })}
          </select>
        </div>
      ))}
    </>
  )
}

export default OptionsTmpl
