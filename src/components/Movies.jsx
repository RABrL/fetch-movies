import React from 'react'

export default function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  if (!hasMovies) return <p>No results were found for this movie</p>

  return (
    <ul className='movies'>
      {
        movies.map(movie => (
          <li key={movie.id} className='movie'>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.Title} />
          </li>
        ))
      }
    </ul>
  )
}
