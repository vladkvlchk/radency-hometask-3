import express from 'express';
import ArchiveController from '../repositories/ArchiveController';
import { idValidation } from '../validations';

const router = express.Router();

router
    .route('/:id')
    .post(idValidation, ArchiveController.moveFromArchive)

export default router;