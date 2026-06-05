import { useState } from 'react'
import CategoryTabs from '../CategoryTabs/CategoryTabs'
import ProductCard from '../ProductCard/ProductCard'
import './MenuSection.css'

export default function MenuSection({ products, onAddToQuote }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <section className="menu-section" id="menu">
      <div className="menu-section__header">
        <span className="menu-section__label">Nuestro Menú</span>
        <h2 className="menu-section__title">¿Qué se te antoja?</h2>
        <p className="menu-section__subtitle">Elige tus favoritos y arma tu cotización al instante</p>
      </div>
      <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <div className="menu-section__grid">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} onAdd={onAddToQuote} index={i} />
        ))}
      </div>
    </section>
  )
}
