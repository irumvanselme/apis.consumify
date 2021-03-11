import Controller from "./Controller.js";
import { ReviewAction } from "../Models/ReviewActions.js";
import { Review } from "../Models/Review.js";

class ReviewActionController extends Controller {
    async mark_as_helpful(req, res) {
        try {
            let review = await Review.findById(req.params.review);
            if (!review)
                return res
                    .status(404)
                    .send({ message: "Review not found ....." });

            let action = await ReviewAction.findOne({
                user: req.user,
                review: req.params.review,
                actionType: "HELPFUL",
            });

            if (action)
                return res
                    .status(400)
                    .send({ message: "Action already registered ... " });

            action = new ReviewAction({
                user: req.user,
                review: req.params.review,
                actionType: "HELPFUL",
            });
            action = await action.save();

            return res.send(action);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async masrk_as_not_helpful(req, res) {
        try {
            let review = await Review.findById(req.params.review);
            if (!review) return res.send(review);

            let action = await ReviewAction.findOne({
                user: req.user,
                review: req.params.review,
                actionType: "NOT_HELPFUL",
            });

            if (action)
                return res
                    .status(400)
                    .send({ message: "Action already registered ... " });

            action = new ReviewAction({
                user: req.user,
                review: req.params.review,
                actionType: "NOT_HELPFUL",
            });
            action = await action.save();

            return res.send(action);
        } catch (e) {
            return res.status(500).send(e);
        }
    }
}

export default new ReviewActionController();
