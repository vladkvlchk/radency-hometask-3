import express from 'express';
import NotesController from '../repositories/NotesController'
import { formValidation, idValidation } from '../validations';

let router = express.Router()

router
    .route('/')
    .post(formValidation, NotesController.postNote) //create new note
    .get(NotesController.getAllNotes); //get all notes

router
    .route('/stats')
    .get(NotesController.getStats); //get statistic

router
    .route('/:id')
    .get(idValidation, NotesController.getOneById) //get note
    .patch(idValidation, formValidation, NotesController.editNote)  //edit note
    .delete(idValidation, NotesController.deleteById); //delete note

export default router;