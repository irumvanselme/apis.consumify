import _ from "lodash";

import Controller from "./Controller.js";
import { Product, validate } from "../Models/Product.js";
import { Brand } from "../Models/Brand.js";
import { ProductCategory } from "../Models/ProductCategory.js";
import { ConsumerCategory } from "../Models/ConsumerCategory.js";
import { ProductDetail } from "../Models/ProductDetail.js";
import { Review } from "../Models/Review.js";

class ProductController extends Controller {
    async get_all(req, res) {
        try {
            const messages = await Product.find();
            return res.send(messages);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    async create(req, res) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            const productData = { user: req.user._id, ...req.body };
            const product = new Product(productData);
            const newProduct = await product.save();

            if (!newProduct)
                return res
                    .status(500)
                    .send({ message: "Failed to create a product " });
            return res.status(201).send(newProduct);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async get_one(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            if (product) return res.send(product);
            return res.status(404).send({ message: "Product not found" });
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async reviews(req, res) {
        try {
            const reviews = await Review.find({ product: req.params.id });
            return res.send(reviews);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async details(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            if (!product)
                return res.status(404).send({ message: "Product not found" });
            let user = _.pick(product, [
                "_id",
                "name",
                "description",
                "brand",
                "categories",
                "rates",
                "colors",
                "about_the_product",
                "features",
                "images",
                "good_for",
                "bad_for",
                "details",
            ]);
            user.brand = await Brand.findById(user.brand);
            user.categories = await ProductCategory.find({
                _id: { $in: user.categories },
            });
            user.good_for = await ConsumerCategory.find()
                .where("_id")
                .in(user.good_for);
            user.bad_for = await ConsumerCategory.find()
                .where("_id")
                .in(user.bad_for);
            for (let i = 0; i < user.details.length; i++)
                user.details[i].detail = await ProductDetail.findById(
                    user.details[i].detail
                );

            return res.send(user);
        } catch (e) {
            return res.status(500).send(e);
        }
    }
}

export default new ProductController();
