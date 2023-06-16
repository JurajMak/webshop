export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_TO_CART": {
      const { item, selectedQuantity } = action.payload;
      const existingItem = state.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + selectedQuantity,
        };

        if (updatedItem.quantity > item.quantity) {
          return state;
        }

        localStorage.setItem(
          `shoppingData_${item.id}`,
          JSON.stringify(updatedItem)
        );

        return state.map((cartItem) =>
          cartItem.id === item.id ? updatedItem : cartItem
        );
      } else {
        const newItem = { ...item, quantity: selectedQuantity };

        if (newItem.quantity > item.quantity) {
          return state;
        }

        localStorage.setItem(
          `shoppingData_${item.id}`,
          JSON.stringify(newItem)
        );

        return [...state, newItem];
      }
    }

    case "ADD_QUANTITY": {
      const { item, data } = action.payload;
      const flatten = data?.pages.flatMap((item) => item);
      const dataItem = flatten.find((dataItem) => dataItem.id === item.id);
      const cartItemIndex = state.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      const cartItem = state[cartItemIndex];

      if (cartItem && cartItem.quantity === dataItem.quantity) {
        return state;
      }

      const updatedCartItem = cartItem
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : { ...item, quantity: 1 };

      const updatedState = [...state];
      if (cartItemIndex >= 0) {
        updatedState[cartItemIndex] = updatedCartItem;
      } else {
        updatedState.push(updatedCartItem);
      }

      localStorage.setItem(
        `shoppingData_${item.id}`,
        JSON.stringify(updatedCartItem)
      );
      return updatedState;
    }

    case "ADD_QUANTITY_PRODUCT_PAGE": {
      const { item, product } = action.payload;
      const cartItemIndex = state.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      const cartItem = state[cartItemIndex];

      if (cartItem && cartItem.quantity === product.quantity) {
        return state;
      }

      const updatedCartItem = cartItem
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : { ...item, quantity: 1 };

      const updatedState = [...state];
      if (cartItemIndex >= 0) {
        updatedState[cartItemIndex] = updatedCartItem;
      } else {
        updatedState.push(updatedCartItem);
      }

      localStorage.setItem(
        `shoppingData_${item.id}`,
        JSON.stringify(updatedCartItem)
      );

      return updatedState;
    }

    case "REMOVE_QUANTITY": {
      const { item } = action.payload;
      const updatedState = state.map((cart) => {
        if (cart.id === item.id && cart.quantity > 1) {
          const updatedItem = { ...cart, quantity: cart.quantity - 1 };
          localStorage.setItem(
            `shoppingData_${item.id}`,
            JSON.stringify(updatedItem)
          );
          return updatedItem;
        } else if (cart.id === item.id && cart.quantity > 1) {
          localStorage.removeItem(`shoppingData_${item.id}`);
          return null;
        }
        return cart;
      });
      return updatedState.filter((cart) => cart !== null);
    }

    case "DELETE_ITEM": {
      const { id } = action.payload;
      const updatedState = state.filter((item) => item.id !== id);
      localStorage.removeItem(`shoppingData_${id}`);
      return updatedState;
    }

    case "DELETE_ALL_CART": {
      for (let key in localStorage) {
        if (key.includes(`shoppingData_`)) {
          localStorage.removeItem(key);
        }
      }
      return [];
    }
    case "LOAD_CART_FROM_STORAGE": {
      const cartItems = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes("shoppingData_")) {
          cartItems.push(JSON.parse(localStorage.getItem(key)));
        }
      }
      return cartItems;
    }

    default:
      return state;
  }
};
