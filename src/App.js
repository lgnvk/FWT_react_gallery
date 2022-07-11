import './styles/App.css';
import Header from './components/Header'
import SelectAuthor from './components/SelectAuthor';
import SelectLocation from './components/SelectLocation';
import SelectCreated from './components/SelectCreated';
import Pagination from './components/Pagination';
import Gallery from './components/Gallery';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useItems} from './hooks/useItems';
import {useTheme} from './hooks/useTheme';
import {getPageCount, getPagesArray} from './js/pages';


function App() {
  let arrCreated = []
  const {theme, setTheme} = useTheme()
  const [items, setItems] = useState([])
  const [authors, setAuthors] = useState([])
  const [locations, setLocations] = useState([])
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCreated, setSelectedCreated] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [limit] = useState(12)
  const [page, setPage] = useState(1)
  let pagesArr = getPagesArray(totalPages)

  const searchAndSortedItem = useItems(items, selectedAuthor, selectedLocation, selectedCreated, searchQuery)
  
  const themeToggle = () => {
    if(theme === 'light') {
      setTheme('dark')
    } 
    if(theme === 'dark'){
      setTheme('light')
    }
  }
  const inputVal = () => {
    let a = document.getElementById('add').value;
    let b = document.getElementById('rem').value;
    if (a.length === 4 && b.length === 4) {
      arrCreated.push(a, b)

    }
    else {
      arrCreated.pop(a, b)
    }
    setSelectedCreated([a, b])
  }

  useEffect(() => {
    fetchData(limit, page);
  })

  const changePage = (page) => {
    setPage(page)
    if(page !== 1) {
      document.getElementById('left').removeAttribute("disabled", "disabled");
      document.getElementById('doubleLeft').removeAttribute("disabled", "disabled");
      document.getElementById('left').classList.remove('pagination__button-disabled');
      document.getElementById('doubleLeft').classList.remove('pagination__button-disabled');
    }
    if(page === 1) {
      document.getElementById('left').setAttribute("disabled", "disabled");
      document.getElementById('doubleLeft').setAttribute("disabled", "disabled");
      document.getElementById('left').classList.add('pagination__button-disabled');
      document.getElementById('doubleLeft').classList.add('pagination__button-disabled');
    }  
    if(page === pagesArr[pagesArr.length - 1]) {
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

  async function fetchData() {
    const itemResponse = await axios.get('https://test-front.framework.team/paintings', {
      params: {
        _limit: limit,
        _page: page
      }
    })
    const authorsResponse = await axios.get('https://test-front.framework.team/authors')
    const locationResponse = await axios.get('https://test-front.framework.team/locations')
    
    setItems(itemResponse.data)
    setAuthors(authorsResponse.data)
    setLocations(locationResponse.data)
    const totalCount = itemResponse.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  }

  const sortItems = (sort) => {
    setSelectedAuthor(sort);
  }
  const sortLocations = (sort) => {
    setSelectedLocation(sort)
  }
 


  return (
    <div className="App">
      <div className='container'>
        <Header theme={theme} themeToggle={themeToggle}></Header>
        <main>
          <section className="menu">
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="menu__input" placeholder="Name" type="text" />
            <SelectAuthor value={selectedAuthor} onChange={sortItems} defaultValue="Author" options={authors}></SelectAuthor>
            <SelectLocation value={selectedLocation} onChange={sortLocations} defaultValue="Location" options={locations}></SelectLocation>
            <SelectCreated defaultValue="Created" onChange={inputVal}></SelectCreated>
            
          </section>
          <section>
            <Gallery items={searchAndSortedItem} authors={authors} locations={locations}></Gallery>
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


