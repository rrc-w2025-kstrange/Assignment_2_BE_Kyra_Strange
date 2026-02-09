import { tickets } from "../../../data/ticketData"

/**
 * Represents a ticket object
 */
export interface Ticket{
    id: number,
    title: string,
    description: string,
    priority: "low" | "medium" | "high" | "critical",
    status: "open" | "in-progress" | "resolved",
    createdAt: Date
}

/**
 * Base scores used to calculate ticket urgency based on priority
 */
const baseScore = {
    critical: 50,
    high: 30,
    medium: 20,
    low: 10,
};

/**
 * Returns all tickets in the system
 * @returns An object containing a message, count of tickets, and the tickets array
 */
export const getAllTicketsService = (): {} => {
    return {message: "Tickets retrieved", count: tickets.length, data: tickets};
};

/**
 * Returns a ticket by its Id
 * @param id - The Id of the ticket to retrieve
 * @returns The ticket object if found, otherwise undefined
 */
export const getTicketByIdService = (id: number): Ticket | undefined => {
    let ticket = tickets.find(x => x.id == id)
    return ticket;
};

/**
 * Calculates the urgency of a ticket
 * @param ticket - The ticket to calculate urgency for
 * @returns An object containing the ticket data, ticket age, urgency score, and urgency level
 */
export const getTicketUrgencyService = (ticket: Ticket) => {
    let message = "Ticket urgency calculated"
    const baseData = {
        id: ticket.id,
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        createdAt: ticket.createdAt
    };

    const now = new Date();
    const ticketAge = Math.floor((now.getTime() - ticket.createdAt.getTime()) / (1000 * 60 * 60 * 24));
    const base = baseScore[ticket.priority];
    const urgencyScore = base + ticketAge * 5;

    let urgencyLevel = "Low urgency. Address when capacity allows.";
    if (urgencyScore >= 80) urgencyLevel = "Critical. Immediate attention required. ";
    else if (urgencyScore >= 55) urgencyLevel = "High urgency. Prioritize resolution.";
    else if (urgencyScore >= 30) urgencyLevel = "Moderate. Schedule for attention.";
    
    if (ticket.status === "resolved") {
        return {
            message,
            data: {
                ...baseData,
                ticketAge,
                urgencyScore: 0,
                urgencyLevel: "Minimal. Ticket resolved."
            }
        };
    }

    return { 
        message, 
        data: {
            ...baseData,
            ticketAge,
            urgencyScore,
            urgencyLevel
        }
    };
}

/**
 * Creates a new ticket and adds it to the tickets array
 * @param data - Object containing title, description, and priority
 * @returns The newly created ticket object
 */
export const createTicketService = (data: Pick<Ticket, "title" | "description" | "priority">): Ticket => { 
    const newTicket: Ticket = {
        id: tickets.length + 1,
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: "open",
        createdAt: new Date(),
    };

    tickets.push(newTicket);
    return newTicket;
};

/**
 * Updates an existing ticket's priority and/or status
 * @param id - The Id of the ticket to update
 * @param updateData - Object containing the new priority and/or status
 * @returns The updated ticket object if found, otherwise undefined
 */
export const updateTicketService = (id: number, updateData: { priority?: string; status?: string }): Ticket | undefined => {
    let ticket = tickets.find(x => x.id == id)
    if (!ticket) return undefined;

    if (updateData.priority) {
        ticket.priority = updateData.priority as "low" | "medium" | "high" | "critical";
    }

    if (updateData.status) {
        ticket.status = updateData.status as "open" | "in-progress" | "resolved";
    }

    return ticket;
};

/**
 * Deletes a ticket by Id
 * @param id - The Id of the ticket to delete
 */
export const deleteTicketService = (id: number) => {
    let ticketToDeleteIndex = tickets.findIndex(x=>x.id === id);

    if (ticketToDeleteIndex !== -1) 
    tickets.splice(ticketToDeleteIndex, 1);
    return;
};
