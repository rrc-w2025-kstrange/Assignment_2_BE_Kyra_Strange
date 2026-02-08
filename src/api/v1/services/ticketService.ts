export const getAllTicketsService = (): string[] => {
    // Logic to process all items from the database
    return ["Item 1", "Item 2"];
};

export const getTicketByIdService = (): string[] => {
    // Logic to process all items from the database
    return ["Item 1", "Item 2"];
};

export const getTicketUrgencyService = (): string[] => {
    // Logic to process all items from the database
    return ["Item 1", "Item 2"];
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