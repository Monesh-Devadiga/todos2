import { useEffect, useRef, useState } from 'react'

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  const startEdit = () => {
    setDraft(todo.text)
    setEditing(true)
  }

  const submitEdit = () => {
    onEdit(todo.id, draft)
    setEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') submitEdit()
    if (e.key === 'Escape') setEditing(false)
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'active' : 'done'}`}
      />

      {editing ? (
        <input
          ref={inputRef}
          type="text"
          className="todo-edit-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={submitEdit}
          onKeyDown={handleKeyDown}
          aria-label="Edit todo"
        />
      ) : (
        <span className="todo-text" onDoubleClick={startEdit} title="Double-click to edit">
          {todo.text}
        </span>
      )}

      <div className="todo-actions">
        {!editing && (
          <button className="btn-icon" onClick={startEdit} aria-label="Edit">
            Edit
          </button>
        )}
        <button className="btn-icon danger" onClick={() => onDelete(todo.id)} aria-label="Delete">
          Delete
        </button>
      </div>
    </li>
  )
}