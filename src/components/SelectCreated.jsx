import React from 'react'

const SelectCreated = ({onChange}) => {
  function classAdder() {
    document.getElementById('created__inputs').classList.toggle('active');
    document.getElementById('created__button').classList.toggle('active');
  }

  return (
    <div className='menu__input created'>
      <button id="created__button" onClick={classAdder} className='menu__button '>Created</button>
      <div className='menu__inputs active' id='created__inputs' onChange={event => onChange(event.target.value)}>
        <input className='menu__input-created' maxLength={4}  id='add' placeholder='from'></input>
        <div className='menu__divider'></div>
        <input className='menu__input-created' maxLength={4} id='rem' placeholder='before'></input>
      </div>
    </div>
  )
}

export default SelectCreated