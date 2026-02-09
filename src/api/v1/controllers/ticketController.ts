import { Request, Response } from "express";
import { getAllTicketsService, getTicketByIdService, getTicketUrgencyService, createTicketService, updateTicketService, deleteTicketService, Ticket } from "../services/ticketService";
import { HTTP_STATUS } from "src/constants/httpConstants";


export const getAllTickets = (req: Request, res: Response) => {
    let result = getAllTicketsService()
    res.status(HTTP_STATUS.OK).json(result);
};

export const getTicketById = (req: Request, res: Response) => {
    let id = Number(req.params.id)

    if (Number.isNaN(id)){
        res.status(HTTP_STATUS.BAD_REQUEST).json({error: "id must be a number"})
        return;        
    }
    
    let result = getTicketByIdService(id)  

    if (result === undefined) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ error: "Ticket with ${id} not found" });
    }

    res.status(HTTP_STATUS.OK).json(result);
};

export const getTicketUrgency = (req: Request, res: Response) => {
    let id = Number(req.params.id)

    if (Number.isNaN(id)){
        res.status(HTTP_STATUS.BAD_REQUEST).json({error: "id must be a number"})
        return;
    }
    
    const ticket = getTicketByIdService(id);

    if (!ticket) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
        return;
    }

    let result = getTicketUrgencyService(ticket);
    res.status(HTTP_STATUS.OK).json(result);
    return;
};    


export const createTicket = (req: Request, res: Response) => {
    const { title, description, priority } = req.body;

    if (!title) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Missing required field: title"
        });
    }

    if (!description) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Missing required field: description"
        });
    }

    if (!priority || !["low", "medium", "high", "critical"].includes(priority)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid priority. Must be one of: critical, high, medium, low"
        });
    }

    const newTicket = createTicketService({ title, description, priority });

    return res.status(HTTP_STATUS.OK).json(newTicket);
};

export const updateTicket = (req: Request, res: Response) => {
    let id = Number(req.params.id);
    if (Number.isNaN(id)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "id must be a number" });
    }

    const { priority, status } = req.body;

    if (priority && !["low", "medium", "high", "critical"].includes(priority)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid priority. Must be one of: critical, high, medium, low"
        });
    }

    if (status && !["open", "in-progress", "resolved"].includes(status)) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Invalid status. Must be one of: open, in-progress, resolved"
        });
    }

    const updatedTicket = updateTicketService(id, { priority, status });

    if (!updatedTicket) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
    }

    return res.status(HTTP_STATUS.OK).json(updatedTicket);
};


export const deleteTicket = (req: Request, res: Response) => {
    let result = deleteTicketService(12)
    res.status(200).json(result);
};