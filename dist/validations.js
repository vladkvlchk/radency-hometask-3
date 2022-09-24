"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idValidation = exports.formValidation = void 0;
const express_validator_1 = require("express-validator");
exports.formValidation = [
    (0, express_validator_1.body)('name', 'Empty name!').isLength({ min: 5 }),
    (0, express_validator_1.body)('category', 'Invalid category!').isIn(["Task", "Random Thought", "Idea", "Quote"]),
    (0, express_validator_1.body)('content', 'Empty task!').isLength({ min: 5 })
];
exports.idValidation = [
    (0, express_validator_1.param)('id', 'Incorrect id').isInt()
];
