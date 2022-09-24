"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ArchiveController_1 = __importDefault(require("../repositories/ArchiveController"));
const validations_1 = require("../validations");
const router = express_1.default.Router();
router
    .route('/:id')
    .post(validations_1.idValidation, ArchiveController_1.default.moveFromArchive);
exports.default = router;
