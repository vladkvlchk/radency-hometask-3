export interface Note {
    id: number,
    name: string,
    created: string,
    category: "Task" | "Random Thought" | "Idea" | "Quote",
    content: string,
    dates: string[]
}

export type Stat = {
    category: "Task" | "Random Thought" | "Idea" | "Quote",
    active: number,
    archived: number
}

export type Form = {
    name: string,
    category: "Task" | "Random Thought" | "Idea" | "Quote",
    content: string,
}

export type FormAndId = {
    id: number,
    name: string,
    category: "Task" | "Random Thought" | "Idea" | "Quote",
    content: string,
}

export type JSONMessage = {
    message : string
}