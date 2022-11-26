import express, {Application} from "express";
import morgan from "morgan";
import router from "./routes";
import bodyParser from "body-parser";

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyParser.text());

app.use(router);

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
