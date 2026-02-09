import express, { Request, Response, Express } from "express";
import ticketRoutes from "./api/v1/routes/ticketRoutes";
import morgan from "morgan";

const app: Express = express();

app.use(express.json());

// Use Morgan for HTTP request logging
app.use(morgan("combined"));

app.use("/api/v1/tickets", ticketRoutes);

app.get("/api/v1/health", (req, res) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    });
});

export default app;