"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NotesController_1 = __importDefault(require("../repositories/NotesController"));
const validations_1 = require("../validations");
let router = express_1.default.Router();
router
    .route('/')
    .post(validations_1.formValidation, NotesController_1.default.postNote) //create new note
    .get(NotesController_1.default.getAllNotes); //get all notes
router
    .route('/stats')
    .get(NotesController_1.default.getStats); //get statistic
router
    .route('/:id')
    .get(validations_1.idValidation, NotesController_1.default.getOneById) //get note
    .patch(validations_1.idValidation, validations_1.formValidation, NotesController_1.default.editNote) //edit note
    .delete(validations_1.idValidation, NotesController_1.default.deleteById); //delete note
exports.default = router;
