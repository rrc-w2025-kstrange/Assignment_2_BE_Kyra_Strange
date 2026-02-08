import { Request, Response } from "express";
import { getAllTicketsService, getTicketByIdService, getTicketUrgencyService, createTicketService, updateTicketService, deleteTicketService } from "../services/ticketService";

export const getAllTickets = (req: Request, res: Response) => {
    let result = getAllTicketsService()
    res.status(200).json(result);
};

export const getTicketById = (req: Request, res: Response) => {
    let result = getTicketByIdService()
    res.status(200).json(result);
};

export const getTicketUrgency = (req: Request, res: Response) => {
    let result = getTicketUrgencyService()
    res.status(200).json(result);
};

export const createTicket = (req: Request, res: Response) => {
    let result = createTicketService("test")
    res.status(200).json(result);
};

export const updateTicket = (req: Request, res: Response) => {
    let result = updateTicketService(21, "test")
    res.status(200).json(result);
};

export const deleteTicket = (req: Request, res: Response) => {
    let result = deleteTicketService(12)
    res.status(200).json(result);
};