import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { ValidRoutes } from "./shared/ValidRoutes";
import { stats} from "./shared/APIProgramData"; // 👈 import mock data
// import { programDetails } from "./shared/APIProgramData";
import { connectMongo } from "./connectMongo";
import { ProgramProvider } from './ProgramProvider';
import { HistoryProvider } from './HistoryProvider';
import { registerHistoryRoutes } from "./routes/historyRoutes";
import { registerProgramRoutes } from "./routes/programRoutes";
import { registerAuthRoutes } from "./routes/authRoutes";
import { CredentialsProvider } from "./CredentialsProvider"
import { verifyAuthToken } from "./verifyAuthToken";
import { registerDashboardRoutes } from "./routes/dashBoardRoutes";








dotenv.config(); // Read the .env file in the current working directory, and load values into process.env.
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public"

async function start(){

const mongoClient = connectMongo();
  try {
    await mongoClient.connect();
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Mongo connection failed:", err);
    process.exit(1);
  }
const app = express();

const credsProv = new CredentialsProvider(mongoClient);
registerAuthRoutes(app, credsProv);
const historyProvider = new HistoryProvider(mongoClient);
const programProvider = new ProgramProvider(mongoClient);

const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("Missing JWT_SECRET in environment");
  }
  app.locals.JWT_SECRET = jwtSecret;

app.use(express.static(STATIC_DIR));


app.get("/api/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});
const staticPath = path.resolve(__dirname, "..", STATIC_DIR);

app.get(Object.values(ValidRoutes), (req: Request, res: Response) => {
    res.sendFile("index.html", { root: staticPath });

})

registerDashboardRoutes(app, programProvider, historyProvider,stats);


app.use("/api/*", verifyAuthToken);



  registerHistoryRoutes(app, historyProvider); 




    registerProgramRoutes(app, programProvider);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
}
start().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});