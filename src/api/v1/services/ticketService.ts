import { tickets } from "../../../data/ticketData"

export interface Ticket{
    id: number,
    title: string,
    description: string,
    priority: "low" | "medium" | "high" | "critical",
    status: "open" | "in-progress" | "resolved",
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

export const deleteTicketService = (id: number) => {
    let ticketToDeleteIndex = tickets.findIndex(x=>x.id === id);

    if (ticketToDeleteIndex !== -1) 
    tickets.splice(ticketToDeleteIndex, 1);
    return;
};
