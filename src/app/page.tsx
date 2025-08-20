"use client"
import { useState, useEffect } from "react"

export default function Home() {
  const [todos, setTodos] = useState<{movie: string, id: number}[]>([])
  const [inputVal, setInput] = useState("")
  const [nextId, setNextId] = useState(1)
  const [isLoaded, setIsLoaded] = useState(false)


  const [editingId, setEditingId] = useState<number | null>(null)

  // Load movies from localStorage on component mount
  useEffect(() => {
    const savedMovies = localStorage.getItem('movieList')
    const savedNextId = localStorage.getItem('movieNextId')
    
    if (savedMovies) {
      try {
        const movies = JSON.parse(savedMovies)
        setTodos(movies)
      } catch (error) {
        console.error('Error loading movies from localStorage:', error)
        // Set default movies if localStorage data is corrupted
        setTodos([
          { movie: "The Shawshank Redemption", id: 1 },
          { movie: "The Godfather", id: 2 },
        ])
        setNextId(3)
      }
    } else {
      // Set default movies if no saved data
      setTodos([
        { movie: "The Shawshank Redemption", id: 1 },
        { movie: "The Godfather", id: 2 },
      ])
      setNextId(3)
    }
    
    if (savedNextId) {
      setNextId(parseInt(savedNextId, 10) || 1)
    }
    
    setIsLoaded(true)
  }, [])

  // Save movies to localStorage whenever todos or nextId changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('movieList', JSON.stringify(todos))
      localStorage.setItem('movieNextId', nextId.toString())
    }
  }, [todos, nextId, isLoaded])

  const addOrUpdateMovie = () => {
    if (!inputVal.trim()) return
    
    if (editingId !== null) {
      const updatedTodos = todos.map(item => 
        item.id === editingId 
          ? { ...item, movie: inputVal.trim() }
          : item
      )
      setTodos(updatedTodos)
      setEditingId(null)
    } else {
      const newTodos = [...todos, { movie: inputVal.trim(), id: nextId }]
      setTodos(newTodos)
      setNextId(nextId + 1)
    }
    setInput("")
  }

  const editMovie = (id: number) => {
    const movie = todos.find(item => item.id === id)
    if (movie) {
      setInput(movie.movie)
      setEditingId(id)
    }
  }

  const deleteMovie = (id: number) => {
    const filteredTodos = todos.filter(item => item.id !== id)
    setTodos(filteredTodos)
    if (editingId === id) {
      setInput("")
      setEditingId(null)
    }
  }

  const cancelEdit = () => {
    setInput("")
    setEditingId(null)
  }

  // Show loading state while data is being loaded
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🎬</div>
          <p className="text-xl font-semibold text-gray-700">Loading your movie collection...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            🎬 My Movie List
          </h1>
          <p className="text-gray-600 text-lg">Keep track of your favorite movies</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input 
                type="text" 
                onChange={(e) => setInput(e.target.value)} 
                value={inputVal}
                className="w-full p-4 border-2 text-black border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-400 text-lg transition-all duration-200" 
                placeholder="Enter movie name..."
                onKeyPress={(e) => e.key === 'Enter' && addOrUpdateMovie()}
              />
            </div>
            <div className="flex gap-2">
              <button 
                onClick={addOrUpdateMovie} 
                className="px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {editingId !== null ? '✏️ Update' : '➕ Add Movie'}
              </button>
              {editingId !== null && (
                <button 
                  onClick={cancelEdit}
                  className="px-4 py-4 bg-gray-500 text-white rounded-xl hover:bg-gray-600 font-semibold transition-all duration-200"
                >
                  ✖️ Cancel
                </button>
              )}
            </div>
          </div>
        </div>
        {todos.length > 0 ? (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
              My Collection ({todos.length} {todos.length === 1 ? 'movie' : 'movies'})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todos.map((item, index) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden group"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <button 
                        onClick={() => deleteMovie(item.id)} 
                        className="w-8 h-8 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-all duration-200 flex items-center justify-center group-hover:scale-110"
                        aria-label="Delete movie"
                      >
                        🗑️
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 leading-tight line-clamp-2">
                        {item.movie}
                      </h3>
                    </div>
                    
                    <button 
                      onClick={() => editMovie(item.id)}
                      className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:from-purple-100 hover:to-blue-100 hover:text-purple-700 font-medium transition-all duration-200 transform hover:scale-105"
                    >
                      ✏️ Edit Movie
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎭</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No movies yet!</h3>
            <p className="text-gray-500">Add your first movie to get started.</p>
          </div>
        )}
      </div>
    </div>

  )

}


