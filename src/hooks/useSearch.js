import { useState, useEffect, useRef } from 'react'

export default function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') return setError("Can't search for an empty movie")

    if (search.match(/^\d*$/)) return setError("Can't search movies with numbers")

    if (search.length < 3) return setError('Search must be at least 3 characters long')

    setError(null)
  }, [search])

  return { search, error, updateSearch }
}
