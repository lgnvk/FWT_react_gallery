import React from 'react'

const SelectAuthor = ({options, defaultValue, value, onChange}) => {
  return (
    <select className='menu__select' value={value}  onChange={event => onChange(event.target.value)}>
      <option className='' disabled selected value="">{defaultValue}</option>
      {options.map(option =>
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      )}
    </select>
  )
}

export default SelectAuthor