import {Router} from 'express';
import { getDefault } from '../controllers/DefaultController';

const router = Router();

router.get('/', getDefault);

export default router;