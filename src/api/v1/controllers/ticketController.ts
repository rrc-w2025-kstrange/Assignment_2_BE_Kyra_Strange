import { Request, Response } from "express";

export const getAllTickets = (req: Request, res: Response) => {
    // Logic to get all items
    res.status(200).send("Get all items");
};

export const getTicketById = (req: Request, res: Response) => {
    // Logic to get all items
    res.status(200).send("Get all items");
};

export const getTicketUrgency = (req: Request, res: Response) => {
    // Logic to get all items
    res.status(200).send("Get all items");
};

export const createTicket = (req: Request, res: Response) => {
    // Logic to create a new item
    res.status(201).send("Create a new item");
};

export const updateTicket = (req: Request, res: Response) => {
    // Logic to update an item
    res.status(200).send("Update an item");
};

export const deleteTicket = (req: Request, res: Response) => {
    // Logic to delete an item
    res.status(200).send("Delete an item");
};