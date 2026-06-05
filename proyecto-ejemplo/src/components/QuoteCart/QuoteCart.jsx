import { useState } from 'react'
import { calculateTotal, formatPrice } from '../../utils/quoteUtils'
import './QuoteCart.css'

const WA_DOMIS = '573237448371'

export default function QuoteCart({ items, onRemove, onUpdateQuantity, onClear, wantDelivery, onToggleDelivery, deliveryCost }) {
  const [barrio, setBarrio] = useState('')

  const subtotal = calculateTotal(items)
  const total = subtotal + (wantDelivery ? deliveryCost : 0)

  const buildWaMessage = () => {
    const lines = items.map(({ product, quantity }) => {
      const sub = `$${(product.price * quantity).toLocaleString('es-CO')}`
      return `• ${product.name} x${quantity} — ${sub}`
    })

    const totalFmt = `$${total.toLocaleString('es-CO')}`

    let deliveryNote = ''
    if (wantDelivery) {
      const barrioTexto = barrio.trim()
        ? `Mi barrio es: *${barrio.trim()}*`
        : `(no ingresé el barrio aún)`
      deliveryNote = `🛵 *Es para domicilio*\n${barrioTexto}\n\n📦 Si deseo llevar en bolsa, entiendo que tiene un costo adicional de $${deliveryCost.toLocaleString('es-CO')}.\n\n¿Cuánto es el valor del domicilio a mi barrio para saber el *valor final*? 🏠`
    } else {
      deliveryNote = `🏃 *Paso a recoger personalmente* — ¿a qué dirección me dirijo?`
    }

    const msg = `¡Hola Delis Lu! 👋🌭🍔\n\nQuiero hacer este pedido:\n\n${lines.join('\n')}\n\n*Total productos: ${totalFmt}*\n\n${deliveryNote}\n\n¡Gracias! 😊`
    return encodeURIComponent(msg)
  }

  const canSend = !wantDelivery || barrio.trim().length > 0

  if (items.length === 0) {
    return (
      <section className="quote-cart quote-cart--empty" id="cotizador">
        <div className="quote-cart__empty-icon">🛒</div>
        <h3>Tu cotización está vacía</h3>
        <p>Agrega productos desde el menú para ver tu cotización aquí.</p>
        <a href="#menu" className="quote-cart__back-btn">Ver Menú</a>
      </section>
    )
  }

  return (
    <section className="quote-cart" id="cotizador">
      <div className="quote-cart__header">
        <h2 className="quote-cart__title">🧾 Tu Cotización</h2>
        <div className="quote-cart__header-actions">
          <span className="quote-cart__count">{items.length} producto{items.length !== 1 ? 's' : ''}</span>
          <button className="quote-cart__clear-btn" onClick={onClear} aria-label="Limpiar cotización">
            🗑️ Limpiar
          </button>
        </div>
      </div>

      <div className="quote-cart__list">
        {items.map(({ product, quantity }) => (
          <div className="quote-item" key={product.id}>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="quote-item__img"
              onError={e => { e.currentTarget.src = 'https://placehold.co/80x80/1a1a1a/f5c518?text=🍔' }}
            />
            <div className="quote-item__info">
              <span className="quote-item__name">{product.name}</span>
              <span className="quote-item__unit">{formatPrice(product.price)} c/u</span>
            </div>
            <div className="quote-item__controls">
              <button className="quote-item__qty-btn" onClick={() => onUpdateQuantity(product.id, quantity - 1)} aria-label="Disminuir">−</button>
              <span className="quote-item__qty">{quantity}</span>
              <button className="quote-item__qty-btn" onClick={() => onUpdateQuantity(product.id, quantity + 1)} aria-label="Aumentar">+</button>
            </div>
            <span className="quote-item__subtotal">{formatPrice(product.price * quantity)}</span>
            <button className="quote-item__remove" onClick={() => onRemove(product.id)} aria-label={`Eliminar ${product.name}`}>✕</button>
          </div>
        ))}
      </div>

      {/* Domicilio */}
      <label className="quote-cart__delivery">
        <input
          type="checkbox"
          checked={wantDelivery}
          onChange={onToggleDelivery}
          className="quote-cart__delivery-check"
        />
        <span className="quote-cart__delivery-label">
          🛵 Quiero domicilio <strong>(bolsa para llevar: {formatPrice(deliveryCost)} extra)</strong>
        </span>
      </label>

      {/* Campo barrio — aparece solo si marcó domicilio */}
      {wantDelivery && (
        <div className="quote-cart__barrio">
          <label className="quote-cart__barrio-label" htmlFor="barrio-input">
            🏠 ¿En qué barrio te entregamos?
          </label>
          <input
            id="barrio-input"
            type="text"
            className="quote-cart__barrio-input"
            placeholder="Escribe el nombre de tu barrio..."
            value={barrio}
            onChange={e => setBarrio(e.target.value)}
            maxLength={80}
          />
          {!barrio.trim() && (
            <p className="quote-cart__barrio-hint">
              ⚠️ Necesitamos tu barrio para cotizarte el domicilio y darte el valor final.
            </p>
          )}
        </div>
      )}

      <div className="quote-cart__summary">
        <div className="quote-cart__total-row">
          <span className="quote-cart__total-label">Total estimado</span>
          <span className="quote-cart__total">{formatPrice(total)}</span>
        </div>
        <a
          href={canSend ? `https://wa.me/${WA_DOMIS}?text=${buildWaMessage()}` : undefined}
          target="_blank"
          rel="noopener noreferrer"
          className={`quote-cart__wa-btn${!canSend ? ' quote-cart__wa-btn--disabled' : ''}`}
          onClick={e => { if (!canSend) e.preventDefault() }}
          aria-disabled={!canSend}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {canSend ? 'Pedir por WhatsApp' : 'Escribe tu barrio para continuar'}
        </a>
      </div>
    </section>
  )
}
