const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 4000;

//Settings
app.set("appName", "Fazt Express");

//Middlewares
app.use(express.json()); //para que entienda el json
app.use(morgan("dev"));

//Routs
// app.all('/user', (req, res, next) => {
// console.log('Paso por aca');
//     next();
// });

app.get("/", (req, res) => {
  const data = [{ name: "John" }, { name: "Joe" }, { name: "Cameron" }];
  res.render("index.ejs", { people: data });
});

app.get("/user", (req, res) => {
  res.json({
    usernmae: "Cameron",
    lastnmae: "Howe",
  });
});

app.post("/user/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  res.send("POST REQUEST RECEIVED");
});

app.put("/user/:id", (req, res) => {
  res.send(`User ${req.params.id} update`);
});

app.delete("/user/:userId", (req, res) => {
  res.send(`User ${req.params.userId} deleted`);
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(app.get("appName"));
  console.log(`Server port ${port}!`);
});

// MODO

app.post("/api/modo-checkout", async (req, res) => {
  res.json(await createPaymentIntention(req));
})

const BASE_URL_MODO = 'https://merchants.playdigital.com.ar';
const STORE_ID = '{STORE_ID}';

// Create Payment Intention
const createPaymentIntention = async (req) => {

  // Crear orden de compra en la base de datos de la tienda
  const mockOrder = {
    id: 123,
  };

  const accessToken = await generateAccessToken();

  const response = await axios.post(`${BASE_URL_MODO}/merchants/ecommerce/payment-intention`,
    {
      productName: 'Producto botón de pago',
      price: req.body.price,
      quantity: 1,
      storeId: STORE_ID,
      currency: 'ARS',
      externalIntentionId: mockOrder.id,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

  return response.data;
};

// const BASE_URL_MODO = 'https://merchants.playdigital.com.ar';
const CLIENT_ID = '{CLIENT_ID}';
const CLIENT_SECRET = '{CLIENT_SECRET}';

// Create Access Token
const generateAccessToken = async () => {
  const response = await axios.post(`${BASE_URL_MODO}/merchants/middleman/token`,
    {
      username: CLIENT_ID,
      password: CLIENT_SECRET,
    },
    { headers: { 'Content-Type': 'application/json' } });
  return response.data.accessToken;
};
