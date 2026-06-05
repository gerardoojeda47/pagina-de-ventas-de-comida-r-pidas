/**
 * Agrega un producto al carrito de cotización.
 * Si ya existe, incrementa quantity; si no, lo agrega con quantity=1.
 */
export function addToQuote(quoteItems, product) {
  const existing = quoteItems.find(item => item.product.id === product.id)
  if (existing) {
    return quoteItems.map(item =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  }
  return [...quoteItems, { product, quantity: 1 }]
}

/**
 * Elimina un producto del carrito por su id.
 */
export function removeFromQuote(quoteItems, productId) {
  return quoteItems.filter(item => item.product.id !== productId)
}

/**
 * Actualiza la cantidad de un producto. Si quantity <= 0, lo elimina.
 */
export function updateQuantity(quoteItems, productId, quantity) {
  if (quantity <= 0) return removeFromQuote(quoteItems, productId)
  return quoteItems.map(item =>
    item.product.id === productId ? { ...item, quantity } : item
  )
}

/**
 * Calcula el total de la cotización.
 */
export function calculateTotal(quoteItems) {
  return quoteItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
}

/**
 * Formatea un número como precio en COP.
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price)
}
