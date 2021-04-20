import Controller from "./Controller.js";
import { ProductCategory, validate } from "../Models/ProductCategory.js";
import { Product } from "../Models/Product.js";

class ProductCategoryController extends Controller {
    async get_all(req, res) {
        try {
            const productCategories = await ProductCategory.find();
            return res.send(productCategories);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async get_one(req, res) {
        try {
            const productCategory = await ProductCategory.findById(
                req.params.id
            );

            if (!productCategory)
                return res
                    .status(404)
                    .send({ message: "ProductCategory not found" });

            if (productCategory.parent_category)
                productCategory.parent_category = await ProductCategory.findById(
                    productCategory.parent_category
                );

            return res.send(productCategory);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async products(req, res) {
        try {
            const products = await Product.find({ category: req.params.id });
            return res.send(products);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    async create(req, res) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            let productCategory = new ProductCategory(req.body);
            let newProductCategory = await productCategory.save();

            if (newProductCategory) return res.send(newProductCategory);
            return res
                .status(400)
                .send({ message: "Failed to create a new productCategory" });
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async edit(req, res) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            const productCategory = await ProductCategory.findById(
                req.params.id
            );
            if (!productCategory)
                return res
                    .status(404)
                    .send({ message: "ProductCategory not found" });

            const updatedProductCategory = await ProductCategory.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedProductCategory)
                return res
                    .status(500)
                    .send({ message: "Failed to update the productCategory " });
            return res.send(updatedProductCategory);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async delete(req, res) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            const productCategory = await ProductCategory.findById(
                req.params.id
            );
            if (!productCategory)
                return res
                    .status(404)
                    .send({ message: "ProductCategory not found" });

            const deletedProductCategory = await ProductCategory.findByIdAndDelete(
                req.params.id
            );
            if (!deletedProductCategory)
                return res
                    .status(500)
                    .send({ message: "Failed to delete the productCategory " });
            return res.send(deletedProductCategory);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async parents(req, res) {
        try {
            let categories = await ProductCategory.find({
                parent_category: null,
            });
            return res.send(categories);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    async children(req, res) {
        try {
            let categories = await ProductCategory.find({
                parent_category: {
                    $ne: null,
                },
            });
            return res.send(categories);
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    async category_children(req, res) {
        try {
            let categories = await ProductCategory.find({
                parent_category: req.params.id,
            });
            return res.send(categories);
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

export default new ProductCategoryController();
