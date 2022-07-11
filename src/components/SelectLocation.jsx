import React from 'react'

const SelectLocation = ({options, defaultValue, value, onChange}) => {
  return (
    <select className='menu__select' value={value}  onChange={event => onChange(event.target.value)}>
      <option disabled selected value="">{defaultValue}</option>
      {options.map(option =>
        <option key={option.id} value={option.id}>
          {option.location}
        </option>
      )}
    </select>
  )
}

export default SelectLocation