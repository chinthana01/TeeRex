
// import React, { useContext } from 'react';
// import './CartPage.css';
// import { CartContext } from './CartContext';

// const CartPage = () => {
//   const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);

//   // Calculate the total amount
//   const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   //const uniqueItems = Array.from(new Set(cart.map((item) => item.id)));

//   return (
//     <div className="cart">
//       <h1 className="cart__title">Shopping Cart</h1>
//       <div className="cart__items">
//         {cart.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <div>
//             {cart.map((item) => (
//               <div key={item.id} className="cart__item">
//                 <div className="cart__item-details">
//                   <h3>{item.name}</h3>
//                   <img src={item.imageURL} alt="product" />
//                   <p>Price: ${item.price}</p>
//                   <p>Quantity:{item.quantity}</p>
//                   <div className="cart__item-quantity">
//   <button onClick={() => decreaseQuantity(item.id)}>-</button>
//   <span>{item.quantity}</span>
//   <button
//     onClick={() => increaseQuantity(item.id)}
//     disabled={item.quantity >= item.stockQuantity} // Disable the button when quantity reaches stock quantity
//   >
//     +
//   </button>
// </div>

                 
//                 </div>
//                 <button onClick={() => removeFromCart(item.id)} className="cart__item-remove">
//                   Remove
//                 </button>
//               </div>
//             ))}
//             <div className="cart__total">
//               <h3>Total Amount: ${totalAmount}</h3>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;


// import React, { useContext, useEffect, useState } from 'react';
// import './CartPage.css';
// import { CartContext } from './CartContext';

// const CartPage = () => {
//   const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
//   const [catalogue, setCatalogue] = useState([]);

//   useEffect(() => {
//     fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
//       .then(response => response.json())
//       .then(data => setCatalogue(data))
//       .catch(error => console.log('Error fetching API data:', error));
//   }, []);

//   const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className="cart">
//       <h1 className="cart__title">Shopping Cart</h1>
//       <div className="cart__items">
//         {cart.length === 0 ? (
//           <p>Your cart is empty.</p>
//         ) : (
//           <div>
//             {cart.map((item) => {
//               const matchingItem = catalogue.find(apiItem => apiItem.id === item.id);
//               return (
//                 <div key={item.id} className="cart__item">
//                   <div className="cart__item-details">
//                     <h3>{item.name}</h3>
//                     <img src={item.imageURL} alt="product" />
//                     <p>Price: ${item.price}</p>
//                     <p>Quantity: {matchingItem ? matchingItem.quantity : 0}</p>
//                     <div className="cart__item-quantity">
//                       <button onClick={() => decreaseQuantity(item.id)}>-</button>
//                       <span>{item.quantity}</span>
//                       <button
//                         onClick={() => increaseQuantity(item.id)}
//                         disabled={item.quantity >= item.stockQuantity} // Disable the button when quantity reaches stock quantity
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                   <button onClick={() => removeFromCart(item.id)} className="cart__item-remove">
//                     Remove
//                   </button>
//                 </div>
//               );
//             })}
//             <div className="cart__total">
//               <h3>Total Amount: ${totalAmount}</h3>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;

import React, { useContext, useEffect, useState } from 'react';
import './CartPage.css';
import { CartContext } from './CartContext';

const CartPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const [catalogue, setCatalogue] = useState([]);

  useEffect(() => {
    fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
      .then(response => response.json())
      .then(data => setCatalogue(data))
      .catch(error => console.log('Error fetching API data:', error));
  }, []);

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h1 className="cart__title">Shopping Cart</h1>
      <div className="cart__items">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((item) => {
              const matchingItem = catalogue.find(apiItem => apiItem.id === item.id);
              const isOutOfStock = matchingItem && item.quantity >= matchingItem.quantity;

              return (
                <div key={item.id} className="cart__item">
                  <div className="cart__item-details">
                    <h3>{item.name}</h3>
                    <img src={item.imageURL} alt="product" />
                    <p>Price: ${item.price}</p>
                    <p>
                      {/* Quantity:  */}
                      {/* {matchingItem ? matchingItem.quantity : 0} */}
                      {isOutOfStock && <span> (Out of stock)</span>}
                    </p>
                    <div className="cart__item-quantity">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={isOutOfStock}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        disabled={isOutOfStock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="cart__item-remove">
                    Remove
                  </button>
                </div>
              );
            })}
            <div className="cart__total">
              <h3>Total Amount: ${totalAmount}</h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;


