import { Request, Response } from "express";
import { getAllTicketsService, getTicketByIdService, getTicketUrgencyService, createTicketService, updateTicketService, deleteTicketService, Ticket } from "../services/ticketService";
import { error } from "console";

export const getAllTickets = (req: Request, res: Response) => {
    let result = getAllTicketsService()
    res.status(200).json(result);
};

export const getTicketById = (req: Request, res: Response) => {
    let id = Number(req.params.id)

    if (Number.isNaN(id)){
        res.status(404).json({error})
    }

    let result = getTicketByIdService(id)
    res.status(200).json(result);
};

export const getTicketUrgency = (req: Request, res: Response) => {
    let id = Number(req.params.id)

    if (Number.isNaN(id)){
        res.status(404).json({error})
    }
    
    const ticket = getTicketByIdService(id);

    if (!ticket) {
        return res.status(404).json({ error: "Ticket not found" });
    }

    let result = getTicketUrgencyService(ticket);
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