import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './api-doc/swaggerConfig.js';
import errorHandler from './middlewares/errorHandler.js';
import moviesRoutes from "./routes/movieRoutes.js";
import showtimeRoutes from "./routes/showtimeRoutes.js"
import { PORT } from "./config/config.js";
import {fetchGenresFromTMDB} from "./services/genreService.js";

const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({result: "Success"})
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/movies', moviesRoutes);

app.use('/showtimes', showtimeRoutes);

app.use(errorHandler);

const startServer = async () => {
    try {
        // 初始化类型映射表
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