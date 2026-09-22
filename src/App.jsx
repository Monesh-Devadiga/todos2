import { useEffect, useState } from 'react'
import TodoInput from './components/TodoInput.jsx'
import TodoList from './components/TodoList.jsx'
import TodoFooter from './components/TodoFooter.jsx'

const STORAGE_KEY = 'react-todo-app'

function loadTodos() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export default function App() {
  const [todos, setTodos] = useState(loadTodos)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: trimmed, completed: false },
    ])
  }

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const editTodo = (id, text) => {
    const trimmed = text.trim()
    if (!trimmed) {
      deleteTodo(id)
      return
    }
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo)),
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  const activeCount = todos.filter((todo) => !todo.completed).length

  return (
    <div className="app">
      <header className="app-header">
        <h1>todos</h1>
        <p>Your tasks, in one place</p>
      </header>

      <main className="card">
        <TodoInput onAdd={addTodo} />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onDelete={deleteTodo}
        />

        <TodoFooter
          activeCount={activeCount}
          filter={filter}
          onFilterChange={setFilter}
          onClearCompleted={clearCompleted}
        />
      </main>
    </div>
  )
}