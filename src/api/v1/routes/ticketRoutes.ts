import { Router } from 'express';
import { getAllTickets, getTicketById, getTicketUrgency, createTicket, updateTicket, deleteTicket } from '../controllers/ticketController';

const ticketsRouter = Router();

ticketsRouter.get('/tickets', getAllTickets);
ticketsRouter.get('/tickets/:id', getTicketById);
ticketsRouter.get('/tickets/:id/urgency', getTicketUrgency);
ticketsRouter.post('/tickets', createTicket);
ticketsRouter.put('/tickets/:id', updateTicket);
ticketsRouter.delete('/tickets/:id', deleteTicket);


export default ticketsRouter;
