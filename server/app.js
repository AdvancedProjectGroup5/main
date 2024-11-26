import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './api-doc/swaggerConfig.js';
import cookieParser from 'cookie-parser';
import errorHandler from './middlewares/errorHandler.js';
import responseHelpers from './middlewares/responseHelpers.js';
import userRouter from './routes/UserRouter.js';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.status(200).json({result: "Success"})
})

app.use(responseHelpers);

app.use('/auth', userRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
})