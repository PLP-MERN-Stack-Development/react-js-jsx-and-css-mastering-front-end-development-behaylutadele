import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-700">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">My React App</h1>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/tasks" className="hover:underline">Tasks</Link>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="ml-4 p-2 border rounded"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  )
}
