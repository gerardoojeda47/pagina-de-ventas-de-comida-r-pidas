import './Navbar.css'

const WA_NUMBER = '573127695456'

export default function Navbar({ cartCount, onCartClick }) {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <img src="/logo.jpg" alt="Delis Lu" className="navbar__logo-img" />
        <span className="navbar__name">Delis<span className="navbar__accent"> Lu</span></span>
      </div>
      <div className="navbar__actions">
        <a
          href={`https://wa.me/${WA_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="navbar__wa-link"
        >
          📞 Contáctanos
        </a>
        <button className="navbar__cart-btn" onClick={onCartClick} aria-label="Ver cotización">
          🧾
          {cartCount > 0 && (
            <span className="navbar__cart-badge">{cartCount}</span>
          )}
        </button>
      </div>
    </nav>
  )
}
