app.post("/api/modo-checkout", async (req, res) => {
    res.json(await createPaymentIntention(req));
  });
  
  const BASE_URL_MODO = "https://merchants.playdigital.com.ar";
  const STORE_ID = "{STORE_ID}";
  
  // Create Payment Intention
  const createPaymentIntention = async (req) => {
    // Crear orden de compra en la base de datos de la tienda
    const mockOrder = {
      id: 123,
    };
  
    const accessToken = await generateAccessToken();
  
    const response = await axios.post(
      `${BASE_URL_MODO}/merchants/ecommerce/payment-intention`,
      {
        productName: "Producto botón de pago",
        price: req.body.price,
        quantity: 1,
        storeId: STORE_ID,
        currency: "ARS",
        externalIntentionId: mockOrder.id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  
    return response.data;
  };
  
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
  