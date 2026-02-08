import { Router } from 'express';
import { getAllTickets, getTicketById, getTicketUrgency, createTicket, updateTicket, deleteTicket } from '../controllers/ticketController';

const router = Router();

router.get('/tickets', getAllTickets);
router.get('/tickets/:id', getTicketById);
router.get('/tickets/:id/urgency', getTicketUrgency);
router.post('/tickets', createTicket);
router.put('/tickets/:id', updateTicket);
router.delete('/tickets/:id', deleteTicket);


export default router;
