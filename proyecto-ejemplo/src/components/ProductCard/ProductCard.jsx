import { formatPrice } from '../../utils/quoteUtils'
import './ProductCard.css'

export default function ProductCard({ product, onAdd, index = 0 }) {
  const { name, description, price, imageUrl, badge } = product

  return (
    <div className="pcard" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="pcard__img-wrap">
        <img
          src={imageUrl}
          alt={name}
          className="pcard__img"
          loading="lazy"
          onError={e => { e.currentTarget.src = 'https://placehold.co/400x260/1a1a1a/f5c518?text=🍔' }}
        />
        <div className="pcard__img-overlay" />
        {badge && <span className="pcard__badge">{badge}</span>}
        <span className="pcard__price-tag">{formatPrice(price)}</span>
      </div>
      <div className="pcard__body">
        <h3 className="pcard__name">{name}</h3>
        <p className="pcard__desc">{description}</p>
        <button className="pcard__btn" onClick={() => onAdd(product)}>
          <span className="pcard__btn-icon">+</span>
          Agregar al pedido
        </button>
      </div>
    </div>
  )
}
