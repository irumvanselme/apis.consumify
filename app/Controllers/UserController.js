import _ from "lodash";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Controller from "./Controller.js";
import { User, validate } from "../Models/User.js";

class UserController extends Controller {
    async get_all(req, res) {
        try {
            const users = await User.find();
            return res.send(users);
        } catch (e) {
            return res.status(500).send(e);
        }
    }

    async create(req, res) {
        const valid = validate(req.body);
        if (valid.fails(undefined))
            return res.status(400).send(valid.errors.all());

        const user = new User(
            _.pick(req.body, ["name", "username", "email", "password"])
        );
        const newUser = await user.save();

        if (!newUser)
            return res
                .status(404)
                .send({ message: "Failed to create a new user" });
        return res.send(newUser);
    }

    async login(req, res) {
        try {
            const user = await User.findOne().or([
                { email: req.body.email },
                { username: req.body.username },
            ]);

            if (
                user &&
                (await bcrypt.compareSync(req.body.password, user.password))
            ) {
                const token = await jwt.sign(
                    _.pick(user, ["_id", "name", "username", "email"]),
                    process.env.JWT_KEY
                );
                return res.send({ user, token });
            } else {
                return res
                    .status(404)
                    .send({ message: "Invalid email or password" });
            }
        } catch (e) {
            return res.send(e);
        }
    }
}

export default new UserController();
