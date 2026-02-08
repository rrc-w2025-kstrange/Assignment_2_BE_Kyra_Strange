import { Router } from 'express';
import { getAllTickets, getTicketById } from '../controllers/ticketController';

const router = Router();

router.get('/tickets', getAllTickets);
router.get('/tickets/:id', getTicketById);
router.get('/tickets/:id/urgency', getTicketById);
router.post('/tickets', getTicketById);
router.put('/tickets/:id', getTicketById);
router.delete('/tickets/:id', getTicketById);


export default router;
