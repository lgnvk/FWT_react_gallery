import { useMemo } from "react";
export const useSortedItems = (items, selectedAuthor, selectedLocation, selectedCreated) => {
  const sortedItems = useMemo(() => {
    if(selectedAuthor) {
      if(selectedLocation) {
        if(selectedCreated[0] && selectedCreated[1]) {
          return [...items].filter(item => +selectedCreated[0] <= item.created && item.created <= +selectedCreated[1]).filter(item => item.authorId === +selectedAuthor).filter(item => item.locationId === +selectedLocation)
        } else {
          return [...items].filter(item => item.authorId === +selectedAuthor).filter(item => item.locationId === +selectedLocation)
        } 
      }
      if(selectedCreated[0] && selectedCreated[1]) {
        return [...items].filter(item => +selectedCreated[0] <= item.created && item.created <= +selectedCreated[1]).filter(item => item.authorId === +selectedAuthor)
      }
      else {
        return [...items].filter(item => item.authorId === +selectedAuthor)
      }
      
    }
    if(selectedLocation) {
      return [...items].filter(item => item.locationId === +selectedLocation)
    }

    if(selectedCreated[0] && selectedCreated[1]) {
      return [...items].filter(item => +selectedCreated[0] <= item.created && item.created <= +selectedCreated[1])
    }

    return items;
  }, [selectedAuthor, selectedLocation, selectedCreated, items]);
  return sortedItems;
}

export const useItems = (items, selectedAuthor, selectedLocation, selectedCreated, searchQuery) => {
  const sortedItems = useSortedItems(items, selectedAuthor, selectedLocation, selectedCreated);
  const searchAndSortedItem = useMemo(() => {
    return sortedItems.filter(item => item.name.includes(searchQuery))
  }, [searchQuery, sortedItems]);
  return searchAndSortedItem;
}