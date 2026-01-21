import React, { useState } from "react";
import { Link } from "react-router-dom";
import sillaImg from "../assets/img/silla.png";
import cestaImg from "../assets/img/cesta.png"; // Descomentar cuando tengas la imagen "cesta.png"

const CartPage = () => {
    // Mock data matching the screenshot
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Silla de oficina giratoria semi cuero Nogal/Cuero",
            price: 120.000,
            image: sillaImg,
            quantity: 1
        },
        {
            id: 2,
            name: "Cesta para almacenamiento",
            price: 15.000,
            image: cestaImg,
            quantity: 1
        }
    ]);

    const increaseQuantity = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const decreaseQuantity = (id) => {
        setCartItems(cartItems.map(item =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        ));
    };

    // Calculate total
    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    //const handlePay = () => {
        // Navigates to the teammate's page (assuming '/pago')
        // navigate('/pago');
        //alert("Navegando a la página de pago (en construcción por compañera)");
        // window.location.href = "/pago"; // Uncomment if route exists
    //};

    return (
        <>

            <div className="cart-page">
                <h1 className="cart-title">Carrito de Compras</h1>

                <div className="cart-list">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-img" />

                            <div className="cart-item-info">
                                <h3>{item.name}</h3>
                                <p className="cart-item-price">${item.price.toFixed(3)}</p>

                                <div className="cart-controls">
                                    <button className="cart-control-btn" onClick={() => increaseQuantity(item.id)}>+</button>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.quantity}</span>
                                    <button className="cart-control-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <div className="cart-total-row">
                        <span>Total</span>
                        <span className="cart-total-amount">${total.toFixed(3)}</span>
                    </div>
                    <Link to="/confirmacion">
                        <button className="cart-pay-btn">Pagar</button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default CartPage;
