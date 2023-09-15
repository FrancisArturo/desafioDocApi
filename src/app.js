import  express  from "express";
import displayRoutes from "express-routemap";
import productsRoutes from "./routes/products.routes.js";
import loggerTestRoutes from "./routes/loggerTest.routes.js";
import { ErrorHandler } from "./middlewares/errors/index.js";
import { setLogger } from "./utils/logger.js";

const app = express();

const PORT = 8000; 

app.use(ErrorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(setLogger);


app.use("/products/", productsRoutes);
app.use("/logger/", loggerTestRoutes);

app.listen(PORT, () => {
    displayRoutes(app);
    console.log(`Listening on port ${PORT}, ENVIROMENT: ${process.env.NODE_ENV}
    `);
});

