import { body, param } from 'express-validator';

export const formValidation = [
    body('name', 'Empty name!').isLength({min: 5}),
    body('category', 'Invalid category!').isIn(["Task", "Random Thought", "Idea", "Quote"]),
    body('content', 'Empty task!').isLength({min: 5})
];

export const idValidation = [
    param('id', 'Incorrect id').isInt()
]
