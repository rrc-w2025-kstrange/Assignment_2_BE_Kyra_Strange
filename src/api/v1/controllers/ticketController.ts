import { Request, Response } from "express";
import { getAllTicketsService, getTicketByIdService, getTicketUrgencyService, createTicketService, updateTicketService, deleteTicketService, Ticket } from "../services/ticketService";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Retrieves all tickets from the system.
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON array of all tickets with HTTP 200
 */
export const getAllTickets = (req: Request, res: Response) => {
    let result = getAllTicketsService()
    res.status(HTTP_STATUS.OK).json(result);
};

/**
 * Retrieves a ticket by its Id.
 * @param req - Express request object, expects req.params.id
 * @param res - Express response object
 * @returns JSON object of the ticket with HTTP 200, or error if invalid Id/not found
 */
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

/**
 * Calculates and retrieves the urgency of a ticket by Id.
 * @param req - Express request object, expects req.params.id
 * @param res - Express response object
 * @returns JSON object with ticket urgency info, or error if ticket not found/invalid Id
 */
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

/**
 * Creates a new ticket with title, description, and priority.
 * @param req - Express request object, expects req.body with title, description, priority
 * @param res - Express response object
 * @returns JSON object of newly created ticket, or error if missing/invalid fields
 */
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

/**
 * Updates an existing ticket's priority and/or status by Id.
 * @param req - Express request object, expects req.params.id and req.body with priority/status
 * @param res - Express response object
 * @returns JSON object of updated ticket, or error if invalid Id, ticket not found, or invalid fields
 */
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


/**
 * Deletes a ticket by ID.
 * @param req - Express request object, expects req.params.id
 * @param res - Express response object
 * @returns JSON object with deletion result, or error if invalid ID/ticket not found
 */
export const deleteTicket = (req: Request, res: Response) => {
    let id = Number(req.params.id);    

    if (Number.isNaN(id)){
        res.status(HTTP_STATUS.BAD_REQUEST).json({error: "id must be a number"})
        return;
    }

    const ticket = getTicketByIdService(id);

    if (!ticket) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Ticket not found" });
        return;
    }    

    let result = deleteTicketService(id)
    res.status(HTTP_STATUS.OK).json(result);
};