import { useState, useMemo } from 'react'
import Layout from '../components/Layout'
import Button from '../components/UI/Button'
import useLocalStorage from '../hooks/useLocalStorage'

export default function Tasks() {
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')

  function addTask(e) {
    e.preventDefault()
    if (!text.trim()) return
    setTasks([{ id: Date.now(), text, completed: false }, ...tasks])
    setText('')
  }

  function toggleTask(id) {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const filtered = useMemo(() => {
    if (filter === 'active') return tasks.filter(t => !t.completed)
    if (filter === 'completed') return tasks.filter(t => t.completed)
    return tasks
  }, [tasks, filter])

  return (
    <Layout>
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
        <form onSubmit={addTask} className="flex gap-2 mb-4">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Enter a task..."
            className="flex-1 p-2 border rounded dark:bg-gray-800"
          />
          <Button type="submit">Add</Button>
        </form>

        <div className="flex gap-2 mb-4">
          <Button variant={filter === 'all' ? 'primary' : 'secondary'} onClick={() => setFilter('all')}>All</Button>
          <Button variant={filter === 'active' ? 'primary' : 'secondary'} onClick={() => setFilter('active')}>Active</Button>
          <Button variant={filter === 'completed' ? 'primary' : 'secondary'} onClick={() => setFilter('completed')}>Completed</Button>
        </div>

        <ul className="space-y-2">
          {filtered.map(task => (
            <li key={task.id} className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 rounded shadow">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
                <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.text}</span>
              </div>
              <Button variant="danger" onClick={() => deleteTask(task.id)}>Delete</Button>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}
