import { Router } from 'express';

import MatchController from '../controller/MatchesController';
import verifyToken from '../middlewares/verifyToken.middleware';

const router = Router();

router.get('/', MatchController.getAllMatches);

router.patch('/:id/finish', verifyToken, MatchController.finishMatch);

export default router;
