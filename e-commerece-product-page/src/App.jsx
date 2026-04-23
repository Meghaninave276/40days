import { useState, useEffect } from 'react'
import './App.css'

const products = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    description: 'Superior sound with noise cancellation, 30h battery, ergonomic design.',
    images: [
      'https://i.pinimg.com/736x/40/4a/f6/404af639fe52abed419b0689f263c92e.jpg',
      'https://i.pinimg.com/736x/32/f0/81/32f081c44c5331162b54b47077385687.jpg',
      'https://i.pinimg.com/736x/c1/c9/9a/c1c99aa0d88b82bc32278592877ef831.jpg',
      'https://i.pinimg.com/736x/dc/34/db/dc34dbb8b9e2deddcd7b916a7bfacb9d.jpg',
      'https://i.pinimg.com/1200x/d1/fe/28/d1fe282fdaea14a1354eb2c855e9068c.jpg'
    ]
  },
  {
    id: '2',
    name: 'Smart Fitness Tracker',
    price: 149.99,
    description: '24/7 health monitoring, GPS tracking, waterproof, 7-day battery.',
    images: [
      'https://i.pinimg.com/736x/99/37/41/9937417a6efe2ea205b855d9730950ff.jpg',
      'https://i.pinimg.com/736x/db/2b/28/db2b2826a7118021f7c613ba586f9597.jpg',
      'https://i.pinimg.com/736x/2d/e8/24/2de82443ad2191540485a070dd279896.jpg',
      'https://i.pinimg.com/1200x/45/c7/f7/45c7f76e7fe0493f490072f3c08bcb6c.jpg'
    ]
  },
  {
    id: '3',
    name: '4K Action Camera',
    price: 399.99,
    description: 'Ultra HD video, waterproof 40m, stabilization, wide-angle lens.',
    images: [
      'https://i.pinimg.com/736x/84/81/e9/8481e94d8e7bef5ddac90c34bf6be64d.jpg',
      'https://i.pinimg.com/1200x/21/77/71/217771c1d04c170aebb76efbaa5b5986.jpg',
      'https://i.pinimg.com/736x/d6/11/0d/d6110d2da74655f7e108159b9b9932fa.jpg',
      'https://i.pinimg.com/736x/83/71/ff/8371ff1a59ca956323bb42ed4d51397b.jpg',
      'https://i.pinimg.com/736x/bd/7f/fc/bd7ffcf4d0f4060fc3924e8b6cfd1e4f.jpg'
    ]
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    price: 199.99,
    description: 'RGB lighting, hot-swappable switches, wireless, premium build.',
    images: [
      'https://i.pinimg.com/736x/79/7c/2d/797c2dcb9dffa76d83f2a11a7b33a8ba.jpg',
      'https://i.pinimg.com/736x/a3/f4/2a/a3f42a84e81c76133cfa80ecebe34300.jpg',
      'https://i.pinimg.com/736x/99/a7/7a/99a77a97631c0de79cf548068d2c1e72.jpg',
      'https://i.pinimg.com/1200x/f3/02/bb/f302bbab03e5b76e018b5b5a62701536.jpg'
    ]
  },
  {
    id: '5',
    name: 'Wireless Mouse Pro',
    price: 89.99,
    description: 'Ergonomic design, 16000 DPI sensor, customizable buttons.',
    images: [
      'https://i.pinimg.com/736x/25/b1/87/25b187f63561a8bd934d46a872675295.jpg',
      'https://i.pinimg.com/736x/d1/1d/26/d11d262da40e7d55b5fc4329b03fc373.jpg',
      'https://i.pinimg.com/736x/40/f0/97/40f097bd6458d6e8f31f2ad4dd944d6a.jpg'
    ]
  },
  {
    id: '6',
    name: 'Gaming Headset',
    price: 249.99,
    description: 'Surround sound, detachable mic, memory foam earcups, RGB.',
    images: [
      'https://i.pinimg.com/1200x/c8/ff/0d/c8ff0da9ae62b70ee97ac8f75d936b11.jpg',
      'https://i.pinimg.com/1200x/73/f8/dd/73f8dd8111a9849d0c6f02104eacd0dd.jpg',
      'https://i.pinimg.com/736x/19/c1/ab/19c1ab0c5a63a2d63da7cb3a33d6ed0e.jpg',
      'https://i.pinimg.com/736x/87/f2/b8/87f2b86a5e2053d36ec4c265afe94458.jpg'
    ]
  },
  {
    id: '7',
    name: 'Portable SSD 2TB',
    price: 179.99,
    description: 'High-speed NVMe, compact design, rugged aluminum casing.',
    images: [
      'https://i.pinimg.com/1200x/26/0b/83/260b8330f10193765e3e9c785bc3323f.jpg',
      'https://i.pinimg.com/1200x/b4/f3/56/b4f356783c46707059ffcd9a4e7ae612.jpg',
      'https://i.pinimg.com/1200x/79/ad/83/79ad83c02091151364f4432f9c3c5af5.jpg'
    ]
  },
  {
    id: '8',
    name: 'Smart Watch Ultra',
    price: 549.99,
    description: 'Advanced fitness tracking, GPS, dive-ready, 36h battery.',
    images: [
      'https://i.pinimg.com/736x/2d/c0/9d/2dc09d8599573d971ced60ebef6e59d0.jpg',
      'https://i.pinimg.com/736x/91/f7/1e/91f71e4e69a385a26596ac1bf80bc612.jpg',
      'https://i.pinimg.com/736x/25/90/7a/25907a6edee978f6d8efa44350930843.jpg',
      'https://i.pinimg.com/1200x/97/43/8b/97438bb8ebd98f60117cff30408f4e12.jpg'
    ]
  },
  {
    id: '9',
    name: 'Bluetooth Speaker',
    price: 129.99,
    description: '360° sound, waterproof IPX7, 24h playtime, app control.',
    images: [
      'https://i.pinimg.com/1200x/f4/ae/be/f4aebe87a148e7dca9c24e123c758ec4.jpg',
      'https://i.pinimg.com/736x/30/47/16/304716078c609cb2138c5856d888c100.jpg',
      'https://i.pinimg.com/originals/8e/a9/d1/8ea9d16a6377daab4d95946c237e5ed1.gif'
    ]
  },
  {
    id: '10',
    name: 'Gaming Mouse Pad XL',
    price: 39.99,
    description: 'Large stitched edges, micro-weave surface, non-slip base.',
    images: [
      'https://i.pinimg.com/1200x/94/bb/96/94bb96447fa1825e1bd1a88e7e2efb21.jpg',
      'https://i.pinimg.com/1200x/49/20/61/49206174e93f275aaf1ce0eec1b8d2f5.jpg',
      'https://i.pinimg.com/1200x/30/3b/07/303b07bd44acc151eb40e350d05bdac4.jpg',
      'https://i.pinimg.com/1200x/12/e5/6a/12e56ace348d689ff755a072eb7859ef.jpg'
    ]
  },
 {
  id: '11',
  name: 'USB-C Fast Charger 65W',
  price: 29.99,
  description: 'Fast charging support, compact design, compatible with laptops and phones.',
  images: [
    'https://i.pinimg.com/1200x/5f/c3/f4/5fc3f497d779f0115a0483dba1306114.jpg',
    'https://i.pinimg.com/736x/af/cf/49/afcf490de8c0cfa661e0c978aecbc3d3.jpg',
    'https://i.pinimg.com/1200x/01/44/31/0144316a6edc8fe6e98a2c72f0e0d068.jpg',
    'https://i.pinimg.com/736x/32/13/be/3213beaa7b7efba70ef15e1b940b6855.jpg'
  ]
},
 {
  id: '12',
  name: '1080p HD Webcam',
  price: 69.99,
  description: 'Full HD video, built-in microphone, plug and play USB connectivity.',
  images: [
    'https://i.pinimg.com/736x/f5/35/9f/f5359f4e9e7f30cfddc3f9cc460e461d.jpg',
    'https://i.pinimg.com/736x/65/4f/b6/654fb6efa82536bd443668c24b06fe9e.jpg',
    'https://i.pinimg.com/1200x/66/c9/0d/66c90da2c5453fe5079246c6ecbf9d96.jpg',
    'https://i.pinimg.com/1200x/b0/df/2d/b0df2d589521b263780b616808d5d5a3.jpg'
  ]
}

]

function ImageGallery({ images, selectedImage, onImageSelect, product }) {
  return (
    <div className="image-gallery">
      <div className="main-image-container">
        <img 
          src={images[selectedImage]} 
          alt={product.name} 
          className="main-image"
        />
      </div>
      <div className="thumbnails">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${product.name} ${index + 1}`}
            className={`thumbnail ${index === selectedImage ? 'active' : ''}`}
            onClick={() => onImageSelect(index)}
          />
        ))}
      </div>
    </div>
  )
}

function QuantitySelector({ quantity, onQuantityChange }) {
  const increment = () => onQuantityChange(quantity + 1)
  const decrement = () => quantity > 1 && onQuantityChange(quantity - 1)

  return (
    <div className="quantity-selector">
      <button onClick={decrement} className="qty-btn">-</button>
      <span className="qty-display">{quantity}</span>
      <button onClick={increment} className="qty-btn">+</button>
    </div>
  )
}

function AddToCartButton({ quantity, selectedImage, product, onAddToCart }) {
  const handleAdd = () => {
    onAddToCart({ 
      ...product, 
      quantity, 
      selectedImage: product.images[selectedImage] 
    })
  }

  return (
    <button onClick={handleAdd} className="add-to-cart-btn">
      Add to Cart - ${(product.price * quantity).toFixed(2)}
    </button>
  )
}

function CartPreview({ cartCount }) {
  return (
    <div className="cart-preview">
      🛒 {cartCount} items in cart
    </div>
  )
}

function ProductDetails({ product }) {
  return (
    <div className="product-details">
      <h1 className="product-name">{product.name}</h1>
      <div className="product-price">${product.price.toFixed(2)}</div>
      <p className="product-description">{product.description}</p>
    </div>
  )
}

function App() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [cart, setCart] = useState([])
  const [showToast, setShowToast] = useState(false)
  const [view, setView] = useState('list')
  const [selectedProductId, setSelectedProductId] = useState(null)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const selectedProduct = products.find(p => p.id === selectedProductId) || products[0]

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item) => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)

    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        )
      }
      return [...prevCart, item]
    })
  }

  const productListView = (
    <div className="product-list">
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card" onClick={() => {
            setSelectedProductId(product.id)
            setView('detail')
          }}>
            <img src={product.images[0]} alt={product.name} className="card-image" />
            <div className="card-content">
              <h3>{product.name}</h3>
              <div className="card-price">${product.price.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const detailView = (
    <>
      <button className="back-btn" onClick={() => setView('list')}>
        ← Back to Products
      </button>
      <main className="product-container">
        <ImageGallery
          images={selectedProduct.images}
          selectedImage={selectedImage}
          onImageSelect={setSelectedImage}
          product={selectedProduct}
        />
        <div className="details-section">
          <ProductDetails product={selectedProduct} />
          <QuantitySelector
            quantity={quantity}
            onQuantityChange={setQuantity}
          />
          <AddToCartButton
            quantity={quantity}
            selectedImage={selectedImage}
            product={selectedProduct}
            onAddToCart={addToCart}
          />
        </div>
      </main>
    </>
  )

  return (
    <div className="app">
      <header className="header">
        <h2>{view === 'detail' ? selectedProduct.name : 'Modern eCommerce Store'}</h2>
        <CartPreview cartCount={cartCount} />
      </header>
      <main>
        {view === 'list' ? productListView : detailView}
      </main>
      {showToast && (
        <div className="toast">
          ✅ {selectedProduct.name} added to cart!
        </div>
      )}
    </div>
  )
}

export default App

