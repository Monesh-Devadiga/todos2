import { useState } from 'react'

export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(text)
    setText('')
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="New todo"
      />
      <button type="submit" disabled={!text.trim()}>
        Add
      </button>
    </form>
  )
}