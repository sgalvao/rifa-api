import "./config/module-alias";
import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
process.env.TZ = "UTC";

import { setupRoutes } from "@/config/routes";
import { startApolloServer } from "@/config/apollo-server";

const app = express();
app.use(express.json());
startApolloServer(app);
setupRoutes(app);

const port = process.env.PORT || 9000;

app.listen(port, () =>
  console.log(`Server running at: http://localhost:${port}`)
);
