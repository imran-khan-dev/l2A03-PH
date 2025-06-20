import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

import app from "./app";
import connectDB from "./app/config/db";

const port = process.env.PORT || 5000;

const run = async () => {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

run();
