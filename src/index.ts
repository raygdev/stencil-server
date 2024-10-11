import { app } from "./app";
import { connectToDB } from "./sequelize.config";

connectToDB(app)
  .catch(e => console.log(e))