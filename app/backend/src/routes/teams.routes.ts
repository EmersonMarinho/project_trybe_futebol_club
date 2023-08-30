import { Router } from 'express';

import TeamController from '../controller/TeamController';

const router = Router();

router.get('/', TeamController.getAllTeams);
router.get('/:id', TeamController.getTeamsById);

export default router;
