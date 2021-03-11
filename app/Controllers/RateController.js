import Controller from "./Controller.js";
import { Rate, validate } from "../Models/Rate.js";
import { Product } from "../Models/Product.js";

class RateController extends Controller {
    async get_all(req, res) {
        try {
            const rates = await Rate.find();
            return res.send(rates);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async get_one(req, res) {
        try {
            const rate = await Rate.findById(req.params.id);
            if (!rate)
                return res.status(404).send({ message: "Rate not found" });
            return res.send(rate);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async create(req, res) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            const product = await Product.findById(req.params.id);
            if (!product)
                return res
                    .status(404)
                    .send({ message: "Product not found ..." });

            let rate = new Rate({
                user: req.user._id,
                product: req.params.id,
                rate_count: req.body.rate_count,
            });
            let newRate = await rate.save();

            if (newRate) return res.send(newRate);
            return res
                .status(400)
                .send({ message: "Failed to create a new rate" });
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async edit(req, res) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            const rate = await Rate.findById(req.params.id);
            if (!rate)
                return res.status(404).send({ message: "Rate not found" });

            const updatedRate = await Rate.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedRate)
                return res.status(500).send({
                    message: "Failed to update the rate ",
                });
            return res.send(updatedRate);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async delete(req, res) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            const rate = await Rate.findById(req.params.id);
            if (!rate)
                return res.status(404).send({ message: "Rate not found" });

            const deletedRate = await Rate.findByIdAndDelete(req.params.id);
            if (!deletedRate)
                return res.status(500).send({
                    message: "Failed to delete the rate ",
                });
            return res.send(deletedRate);
        } catch (e) {
            return res.status(500).send(e);
        }
    }
}

export default new RateController();
