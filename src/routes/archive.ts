import express from 'express';
import ArchiveController from '../repositories/ArchiveController';
import { idValidation } from '../validations';

const router = express.Router();

router
    .route('/')
    .get(ArchiveController.getAllArchive)

router
    .route('/:id')
    .post(idValidation, ArchiveController.moveToArchive)

export default router;
