import { Router } from 'express';
import { getAllScore, loginUser, getScoreWantToGo } from '../controllers/UserController'
import { validateToken } from './validateToken';

const router = Router();
router.get('/getScoreUser/getAll', getAllScore);
router.get('/getScoreUser/wantToGo', getScoreWantToGo);
router.post('/login', loginUser);


// Protected route example
// router.get('/protected', auth, (req, res) => {
//   res.status(200).json({ message: 'You are authorized' });
// });

export default router;