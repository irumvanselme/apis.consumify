import Controller from "./Controller.js";
import { Review, validate } from "../Models/Review.js";
import { Product } from "../Models/Product.js";
import { ReviewAction } from "../Models/ReviewActions.js";

class ReviewController extends Controller {
    async get_all(req, res) {
        try {
            let reviews = await Review.find();
            return res.send(reviews);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async get_one(req, res) {
        try {
            let review = await Review.findById(req.params.review);
            if (!review)
                return res
                    .status(404)
                    .send({ message: "Review not found ....." });

            const helpfullActions = await ReviewAction.find({
                review: review._id,
                actionType: "HELPFUL",
            }).count();

            const notHelpfullActions = await ReviewAction.find({
                review: review._id,
                actionType: "HELPFUL",
            }).count();

            const reviewData = {
                review,
                actions: { helpfullActions, notHelpfullActions },
            };

            return res.send(reviewData);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async create(req, res) {
        try {
            const valid = validate(req.body);
            if (valid.fails(undefined))
                return res.status(400).send(valid.errors.all());

            let product = await Product.findById(req.params.product);
            if (!product)
                return res
                    .status(404)
                    .send({ message: "Product Not found ... " });

            let review = new Review({
                product: product._id,
                user: req.user._id,
                ...req.body,
            });
            review = await review.save();

            return res.send(review);
        } catch (e) {
            return res.status(500).send(e);
        }
    }
}

export default new ReviewController();
