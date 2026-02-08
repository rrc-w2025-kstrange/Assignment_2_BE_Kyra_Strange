import express, { Request, Response, Express } from "express";
import morgan from "morgan";

const app: Express = express();

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

app.get("/api/v1/items", (req: Request, res: Response) => {
    res.json({ message: "Get all items" });
});


export default app;