import { Router } from "express";
import { createTransport } from "nodemailer";

export const contactRoutes = Router();

contactRoutes.post("/api/contact", async (req, res) => {
  const body = req.body.body;
  console.log(body);
  const auth = {
    user: "asystentreussa@gmail.com", // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or an App Password
  };
  console.log(auth);
  try {
    // Create a Nodemailer transporter
    const transporter = createTransport({
      service: "Gmail", // Use the email service you prefer
      auth,
    });

    // Send the email
    await transporter.sendMail({
      from: "asystentreussa@gmail.com", // Sender's email address
      to: "michal.reuss15@gmail.com", // Recipient's email address
      subject: "Nowa wiadomość od " + body.email,
      text: body.content,
    });

    await transporter.sendMail({
      from: "asystentreussa@gmail.com", // Sender's email address
      to: body.email, // Recipient's email address
      subject: "Reussgraphy reply",
      text: "Dziękuje pięknie kontakt, skontakuję się tak szybko jak to możliwe",
    });

    res.end(
      JSON.stringify({
        message: "Wiadomość została wysłana📸",
      })
    );
  } catch (error) {
    console.error("Error sending email: ", error);
    res.end(
      JSON.stringify({
        message: "Ajaj, nie udało się wysłać maila, spróbuj jeszcze raz",
      })
    );
  }
});
