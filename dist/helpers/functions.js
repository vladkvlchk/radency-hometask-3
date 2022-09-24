"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumOfCategory = void 0;
const NoteService_1 = __importDefault(require("../services/NoteService"));
function sumOfCategory(category) {
    const items = NoteService_1.default.getAll();
    const archive = NoteService_1.default.getAllArchive();
    const active = items.reduce((count, current) => {
        return current.category === category ? count + 1 : count;
    }, 0);
    const archived = archive.reduce((count, current) => {
        return current.category === category ? count + 1 : count;
    }, 0);
    return { category, active, archived };
}
exports.sumOfCategory = sumOfCategory;
