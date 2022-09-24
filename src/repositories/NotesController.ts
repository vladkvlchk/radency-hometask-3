import { Request, Response } from "express";
import { validationResult } from 'express-validator'

import NoteService from "../services/NoteService";
import { Form, JSONMessage, Note, Stat } from '../helpers/types'
import { sumOfCategory } from '../helpers/functions'

class NotesController{
    static postNote(req : Request<{},{},{name:string, category:string, content:string}>, res : Response<JSONMessage>){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message: 'Bad Request'});
            }

            const note : any = {
                id: 0,
                name: req.body.name,
                created: '',
                category: req.body.category,
                content: req.body.content,
                dates: []
            };
            note.id = Math.floor(Math.random() * 1000000);
            const date = new Date();
            note.created = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
            note.dates = [];
            
            for(let i = 0; i < note.content.length; i++){// looking for dates
                const match = note.content.slice(i).match(/([0-3]?[0-9][/.][0-3]?[0-9][/.][1-9][0-9][0-9][0-9])/);
                
                if(match){
                    note.dates.push(match[0]);
                    i += match.index + 7;
                } else { break }
            }
            
            NoteService.addNote(note);
            
            res.status(201).json({message: "Created"});
        } catch(error) {
            console.log(error);
            res.status(400).json({message: "Error"});
        }
    }
    static getAllNotes(req: Request, res : Response<Note[] | JSONMessage>){
        res.status(200).json(NoteService.getAll());
    }
    static getOneById(req: Request<{id:string}>, res : Response<Note | JSONMessage>){
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({message : 'Bad Request'})

        const note = NoteService.getById(+req.params.id);
        if(!note) return res.status(404).json({message: "Not found"});

        return res.status(200).json(note);
    }
    static getStats(req: Request, res : Response<Stat[]>) {
        let stats: Stat[] = [];
              
        stats.push(sumOfCategory("Task"));
        stats.push(sumOfCategory("Random Thought"));
        stats.push(sumOfCategory("Idea"));
        stats.push(sumOfCategory("Quote"));
        
        stats = stats.filter((obj : Stat) => obj.active || obj.archived)
        res.status(200).json(stats);
    }
    static editNote(req: Request<{id:string},{},Form>, res : Response<JSONMessage>) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({message: 'Bad Request'});

        const note : Note = {
            id: +req.params.id,
            name: req.body.name,
            created: '',
            category: req.body.category,
            content: req.body.content,
            dates: []
        }

        for(let i = 0; i < note.content.length; i++){// looking for dates
            const match = note.content.slice(i).match(/([0-3]?[0-9][/.][0-3]?[0-9][/.][1-9][0-9][0-9][0-9])/);
        
            if(match){
                note.dates.push(match[0]);
                i += (match.index || 1) + 7;
            } else { break }
        }

        return NoteService.updateOne(note) ?
            res.status(204).json({message : 'No content'}) :
            res.status(404).json({message : 'Not found'})
    }
    static deleteById(req: Request<{id:string}>, res : Response<JSONMessage>) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({message: 'Bad Request'})

        return NoteService.removeById(+req.params.id) ?
            res.status(204).json({message: 'No content'}) :
            res.status(404).json({message: 'Not Found'})
    }
}

export default NotesController