import NoteService from '../services/NoteService'

export function sumOfCategory(category : "Task" | "Random Thought" | "Idea" | "Quote"){
    const items = NoteService.getAll();
    const archive = NoteService.getAllArchive();

    const active = items.reduce((count : number, current : any) => {
        return current.category === category ? count + 1 : count
    }, 0);
    const archived = archive.reduce((count : number, current : any) => {
        return current.category === category ? count + 1 : count
    }, 0);
            
    return {category, active, archived}
}