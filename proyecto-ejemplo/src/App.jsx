import { useState, useRef } from 'react'
import Navbar from './components/Navbar/Navbar'
import HeroBanner from './components/HeroBanner/HeroBanner'
import MenuSection from './components/MenuSection/MenuSection'
import QuoteCart from './components/QuoteCart/QuoteCart'
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton'
import { MENU_DATA, DELIVERY_COST } from './data/menuData'
import { addToQuote, removeFromQuote, updateQuantity } from './utils/quoteUtils'
import './App.css'

export default function App() {
  const [quoteItems, setQuoteItems] = useState([])
  const [wantDelivery, setWantDelivery] = useState(false)
  const menuRef = useRef(null)
  const cartRef = useRef(null)

  const totalItems = quoteItems.reduce((acc, i) => acc + i.quantity, 0)

  const handleScrollToMenu = () => menuRef.current?.scrollIntoView({ behavior: 'smooth' })
  const handleScrollToCart = () => cartRef.current?.scrollIntoView({ behavior: 'smooth' })

  const handleAdd = product => setQuoteItems(prev => addToQuote(prev, product))
  const handleRemove = productId => setQuoteItems(prev => removeFromQuote(prev, productId))
  const handleUpdateQty = (productId, qty) => setQuoteItems(prev => updateQuantity(prev, productId, qty))
  const handleClear = () => { setQuoteItems([]); setWantDelivery(false) }

  return (
    <div className="app">
      <Navbar cartCount={totalItems} onCartClick={handleScrollToCart} />
      <HeroBanner onCtaClick={handleScrollToMenu} />

      <div ref={menuRef}>
        <MenuSection products={MENU_DATA} onAddToQuote={handleAdd} />
      </div>

      <div className="app__divider">
        <span>🧾 Tu Cotización</span>
      </div>

      <div ref={cartRef}>
        <QuoteCart
          items={quoteItems}
          onRemove={handleRemove}
          onUpdateQuantity={handleUpdateQty}
          onClear={handleClear}
          wantDelivery={wantDelivery}
          onToggleDelivery={() => setWantDelivery(prev => !prev)}
          deliveryCost={DELIVERY_COST}
        />
      </div>

      <footer className="app__footer">
        <div className="app__footer-content">
          <img src="/logo.jpg" alt="Delis Lu" className="app__footer-logo-img" />
          <span className="app__footer-logo">Delis Lu</span>
          <p className="app__footer-slogan">🍔 Rápido, rico y hecho con amor ❤️</p>
          <div className="app__footer-contacts">
            <a href="https://wa.me/573127695456" target="_blank" rel="noopener noreferrer" className="app__footer-wa">
              📱 WhatsApp: 312 769 5456
            </a>
            <a href="https://wa.me/573237448371" target="_blank" rel="noopener noreferrer" className="app__footer-wa app__footer-wa--domis">
              🛵 Domis: 323 744 8371
            </a>
          </div>
        </div>
        <p className="app__footer-copy">© 2026 Delis Lu - Comida Rápida. Todos los derechos reservados.</p>
      </footer>

      <WhatsAppButton quoteItems={quoteItems} />
    </div>
  )
}
