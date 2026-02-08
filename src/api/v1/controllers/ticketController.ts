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