import { Router } from 'express';
import { getAllTickets, getTicketById, getTicketUrgency, createTicket, updateTicket, deleteTicket } from '../controllers/ticketController';

const ticketsRouter = Router();

ticketsRouter.get('/', getAllTickets);
ticketsRouter.get('/:id', getTicketById);
ticketsRouter.get('/:id/urgency', getTicketUrgency);
ticketsRouter.post('/', createTicket);
ticketsRouter.put('/:id', updateTicket);
ticketsRouter.delete('/:id', deleteTicket);


export default ticketsRouter;
