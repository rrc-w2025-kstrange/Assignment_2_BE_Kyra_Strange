import { tickets } from "../../../data/ticketData"

export interface Ticket{
    id: number,
    title: string,
    description: string,
    priority: "low" | "medium" | "high" | "critical",
    status: "open" | "resolved",
    createdAt: Date
}

const baseScore = {
    critical: 50,
    high: 30,
    medium: 20,
    low: 10,
};


export const getAllTicketsService = (): {} => {
    return {message: "Tickets retrieved", count: tickets.length, data: tickets};
};

export const getTicketByIdService = (id: number): Ticket | undefined => {
    let ticket = tickets.find(x => x.id == id)
    return ticket;
};

export const getTicketUrgencyService = (ticket: Ticket) => {
    let message = "Ticket urgency calculated"

    if (ticket.status === "resolved") {
        return {
            ticketAge: 0,
            urgencyScore: 0,
            urgencyLevel: "Ticket is resolved.",
        };
    }

    const now = new Date();
    const ticketAge = Math.floor((now.getTime() - ticket.createdAt.getTime()) / (1000 * 60 * 60 * 24));
    const base = baseScore[ticket.priority];
    const urgencyScore = base + ticketAge * 5;

    let urgencyLevel = "Low urgency. Monitor the ticket.";
    if (urgencyScore >= 100) urgencyLevel = "Critical urgency! Immediate action required.";
    else if (urgencyScore >= 70) urgencyLevel = "High urgency. Needs prompt attention.";
    else if (urgencyScore >= 40) urgencyLevel = "Moderate urgency. Schedule soon.";

    return { 
        message, 
        data: {...ticket, ticketAge, urgencyScore, urgencyLevel}
    };
};

export const createTicketService = (item: string): string => {
    // Logic to add a new item to the database
    return "Item added";
};

export const updateTicketService = (id: number, item: string): string => {
    // Logic to update an item in the database
    return "Item updated";
};

export const deleteTicketService = (id: number): string => {
    // Logic to delete an item from the database
    return "Item deleted";
};