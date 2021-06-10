import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import postProductsRoutes from "./routes/products.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

//we should always specify routes after cors
app.use("/products", postProductsRoutes);

const PORT = process.env.PORT || 8000;
const CONNECTION_URL =
  "mongodb+srv://Shiv:O0U6uGxZBqrSaWpz@personal.pmaoi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(
      PORT,
      console.log(`server is up and database is connected on PORT: ${PORT}`)
    );
  })
  .catch((error) => {
    console.log(error.message);
  });

mongoose.set("useFindAndModify", false);
