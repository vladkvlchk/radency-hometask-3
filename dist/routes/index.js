"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notes_1 = __importDefault(require("./notes"));
const archive_1 = __importDefault(require("./archive"));
const unarchive_1 = __importDefault(require("./unarchive"));
const router = express_1.default.Router();
router.use('/notes', notes_1.default);
router.use('/archive', archive_1.default);
router.use('/unarchive', unarchive_1.default);
exports.default = router;
