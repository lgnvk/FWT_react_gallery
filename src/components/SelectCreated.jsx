import React from 'react'

const SelectCreated = ({sortFrom, sortBefore}) => {
  function classAdder() {
    document.getElementById('created__inputs').classList.toggle('active');
    document.getElementById('created__button').classList.toggle('active');
  }

  return (
    <div className='menu__input created'>
      <button id="created__button" onClick={classAdder} className='menu__button '>Created</button>
      <div className='menu__inputs active' id='created__inputs'>
        <input className='menu__input-created' maxLength={4}  id='from' placeholder='from' onChange={event => sortFrom(event.target.value)}></input>
        <div className='menu__divider'></div>
        <input className='menu__input-created' maxLength={4} id='before' placeholder='before' onChange={event => sortBefore(event.target.value)}></input>
      </div>
    </div>
  )
}

export default SelectCreated