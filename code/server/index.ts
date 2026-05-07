const cors = require('cors');
import express from 'express';
import initRoutes from "./src/routes"
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app: express.Application = express();

const port: number = Number(process.env.PORT) || 3001;

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));
initRoutes(app)

if (process.env.SERVE_CLIENT !== "false") {
    const clientBuildPath = process.env.CLIENT_BUILD_PATH || path.join(__dirname, "public");

    app.use(express.static(clientBuildPath));
    app.get("*", (req, res, next) => {
        if (req.path.startsWith("/ezelectronics")) {
            return next();
        }

        res.sendFile(path.join(clientBuildPath, "index.html"), (err) => {
            if (err) next(err);
        });
    });
}

if (!module.parent) {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
}

export { app }



