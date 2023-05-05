export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const { item } = action.payload;
      const ifExists = state.some((cart) => cart.id === item.id);
      if (ifExists) {
        return state.map((cart) => {
          if (cart.id === item.id) {
            const updatedQuantity = cart.quantity + 1;
            if (updatedQuantity > item.quantity) {
              return cart;
            }
            const updatedItem = { ...cart, quantity: updatedQuantity };
            localStorage.setItem(
              `shoppingData_${item.id}`,
              JSON.stringify(updatedItem)
            );
            return updatedItem;
          }
          return cart;
        });
      } else {
        const newItem = { ...item, quantity: 1 };
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

      if (cartItem && cartItem.quantity >= dataItem.quantity) {
        return state;
      }
      console.log("data", data);
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
        if (key.startsWith("shoppingData_")) {
          cartItems.push(JSON.parse(localStorage.getItem(key)));
        }
      }
      return cartItems;
    }

    default:
      return state;
  }
};
