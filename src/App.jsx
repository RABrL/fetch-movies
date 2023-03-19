import React, { useCallback, useState } from 'react'
import Movies from './components/Movies'

import useMovies from './hooks/useMovies'
import useSearch from './hooks/useSearch'
import debounce from 'just-debounce-it'

import './App.css'

export default function App () {
  const [sort, setSort] = useState(false)
  const { search, error, updateSearch } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300, true)
    , [getMovies]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    getMovies({ search })
  }

  const handleChange = e => {
    const newSearch = e.target.value
    if (newSearch.startsWith(' ')) return
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = e => {
    setSort(!sort)
  }

  return (
    <div className='page'>
      <header>
        <h1>Fetch Movies</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            value={search}
            onChange={handleChange} type='text'
            placeholder='Avengers, Matrix, Batman ...'
            style={{ border: '1px solid transparent', borderColor: error ? 'red' : '' }}
          />
          <button>Search</button>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', userSelect: 'none' }}>
            <input style={{ margin: 'auto' }} type='checkbox' onChange={handleSort} />
            <p>Sort by title</p>
          </label>
        </form>
        {
          error && <p style={{ color: 'red', marginTop: '12px' }} className='error'>{error}</p>
        }
      </header>

      <main>
        {
          loading ? <p>Searching movies...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}
