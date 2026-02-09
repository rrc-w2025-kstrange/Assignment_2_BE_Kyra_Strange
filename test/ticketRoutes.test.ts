import request from "supertest";
import app from "../src/app";
import { tickets } from "../src/data/ticketData";

describe("Ticket API routes", () => {
    it("returns all tickets", async () => {
        // Act
        const res = await request(app).get("/api/v1/tickets");
        // Assert
        expect(res.status).toBe(200);
        expect(res.body.count).toBe(tickets.length);
    });

    it("return a ticket by ID", async () => {
        // Arrange
        const ticketId = 1;
        // Act
        const res = await request(app).get(`/api/v1/tickets/${ticketId}`);
        // Assert
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(ticketId);
    });

    it("returns 404 if ticket not found", async () => {
        // Arrange
        const invalidId = 999;
        // Act
        const res = await request(app).get(`/api/v1/tickets/${invalidId}`);
        // Assert
        expect(res.status).toBe(404);
    });

    it("returns urgency info for a ticket", async () => {
        // Arrange
        const ticketId = 1;
        // Act
        const res = await request(app).get(`/api/v1/tickets/${ticketId}/urgency`);
        // Assert
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("urgencyScore");
    });

    it("creates a new ticket", async () => {
        // Arrange
        const newTicket = { title: "New test", description: "Testing POST", priority: "medium" };
        // Act
        const res = await request(app).post("/api/v1/tickets").send(newTicket);
        // Assert
        expect(res.status).toBe(201);
        expect(res.body.title).toBe(newTicket.title);
    });

    it("returns 400 if required fields are missing", async () => {
        // Arrange
        const incompleteTicket = { description: "Missing title", priority: "medium" };
        // Act
        const res = await request(app).post("/api/v1/tickets").send(incompleteTicket);
        // Assert
        expect(res.status).toBe(400);
    });

    it("updates a ticket's status", async () => {
        // Arrange
        const update = { status: "in-progress" };
        // Act
        const res = await request(app).put("/api/v1/tickets/2").send(update);
        // Assert
        expect(res.status).toBe(200);
        expect(res.body.status).toBe(update.status);
    });

    it("returns 400 for invalid status update", async () => {
        // Arrange
        const update = { status: "invalid" };
        // Act
        const res = await request(app).put("/api/v1/tickets/2").send(update);
        // Assert
        expect(res.status).toBe(400);
    });

    it("deletes a ticket", async () => {
        // Arrange
        const idToDelete = 3;
        // Act
        const res = await request(app).delete(`/api/v1/tickets/${idToDelete}`);
        // Assert
        expect(res.status).toBe(200);
    });

    it("returns 404 when deleting a non-existent ticket", async () => {
        // Arrange
        const invalidId = 999;
        // Act
        const res = await request(app).delete(`/api/v1/tickets/${invalidId}`);
        // Assert
        expect(res.status).toBe(404);
    });
});
