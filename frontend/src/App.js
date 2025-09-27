import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_BACKEND_URL || '';

function App() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch(`${API_URL}/api/menu`);
      const data = await response.json();
      setMenu(data.menu || []);
    } catch (error) {
      console.error('Error:', error);
      setMenu([
        {name: "Tacos al Pastor", description: "Deliciosos tacos", price: 15.0},
        {name: "Quesadillas", description: "Con queso derretido", price: 20.0},
        {name: "Agua Fresca", description: "Bebida refrescante", price: 8.0}
      ]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item) => {
    setCart([...cart, {...item, id: Date.now()}]);
  };

  if (loading) {
    return <div className="loading">Cargando menú...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🍽️ Restaurante Lety</h1>
        <p>Deliciosa comida casera</p>
        <div className="cart-info">
          Carrito: {cart.length} items
        </div>
      </header>

      <main className="menu-section">
        <h2>Nuestro Menú</h2>
        <div className="menu-grid">
          {menu.map((item, index) => (
            <div key={index} className="menu-item">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="price">${item.price}</span>
              <button onClick={() => addToCart(item)}>
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
