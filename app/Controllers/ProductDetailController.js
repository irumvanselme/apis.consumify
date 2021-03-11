import Controller from "./Controller.js";
import { ProductDetail, validate } from "../Models/ProductDetail.js";

class ProductDetailController extends Controller {
    async get_all(req, res) {
        try {
            const productCategories = await ProductDetail.find();
            return res.send(productCategories);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async get_one(req, res) {
        try {
            const productDetail = await ProductDetail.findById(req.params.id);
            if (!productDetail)
                return res
                    .status(404)
                    .send({ message: "ProductDetail not found" });
            return res.send(productDetail);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async create(req, res) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            let productDetail = new ProductDetail(req.body);
            let newProductDetail = await productDetail.save();

            if (newProductDetail) return res.send(newProductDetail);
            return res
                .status(400)
                .send({ message: "Failed to create a new productDetail" });
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async edit(req, res) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            const productDetail = await ProductDetail.findById(req.params.id);
            if (!productDetail)
                return res
                    .status(404)
                    .send({ message: "ProductDetail not found" });

            const updatedProductDetail = await ProductDetail.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedProductDetail)
                return res
                    .status(500)
                    .send({ message: "Failed to update the productDetail " });
            return res.send(updatedProductDetail);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async delete(req, res) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            const productDetail = await ProductDetail.findById(req.params.id);
            if (!productDetail)
                return res
                    .status(404)
                    .send({ message: "ProductDetail not found" });

            const deletedProductDetail = await ProductDetail.findByIdAndDelete(
                req.params.id
            );
            if (!deletedProductDetail)
                return res
                    .status(500)
                    .send({ message: "Failed to delete the productDetail " });
            return res.send(deletedProductDetail);
        } catch (e) {
            return res.status(500).send(e);
        }
    }
}

export default new ProductDetailController();
