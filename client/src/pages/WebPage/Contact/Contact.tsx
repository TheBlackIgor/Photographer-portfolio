/* eslint-disable jsx-a11y/alt-text */
import "./Contact.scss";

import { useState } from "react";

import { sendEmail } from "@/api";
import { Button } from "@/components";

export const Contact = () => {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [disableForm, setDisableForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setMessage("Wysyłanie...");
    setDisableForm(true);
    e.preventDefault();
    setMessage(await sendEmail({ email, content }));
    setTimeout(() => setMessage(""), 8000);
    setDisableForm(false);
  };

  return (
    <>
      <div className="flex-center contact-main">
        <form className="form" onSubmit={e => handleSubmit(e)}>
          <h2 className="title">Zapraszam do kontaktu🥰</h2>
          <input
            value={email}
            type="text"
            placeholder="Email"
            className="input"
            onChange={e => setEmail(e.target.value)}
          />
          <textarea
            value={content}
            placeholder="Your message"
            onChange={e => setContent(e.target.value)}
          />
          <Button disabled={disableForm} type="submit">
            Wyślij
          </Button>
        </form>
        <h4>{message}</h4>
      </div>
      <div className="contact-ig">
        Zapraszam do kontaktu przez mojego instagrama{" "}
        <span style={{ fontSize: "1.5em" }}>👉</span>
        <a
          href="https://www.instagram.com/reussgraphy/"
          className="custom-button"
          target="_blank"
          rel="noreferrer"
        >
          <img src="/instagramLogo.png" alt="Instagram" />
        </a>
      </div>
    </>
  );
};
