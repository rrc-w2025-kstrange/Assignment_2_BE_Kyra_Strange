import { getTicketUrgencyService, Ticket } from "../src/api/v1/services/ticketService";

const createTicket = (
    priority: Ticket["priority"],
    daysAgo: number,
    status: Ticket["status"] = "open"
): Ticket => {
    const now = new Date();
    return {
        id: 1,
        title: "Test ticket",
        description: "Testing urgency calculation",
        priority,
        status,
        createdAt: new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000),
    };
};

describe("getTicketUrgencyService functionality testing", () => {

    it("should calculate correct urgency for open ticket", () => {
        // Arrange
        const ticket = createTicket("high", 5);

        // Act
        const result = getTicketUrgencyService(ticket);

        // Assert
        expect(result.data.urgencyScore).toBe(30 + 5*5); 
        expect(result.data.urgencyLevel).toBe("High urgency. Prioritize resolution.");
    });

    it("should return minimal urgency for resolved ticket", () => {
        // Arrange
        const ticket = createTicket("critical", 10, "resolved");

        // Act
        const result = getTicketUrgencyService(ticket);

        // Assert
        expect(result.data.urgencyScore).toBe(0);
        expect(result.data.urgencyLevel).toBe("Minimal. Ticket resolved.");
    });

    it("should return moderate urgency for medium priority and moderate age", () => {
        // Arrange
        const ticket = createTicket("medium", 2);

        // Act
        const result = getTicketUrgencyService(ticket);

        // Assert
        expect(result.data.urgencyScore).toBe(20 + 2*5);
        expect(result.data.urgencyLevel).toBe("Moderate. Schedule for attention.");
    });

    it("should return low urgency for low priority and recent ticket", () => {
        // Arrange
        const ticket = createTicket("low", 1);

        // Act
        const result = getTicketUrgencyService(ticket);

        // Assert
        expect(result.data.urgencyScore).toBe(10 + 1*5);
        expect(result.data.urgencyLevel).toBe("Low urgency. Address when capacity allows.");
    });

});
