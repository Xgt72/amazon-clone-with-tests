// Selector
export const getBasketTotal = (basket) => {
  if (basket.length) {
    return (
      Math.round(
        basket.reduce((total, item) => total + item.price * item.quantity, 0) *
          100
      ) / 100
    );
  }
  return 0;
};

export const getBasketProductQuantity = (basket) =>
  basket?.reduce((total, item) => total + item.quantity, 0);

const reducer = (state, action) => {
  // console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET": {
      const updatedBasket = [...state.basket];
      const itemIndex = updatedBasket.findIndex(
        (item) => item.id === action.item.id
      );
      if (itemIndex > -1) {
        updatedBasket[itemIndex].quantity += 1;
      } else {
        updatedBasket.push({ ...action.item, quantity: 1 });
      }
      return { basket: updatedBasket };
    }
    case "REMOVE_FROM_BASKET": {
      const indexToRemove = state.basket.findIndex(
        (item) => item.id === action.id
      );
      const updatedBasket = [...state.basket];
      if (updatedBasket[indexToRemove].quantity - 1 === 0) {
        updatedBasket.splice(indexToRemove, 1);
      } else {
        updatedBasket[indexToRemove].quantity -= 1;
      }
      return { basket: updatedBasket };
    }
    case "EMPTY_BASKET": {
      return { basket: [] };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
