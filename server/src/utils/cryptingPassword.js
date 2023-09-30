"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptPassword = exports.encryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = Math.round(Math.random() * (10 - 2) + 2);
    const result = yield bcrypt_1.default.genSalt(saltRounds).then((salt) => {
        return bcrypt_1.default.hash(password, salt);
    });
    return saltRounds + "-" + result;
});
exports.encryptPassword = encryptPassword;
const decryptPassword = (password, hash) => {
    const [saltRounds, pass] = hash.split("-");
    const result = bcrypt_1.default.compare(password, pass).then((res) => {
        return res; // return true
    });
    return result;
};
exports.decryptPassword = decryptPassword;