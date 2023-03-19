const API_URL = 'https://www.omdbapi.com/?apikey=550f31a7&s='

export default async function moviesService ({ search }) {
  if (!search) return null

  try {
    const res = await fetch(`${API_URL}${search}`)
    const data = await res.json()

    const movies = data?.Search

    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  } catch (err) {
    throw new Error('Error searching movies')
  }
}
