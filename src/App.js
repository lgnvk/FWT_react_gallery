import './styles/App.css';
import Header from './components/Header'
import SelectAuthor from './components/SelectAuthor';
import SelectLocation from './components/SelectLocation';
import SelectCreated from './components/SelectCreated';
import Pagination from './components/Pagination';
import Gallery from './components/Gallery';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from './hooks/useTheme';
import { getPageCount, getPagesArray } from './js/pages';

function App() {
  const { theme, setTheme } = useTheme()
  const [items, setItems] = useState([])
  const [authors, setAuthors] = useState([])
  const [locations, setLocations] = useState([])
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [totalPages, setTotalPages] = useState(0)
  const [limit] = useState(12)
  const [page, setPage] = useState(1)
  let pagesArr = getPagesArray(totalPages)

  const themeToggle = () => {
    if (theme === 'light') {
      setTheme('dark')
    }
    if (theme === 'dark') {
      setTheme('light')
    }
  }
  useEffect(() => {
    async function fetchItems() {
      let itemResponse = '';
      if (selectedAuthor) {
        if (searchQuery) {
          itemResponse = await axios.get('https://test-front.framework.team/paintings', {
            params: {
              authorId: selectedAuthor,
              q: searchQuery
            }
          })
        }
        else {
          itemResponse = await axios.get('https://test-front.framework.team/paintings', {
            params: {
              authorId: selectedAuthor
            }
          })
        }
      }
      if (selectedLocation) {
        if (searchQuery) {
          itemResponse = await axios.get('https://test-front.framework.team/paintings', {
            params: {
              locationId: selectedLocation,
              q: searchQuery
            }
          })
        }
        else {
          itemResponse = await axios.get('https://test-front.framework.team/paintings', {
            params: {
              locationId: selectedLocation,
            }
          })
        }
      }
      if (selectedAuthor && selectedLocation) {
        if (searchQuery) {
          itemResponse = await axios.get('https://test-front.framework.team/paintings', {
            params: {
              authorId: selectedAuthor,
              locationId: selectedLocation,
              q: searchQuery
            }
          })
        } else {
          itemResponse = await axios.get('https://test-front.framework.team/paintings', {
            params: {
              authorId: selectedAuthor,
              locationId: selectedLocation
            }
          })
        }
      }
      if (searchQuery && !selectedAuthor && !selectedLocation) {
        itemResponse = await axios.get('https://test-front.framework.team/paintings', {
          params: {
            q: searchQuery
          }
        })
      }
      if (!selectedAuthor && !selectedLocation && !searchQuery) {
        itemResponse = await axios.get('https://test-front.framework.team/paintings', {
          params: {
            _limit: limit,
            _page: page,
          }
        })
      }
      setItems(itemResponse.data);
      setTotalPages(getPageCount(itemResponse.headers['x-total-count'], limit));
    };
    fetchItems();
    fetchAuhthors();
    fetchLocations();
  }, [limit, page, selectedAuthor, selectedLocation, searchQuery])

  const changePage = (page) => {
    setPage(page)
    if (page !== 1) {
      document.getElementById('left').removeAttribute("disabled", "disabled");
      document.getElementById('doubleLeft').removeAttribute("disabled", "disabled");
      document.getElementById('left').classList.remove('pagination__button-disabled');
      document.getElementById('doubleLeft').classList.remove('pagination__button-disabled');
    }
    if (page === 1) {
      document.getElementById('left').setAttribute("disabled", "disabled");
      document.getElementById('doubleLeft').setAttribute("disabled", "disabled");
      document.getElementById('left').classList.add('pagination__button-disabled');
      document.getElementById('doubleLeft').classList.add('pagination__button-disabled');
    }
    if (page === pagesArr[pagesArr.length - 1]) {
      document.getElementById('right').setAttribute("disabled", "disabled");
      document.getElementById('doubleRight').setAttribute("disabled", "disabled");
      document.getElementById('right').classList.add('pagination__button-disabled');
      document.getElementById('doubleRight').classList.add('pagination__button-disabled');
    }
    else {
      document.getElementById('right').removeAttribute("disabled", "disabled");
      document.getElementById('doubleRight').removeAttribute("disabled", "disabled");
      document.getElementById('right').classList.remove('pagination__button-disabled');
      document.getElementById('doubleRight').classList.remove('pagination__button-disabled');
    }
  }

  async function fetchAuhthors () {
    const authorsResponse =  await axios.get('https://test-front.framework.team/authors');
    setAuthors(authorsResponse.data);
  }
  async function fetchLocations () {
    const locationResponse = await axios.get('https://test-front.framework.team/locations');
    setLocations(locationResponse.data);
  }

  const sortAuthors = (sort) => {
    setSelectedAuthor(sort);
  };
  const sortLocations = (sort) => {
    setSelectedLocation(sort);
  };
  return (
    <div className="App">
      <div className='container'>
        <Header theme={theme} themeToggle={themeToggle}></Header>
        <main>
          <section className="menu">
            <input value={searchQuery.replace(/[0-9]/g,"")} onChange={e => setSearchQuery(e.target.value.replace(/[0-9]/g,""))} className="menu__input" placeholder="Name" type="text" />
            <SelectAuthor value={selectedAuthor} onChange={sortAuthors} defaultValue="Author" options={authors}></SelectAuthor>
            <SelectLocation value={selectedLocation} onChange={sortLocations} defaultValue="Location" options={locations}></SelectLocation>
            <SelectCreated></SelectCreated>
          </section>
          <section>
            <Gallery items={items} authors={authors} locations={locations}></Gallery>
          </section>
          <section className="pagination">
            <Pagination page={page} changePage={changePage} pages={pagesArr}></Pagination>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;


