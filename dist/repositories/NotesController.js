"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const NoteService_1 = __importDefault(require("../services/NoteService"));
const functions_1 = require("../helpers/functions");
class NotesController {
    static postNote(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Bad Request' });
            }
            const note = {
                id: 0,
                name: req.body.name,
                created: '',
                category: req.body.category,
                content: req.body.content,
                dates: []
            };
            note.id = Math.floor(Math.random() * 1000000);
            const date = new Date();
            note.created = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            note.dates = [];
            for (let i = 0; i < note.content.length; i++) { // looking for dates
                const match = note.content.slice(i).match(/([0-3]?[0-9][/.][0-3]?[0-9][/.][1-9][0-9][0-9][0-9])/);
                if (match) {
                    note.dates.push(match[0]);
                    i += match.index + 7;
                }
                else {
                    break;
                }
            }
            NoteService_1.default.addNote(note);
            res.status(201).json({ message: "Created" });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: "Error" });
        }
    }
    static getAllNotes(req, res) {
        res.status(200).json(NoteService_1.default.getAll());
    }
    static getOneById(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ message: 'Bad Request' });
        const note = NoteService_1.default.getById(+req.params.id);
        if (!note)
            return res.status(404).json({ message: "Not found" });
        return res.status(200).json(note);
    }
    static getStats(req, res) {
        let stats = [];
        stats.push((0, functions_1.sumOfCategory)("Task"));
        stats.push((0, functions_1.sumOfCategory)("Random Thought"));
        stats.push((0, functions_1.sumOfCategory)("Idea"));
        stats.push((0, functions_1.sumOfCategory)("Quote"));
        stats = stats.filter((obj) => obj.active || obj.archived);
        res.status(200).json(stats);
    }
    static editNote(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ message: 'Bad Request' });
        const note = {
            id: +req.params.id,
            name: req.body.name,
            created: '',
            category: req.body.category,
            content: req.body.content,
            dates: []
        };
        for (let i = 0; i < note.content.length; i++) { // looking for dates
            const match = note.content.slice(i).match(/([0-3]?[0-9][/.][0-3]?[0-9][/.][1-9][0-9][0-9][0-9])/);
            if (match) {
                note.dates.push(match[0]);
                i += (match.index || 1) + 7;
            }
            else {
                break;
            }
        }
        return NoteService_1.default.updateOne(note) ?
            res.status(204).json({ message: 'No content' }) :
            res.status(404).json({ message: 'Not found' });
    }
    static deleteById(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ message: 'Bad Request' });
        return NoteService_1.default.removeById(+req.params.id) ?
            res.status(204).json({ message: 'No content' }) :
            res.status(404).json({ message: 'Not Found' });
    }
}
exports.default = NotesController;
