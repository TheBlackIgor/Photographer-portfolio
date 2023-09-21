import { Router } from "express";
import { createTransport } from "nodemailer";

export const contactRoutes = Router();

contactRoutes.post("/send-email", async (req, res) => {
  try {
    // Create a Nodemailer transporter
    const transporter = createTransport({
      service: "Gmail", // Use the email service you prefer
      auth: {
        user: "assystenreussa@gmail.com", // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password or an App Password
      },
    });

    // Define the email message
    const mailOptions = {
      from: "assystenreussa@gmail.com", // Sender's email address
      to: "igor04sw@gmail.com", // Recipient's email address
      subject: "Mail ze stronki",
      text: "Test",
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email: ", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the email" });
  }
});
