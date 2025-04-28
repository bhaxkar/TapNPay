import "dotenv/config";
import connectDB from "./utils/db.js";
import { app } from "./app.js";

const port = process.env.PORT;

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Application Error", error);
      process.exit(1);
    });
    app.listen(port, () => {
      console.log(`Application is  running on port ${port}`);
    });
  })
  .catch(() => {
    console.log("MongoDB connection failed", error);
    process.exit(1);
  });
