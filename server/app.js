import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './api-doc/swaggerConfig.js';

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).json({result: "Success"})
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
})