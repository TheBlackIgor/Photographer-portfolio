import "./Contact.scss";

import { useState } from "react";

import { sendEmail } from "@/api";
import { Button } from "@/components";

export const Contact = () => {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(await sendEmail({ email, content }));
    setTimeout(() => setMessage(""), 8000);
  };

  return (
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
        <Button type="submit">Wyślij</Button>
      </form>
      <p>{message}</p>
    </div>
  );
};
