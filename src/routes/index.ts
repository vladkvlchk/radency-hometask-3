import express from 'express';

import notes from './notes';
import archive from './archive';
import unarchive from './unarchive';

const router = express.Router();

router.use('/notes', notes)
router.use('/archive', archive)
router.use('/unarchive', unarchive)

export default router;