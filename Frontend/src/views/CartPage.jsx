import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartPage = () => {
    const { cart, increaseQuantity, decreaseQuantity, removeFromCart, total, addToCart } = useCart();


    return (
        <>
            <div className="cart-page">
                <h1 className="cart-title">Carrito de Compras</h1>

                <div className="cart-list">
                    {cart.length === 0 ? (
                        <p>Tu carrito está vacío.</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="cart-item">
                                <img src={item.product.img} alt={item.product.nombre} className="cart-item-img" />

                                <div className="cart-item-info">
                                    <h3>{item.product.nombre}</h3>
                                    <p className="cart-item-price">${item.product.precio}</p>

                                    <div className="cart-controls">
                                        {/* addToCart suma 1 si ya existe */}
                                        <button className="cart-control-btn" onClick={() => addToCart(item.product)}>+</button>
                                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.quantity}</span>
                                        <button className="cart-control-btn" onClick={() => decreaseQuantity(item.product_id)}>-</button>
                                    </div>
                                    <button className="btn-remove" onClick={() => removeFromCart(item.product_id)} style={{ marginTop: '10px', color: 'red', border: 'none', background: 'transparent', cursor: 'pointer' }}>Eliminar</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-summary">
                        <div className="cart-total-row">
                            <span>Total</span>
                            <span className="cart-total-amount">${total.toFixed(3)}</span>
                        </div>
                        <Link to="/confirmacion">
                            <button className="cart-pay-btn">Pagar</button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartPage;
