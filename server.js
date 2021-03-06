import "./Config/Database.js";

import express from "express";
import logger from "morgan";
import path from "path";
import cors from "cors";

import product_routes from "./app/Routes/Product.js";
import rates_routes from "./app/Routes/Rate.js";
import user_routes from "./app/Routes/Users.js";
import auth_routes from "./app/Routes/Auth.js";
import brand_routes from "./app/Routes/Brand.js";
import review_routes from "./app/Routes/Review.js";
import consumer_category_routes from "./app/Routes/ConsumerCategory.js";
import product_category_routes from "./app/Routes/ProductCategory.js";
import product_detail_routes from "./app/Routes/ProductDetail.js";
import files_routes from "./app/Routes/File.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(
    logger(":method :url :status :res[content-length] - :response-time ms")
);

app.get("/", (req, res) =>
    res.sendFile(path.join(path.resolve(), "public/welcome.html"))
);

app.use("/api/brands", brand_routes);
app.use("/api/rates", rates_routes);
app.use("/api/consumer-categories", consumer_category_routes);
app.use("/api/product-categories", product_category_routes);
app.use("/api/product-details", product_detail_routes);
app.use("/api/product/reviews", review_routes);
app.use("/api/products", product_routes);
app.use("/api/users", user_routes);
app.use("/api/auth", auth_routes);
app.use("/api/files", files_routes);

app.listen(process.env.PORT, () => {
    console.log(
        `[${new Date()}] Development Server  (http://localhost:${
            process.env.PORT
        }) started`
    );
});
