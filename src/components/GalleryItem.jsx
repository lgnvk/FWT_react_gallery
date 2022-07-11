import React from 'react'

const GalleryItem = (props) => {
  const name = props.author[props.item.authorId - 1][1];
  const location = props.location[props.item.locationId - 1][1];
  const baseUrl = 'https://test-front.framework.team';
  return (
    <div className="gallery__item">
      <img src={baseUrl + props.item.imageUrl} alt="" />
      <div className="gallery__info">
        <p><span>{props.item.name}</span></p>
        <p><span>Author: </span>{name}</p>
        <p><span>Created: </span>{props.item.created}</p>
        <p><span>Location: </span>{location}</p>
      </div>
    </div>
  )
}

export default GalleryItem