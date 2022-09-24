import { Note } from '../helpers/types'

class NoteService{
    static getAll() : Note[]{
        return items
    }
    static getById(id : number) : Note | undefined{
        return items.find((obj : Note) => obj.id === id)
    }
    static addNote(note : Note){
        items.push(note);
    }
    static updateOne(note : Note) : boolean{
        const oldNote : Note | undefined = items.find((obj: any) => obj.id === note.id);
        if(!oldNote) return false;

        items = items.filter((obj: Note) => obj.id !== oldNote.id);
    
        items.push({
            id: oldNote.id,
            name: note.name,
            created: oldNote.created,
            category: note.category,
            content: note.content,
            dates: note.dates
        })
        return true
    }
    static removeById(id : number) : boolean{
        const prevLength = items.length;
        items = items.filter((obj : Note) => obj.id !== id);

        return prevLength !== items.length
    }
    static addToArchive(note : Note) : void{
        archive.push(note);
    }
    static removeFromArchiveById(id : number){
        archive = archive.filter((obj : Note) => obj.id !== id);
    }
    static getAllArchive() : Note[]{
        return archive
    }
    static getArchivedById(id: number) : Note | undefined{
        return archive.find((obj : Note) => obj.id === id);
    }
}

let items : Note[] = [
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

let archive : Note[]  = [
    {
        id: 52348,
        name: 'George C. Marshall',
        created: '30/7/2022',
        category: 'Quote',
        content: "Don't look back. Look forward to your next objective",
        dates: []
    }
]

export default NoteService