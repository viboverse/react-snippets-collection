// This is from shopping-cart-context.jsx file
import { createContext } from "react";

export const CartContext = createContext({
  items: [], // Basically we put this for better auto-complition
});

// How to provide context

// Anyway, we should destructure items again here!

function App() {
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
    addItemToCart: () => {},
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  const ctxValue = {
    items: shoppingCart.items, // Now Contex ans state are link together
    addItemToCart: handleAddItemToCart,
  };

  return (
    // Here we should LINK CONTEXT to STATE
    <CartContext.Provider value={ctxValue}>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContext.Provider>
  );
}

// We can destructure the value from context with { items } in order to use this value in other components
const { items } = useContext(CartContext);

console.log(items);
