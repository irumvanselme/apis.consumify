import mongoose from "mongoose";

import { config } from "dotenv";
config();

const connectToDb = async () => {
    try {
        mongoose.connect(
            process.env.DB_URL,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true,
            },
            () => {}
        );
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

connectToDb().then();
