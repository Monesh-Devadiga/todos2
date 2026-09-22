const FILTERS = ['all', 'active', 'completed']

export default function TodoFooter({
  activeCount,
  filter,
  onFilterChange,
  onClearCompleted,
}) {
  return (
    <footer className="todo-footer">
      <span className="item-count">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <nav className="filters" aria-label="Filter todos">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={filter === f ? 'active' : ''}
            onClick={() => onFilterChange(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </nav>

      <button className="btn-clear" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}