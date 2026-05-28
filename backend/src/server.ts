import express from "express";
import cors from "cors";
import { campaignRoutes } from "./routes/campaign.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/campaigns", campaignRoutes);

app.listen(3000, () => {
  console.log("API running on 3000");
});
