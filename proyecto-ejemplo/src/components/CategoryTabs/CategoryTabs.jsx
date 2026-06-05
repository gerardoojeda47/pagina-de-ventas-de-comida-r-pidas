import './CategoryTabs.css'

const TABS = [
  { value: 'all', label: '🍽️ Todo' },
  { value: 'hotdogs', label: '🌭 Perros Calientes' },
  { value: 'hamburgers', label: '🍔 Hamburguesas' },
  { value: 'sandwiches', label: '🥖 Sándwiches' },
]

export default function CategoryTabs({ activeCategory, onCategoryChange }) {
  return (
    <div className="category-tabs">
      {TABS.map(tab => (
        <button
          key={tab.value}
          className={`category-tabs__btn${activeCategory === tab.value ? ' category-tabs__btn--active' : ''}`}
          onClick={() => onCategoryChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
