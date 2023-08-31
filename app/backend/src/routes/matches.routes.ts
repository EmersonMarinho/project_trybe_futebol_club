import { Router } from 'express';

import MatchController from '../controller/MatchesController';

const router = Router();

router.get('/', MatchController.getAllMatches);

export default router;
