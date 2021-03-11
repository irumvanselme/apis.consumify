import Controller from "./Controller.js";
import { ConsumerCategory, validate } from "../Models/ConsumerCategory.js";

class ConsumerCategoryController extends Controller {
    async get_all(req, res) {
        try {
            const consumerCategories = await ConsumerCategory.find();
            return res.send(consumerCategories);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async get_one(req, res) {
        try {
            const consumerCategory = await ConsumerCategory.findById(
                req.params.id
            );
            if (!consumerCategory)
                return res
                    .status(404)
                    .send({ message: "ConsumerCategory not found" });
            return res.send(consumerCategory);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async create(req, res) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            let consumerCategory = new ConsumerCategory(req.body);
            let newConsumerCategory = await consumerCategory.save();

            if (newConsumerCategory) return res.send(newConsumerCategory);
            return res
                .status(400)
                .send({ message: "Failed to create a new consumerCategory" });
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async edit(req, res) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            const consumerCategory = await ConsumerCategory.findById(
                req.params.id
            );
            if (!consumerCategory)
                return res
                    .status(404)
                    .send({ message: "ConsumerCategory not found" });

            const updatedConsumerCategory = await ConsumerCategory.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedConsumerCategory)
                return res.status(500).send({
                    message: "Failed to update the consumerCategory ",
                });
            return res.send(updatedConsumerCategory);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async delete(req, res) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            const consumerCategory = await ConsumerCategory.findById(
                req.params.id
            );
            if (!consumerCategory)
                return res
                    .status(404)
                    .send({ message: "ConsumerCategory not found" });

            const deletedConsumerCategory = await ConsumerCategory.findByIdAndDelete(
                req.params.id
            );
            if (!deletedConsumerCategory)
                return res.status(500).send({
                    message: "Failed to delete the consumerCategory ",
                });
            return res.send(deletedConsumerCategory);
        } catch (e) {
            return res.status(500).send(e);
        }
    }
}

export default new ConsumerCategoryController();
