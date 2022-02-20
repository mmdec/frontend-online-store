export function getCartItem() {
  return JSON.parse(localStorage.getItem('items'));
}

export function saveCartItem(data) {
  const prevItems = getCartItem() || [];
  if (prevItems.every((prevItem) => prevItem.id !== data.id)) {
    prevItems.push({ ...data, quantityToBuy: 1 });
    localStorage.setItem('items', JSON.stringify(prevItems));
  } else {
    const updatedItems = prevItems.map((item) => {
      if (data.id === item.id) {
        return ({ ...data, quantityToBuy: item.quantityToBuy + 1 });
      }
      return item;
    });

    localStorage.setItem('items', JSON.stringify(updatedItems));
  }
}

export function attQuantityToBuy(id, newQuantity) {
  const prevItems = getCartItem();
  const updatedItems = prevItems.map((item) => {
    if (item.id === id) {
      return (
        { ...item, quantityToBuy: newQuantity }
      );
    }
    return item;
  });

  localStorage.setItem('items', JSON.stringify(updatedItems));
}

export function removeCartItem(index) {
  const prevItems = getCartItem();
  prevItems.splice(index, 1);
  localStorage.setItem('items', JSON.stringify(prevItems));
}

export function getRate() {
  return JSON.parse(localStorage.getItem('dataForm'));
}

export function saveRate(email, rate, evaluation, id) {
  const dataForm = { email, rate, evaluation, id };
  const prevItems = getRate() || [];
  prevItems.push(dataForm);
  localStorage.setItem('dataForm', JSON.stringify(prevItems));
}

export function getTotalPrice() {
  const savedItems = getCartItem();
  let totalPrice = 0;

  savedItems.forEach((item) => {
    totalPrice += item.price * item.quantityToBuy;
  });

  return totalPrice;
}

export function getCartSize() {
  const savedItems = getCartItem() || [];
  let totalQuantity = 0;
  savedItems.forEach((item) => {
    totalQuantity += item.quantityToBuy;
  });
  return totalQuantity;
}