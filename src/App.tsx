import { useState } from 'react'
import { Home } from './components/Home'
import { ExampleView } from './components/ExampleView'
import { examplests } from './data/tsexamples'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | string>('home')
  const [searchTerm, setSearchTerm] = useState('')

  const handleExampleClick = (id: string) => {
    setCurrentPage(id)
  }

  const handleBackClick = () => {
    setCurrentPage('home')
    setSearchTerm('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'home' ? (
        <Home
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onExampleClick={handleExampleClick}
        />
      ) : (
        <ExampleView
          example={examplests[currentPage]}
          onBackClick={handleBackClick}
        />
      )}
    </div>
  )
}

export default App