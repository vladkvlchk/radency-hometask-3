import { Request, Response } from "express";
import { validationResult } from 'express-validator'

import NoteService from "../services/NoteService";
import { JSONMessage, Note } from "../helpers/types";


class ArchiveController {
    static getAllArchive(req: Request, res: Response<Note[]>){
        return res.status(200).json(NoteService.getAllArchive())
    }
    static moveToArchive(req: Request<{id: string}>, res: Response<JSONMessage>){
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({message: 'bad request'});
        
        const note = NoteService.getById(+req.params.id);
        if (!note) return res.status(404).json({message : "Not found"})

        NoteService.removeById(+req.params.id);
        NoteService.addToArchive(note);
        return res.status(204).json({message: 'No content'})
    }
    static moveFromArchive(req: Request<{id: string}>, res: Response<JSONMessage>){
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({message: 'bad request'});

        const note = NoteService.getArchivedById(+req.params.id);
        if(!note) return res.status(404).json({message: 'Not found'});

        NoteService.removeFromArchiveById(note.id);
        NoteService.addNote(note);
        return res.status(204).json({message: 'No Content'})
    }
}

export default ArchiveController