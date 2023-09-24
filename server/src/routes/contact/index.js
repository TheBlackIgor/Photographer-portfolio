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
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRoutes = void 0;
const express_1 = require("express");
const nodemailer_1 = require("nodemailer");
exports.contactRoutes = (0, express_1.Router)();
exports.contactRoutes.post("/api/contact", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body.body;
    console.log(body);
    const auth = {
        user: "asystentreussa@gmail.com",
        pass: process.env.EMAIL_PASSWORD, // Your email password or an App Password
    };
    console.log(auth);
    try {
        // Create a Nodemailer transporter
        const transporter = (0, nodemailer_1.createTransport)({
            service: "Gmail",
            auth,
        });
        // Send the email
        yield transporter.sendMail({
            from: "asystentreussa@gmail.com",
            to: "michal.reuss15@gmail.com",
            subject: "Nowa wiadomość od " + body.email,
            text: body.content,
        });
        yield transporter.sendMail({
            from: "asystentreussa@gmail.com",
            to: body.email,
            subject: "Reussgraphy reply",
            text: "Dziękuje pięknie za kontakt, skontakuję się tak szybko jak to możliwe",
        });
        res.end(JSON.stringify({
            message: "Wiadomość została wysłana📸",
        }));
    }
    catch (error) {
        console.error("Error sending email: ", error);
        res.end(JSON.stringify({
            message: "Ajaj, nie udało się wysłać maila, spróbuj jeszcze raz",
        }));
    }
}));
