import React from 'react'

const SelectAuthor = ({options, defaultValue, value, onChange}) => {
  return (
    <div className='menu__wrapper'>
      <select className='menu__select' value={value}  onChange={event => onChange(event.target.value)}>
        <option className='' disabled value="">{defaultValue}</option>
        {options.map(option =>
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        )}
      </select>
    </div>
  )
}

export default SelectAuthor