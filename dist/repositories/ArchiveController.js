"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const NoteService_1 = __importDefault(require("../services/NoteService"));
class ArchiveController {
    static getAllArchive(req, res) {
        return res.status(200).json(NoteService_1.default.getAllArchive());
    }
    static moveToArchive(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ message: 'bad request' });
        const note = NoteService_1.default.getById(+req.params.id);
        if (!note)
            return res.status(404).json({ message: "Not found" });
        NoteService_1.default.removeById(+req.params.id);
        NoteService_1.default.addToArchive(note);
        return res.status(204).json({ message: 'No content' });
    }
    static moveFromArchive(req, res) {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty())
            return res.status(400).json({ message: 'bad request' });
        const note = NoteService_1.default.getArchivedById(+req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Not found' });
        NoteService_1.default.removeFromArchiveById(note.id);
        NoteService_1.default.addNote(note);
        return res.status(204).json({ message: 'No Content' });
    }
}
exports.default = ArchiveController;
