import Controller from "./Controller.js";
import { Brand, validate } from "../Models/Brand.js";

class BrandController extends Controller {
    async get_all(req, res) {
        try {
            const brands = await Brand.find();
            return res.send(brands);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async get_one(req, res) {
        try {
            const brand = await Brand.findById(req.params.id);
            if (!brand)
                return res.status(404).send({ message: "Brand not found" });
            return res.send(brand);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async create(req, res) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            let brand = await Brand.findOne({ name: req.body.name });
            if (brand)
                return res
                    .status(400)
                    .send({ message: "Brand Already registered ..." });

            brand = new Brand(req.body);
            let newBrand = await brand.save();

            if (newBrand) return res.send(newBrand);
            return res
                .status(400)
                .send({ message: "Failed to create a new brand" });
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async edit(req, res) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            const brand = await Brand.findById(req.params.id);
            if (!brand)
                return res.status(404).send({ message: "Brand not found" });

            const updatedBrand = await Brand.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedBrand)
                return res
                    .status(500)
                    .send({ message: "Failed to update the brand " });
            return res.send(updatedBrand);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async delete(req, res) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            const brand = await Brand.findById(req.params.id);
            if (!brand)
                return res.status(404).send({ message: "Brand not found" });

            const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
            if (!deletedBrand)
                return res
                    .status(500)
                    .send({ message: "Failed to delete the brand " });
            return res.send(deletedBrand);
        } catch (e) {
            return res.status(500).send(e);
        }
    }
}

export default new BrandController();
