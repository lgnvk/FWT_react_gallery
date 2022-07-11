import React from 'react'
import GalleryItem from './GalleryItem'

const Gallery = ({items, authors, locations}) => {
  return (
    <div className="gallery">
      {items.map(item =>
      <GalleryItem author={authors.map(author => [author.id, author.name])} location={locations.map(location => [location.id, location.location])} item={item} key={item.id} />
    )}
    </div>
  )
}

export default Gallery