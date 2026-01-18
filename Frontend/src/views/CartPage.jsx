import { Link } from "react-router-dom";


const CartPage = () => { 
    <section className="cart-container">
      <h2>Detalles del pedido:</h2>

      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío 🍕</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <article key={item.id} className="producto">
              <img src={item.img} alt={item.name} />
              <span className="producto-titulo">{item.name}</span>
              <span>${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>

              <div className="cantidad-container">
                <button className="btn-menos" onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button className="btn-mas" onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>

              <button className='remove-btn' onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </article>
          ))}

          <h2>Total: ${getTotal().toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
          <button className="btn-pagar" onClick={enviarCarritoAlBackend}>
            Pagar
          </button>
        </>
      )}
    </section>  


 }
export default CartPage;