import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./api-doc/swaggerConfig.js";
import errorHandler from "./middlewares/errorHandler.js";
import reviewRouter from "./routes/review.js";
import moviesRoutes from "./routes/movieRoutes.js";
import showtimeRoutes from "./routes/showtimeRoutes.js";
import { fetchGenresFromTMDB } from "./services/genreService.js";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ result: "Success" });
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/reviews", reviewRouter);
app.use("/movies", moviesRoutes);
app.use("/showtimes", showtimeRoutes);

app.use(errorHandler);

const startServer = async () => {
    try {
        await fetchGenresFromTMDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
            console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error.message);
    }
};

startServer();
