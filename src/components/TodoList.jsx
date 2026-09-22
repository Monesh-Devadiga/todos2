import TodoItem from './TodoItem.jsx'

export default function TodoList({ todos, onToggle, onEdit, onDelete }) {
  if (todos.length === 0) {
    return <p className="empty-state">Nothing here — add a task above!</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}