"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NoteService {
    static getAll() {
        return items;
    }
    static getById(id) {
        return items.find((obj) => obj.id === id);
    }
    static addNote(note) {
        items.push(note);
    }
    static editOne(note) {
        const oldNote = items.find((obj) => obj.id === note.id);
        if (!oldNote)
            return false;
        items = items.filter((obj) => obj.id !== oldNote.id);
        const dates = [];
        for (let i = 0; i < note.content.length; i++) { // looking for dates
            const match = note.content.slice(i).match(/([0-3]?[0-9][/.][0-3]?[0-9][/.][1-9][0-9][0-9][0-9])/);
            if (match) {
                dates.push(match[0]);
                i += (match.index || 1) + 7;
            }
            else {
                break;
            }
        }
        items.push({
            id: oldNote.id,
            name: note.name,
            created: oldNote.created,
            category: note.category,
            content: note.content,
            dates: dates
        });
        return true;
    }
    static removeById(id) {
        items = items.filter((obj) => obj.id !== id);
    }
    static moveToArchiveById(id) {
        const note = items.find((obj) => obj.id === id);
        if (!note)
            return false;
        items = items.filter((obj) => obj.id !== note.id);
        archive.push(note);
        return true;
    }
    static moveFromArchiveById(id) {
        const note = archive.find((obj) => obj.id === id);
        if (!note)
            return false;
        archive = archive.filter((obj) => obj.id !== note.id);
        items.push(note);
        return true;
    }
}
let items = [
    {
        id: 1,
        name: 'Shopping list',
        created: '20/7/2021',
        category: "Task",
        content: 'Tomatoes, bread',
        dates: []
    },
    {
        id: 2,
        name: 'The Theory of Evolution',
        created: '27/7/2021',
        category: "Random Thought",
        content: 'The Theory of Evolution is one of the best-substantiated theories in the history of science',
        dates: []
    },
    {
        id: 3,
        name: 'New Feature',
        created: '5/4/2021',
        category: "Idea",
        content: 'Implement new features on POS terminals',
        dates: []
    },
    {
        id: 4,
        name: 'William Gaddis',
        created: '7/4/2021',
        category: "Quote",
        content: "Power doesn't come to those who were born strongest, or fastest, or smartest. No. It comes to those who will do anything to achieve it",
        dates: []
    },
    {
        id: 5,
        name: 'Books',
        created: '15/4/2021',
        category: "Task",
        content: "The Lean Startup",
        dates: []
    },
    {
        id: 6,
        name: 'Dentist',
        created: '3/5/2021',
        category: "Task",
        content: "I'm gonna have a dentist appointment on the 3/5/2021, I moved it from 7/8/2022",
        dates: ['3/5/2021', '7/8/2022']
    },
    {
        id: 7,
        name: 'Motivation',
        created: '31/5/2022',
        category: "Quote",
        content: "The World belongs to those who show up",
        dates: []
    }
];
let archive = [
    {
        id: 52348,
        name: 'George C. Marshall',
        created: '30/7/2022',
        category: 'Quote',
        content: "Don't look back. Look forward to your next objective",
        dates: []
    }
];
exports.default = NoteService;
