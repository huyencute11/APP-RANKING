import { Router } from 'express';
import { getTerms } from '../controllers/TermController';

const router = Router();
router.get('/getTerms', getTerms);
export default router;