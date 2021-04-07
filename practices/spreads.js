// Objetos

const key = 'age';

const user = {
  name: 'Juanito Perez',
  email: 'juanit@perez.com',
  password: 'juano-Rules1234',
  [key]: 87,
};

// Spread operator "..."

// Constructuring / Destructuring

const { password, ...safetyUser /* remaining */ } = user;
// password
// safetyUser

// safetyUser.name = "Pedrito"

const address = `
  P. Sherman
  Calle Wallaby #42
  Sydney
`;
// address

const userWithPhone = {
  ...user,
  ...safetyUser,
  address,
  phone: 4532345613,
};
// userWithPhone

// Mutabilidad
const refOfUser = user;
// refOfUser.name = "Fernandito"

const copyOfUser = { ...user };
//copyOfUser.name = "Fernandito"

//copyOfUser
//user

// Arreglos

// Constructuring / Destructuring

const fruits = ['🍎', '🍊', '🍒', '🍐', '🍑'];
const fast = ['🍔', '🍕', '🌭', '🌮'];
const dessert = ['🍰', '🍩', '🍧', '🍫', '🍮'];

const [apple, , , , peach] = fruits;

const food = [...fruits, ...fast, ...dessert];
// food

const copyOfFood = [...food];
