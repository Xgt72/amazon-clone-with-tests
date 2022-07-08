const userOne = {
  username: "John Doe",
  email: "test@gmail.com",
  password: "Test@123",
};

const userTwo = {
  username: "Jane Doe",
  email: "test1@gmail.com",
  password: "Test@1234",
};

const productOne = {
  title:
    "Nintendo Switch avec paire de Joy-Con Rouge N&eacute;on et Bleu N&eacute;on",
  price: 329.99,
  image:
    "https://images-na.ssl-images-amazon.com/images/I/71r5EDssKdL._AC_SX679_.jpg",
  rating: 5,
};

const productTwo = {
  title:
    "Dell S2721D &Eacute;cran de PC 27&quot; Quad HD IPS 75 Hz AMD FreeSync, Argent",
  price: 249.99,
  image:
    "https://images-na.ssl-images-amazon.com/images/I/819hVHPVu-L._AC_SX679_.jpg",
  rating: 4,
};

const command = {
  userId: 0,
  paymentIntentId: "testggsggs",
  amount: 643.59,
};

const basketOne = {
  commandId: 1,
  productId: 1,
  quantity: 1,
};

const basketTwo = {
  commandId: 1,
  productId: 2,
  quantity: 2,
};

module.exports = {
  basketOne,
  basketTwo,
  command,
  productOne,
  productTwo,
  userOne,
  userTwo,
};
