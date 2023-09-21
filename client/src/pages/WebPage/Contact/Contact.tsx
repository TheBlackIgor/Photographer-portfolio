import { Button } from "@/components";

import "./Contact.scss";
import { FormEventHandler } from "react";

export const Contact = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div className="flex-center contact-main">
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <h2 className="title">Zapraszam do kontaktu🥰</h2>
        <input type="text" placeholder="Email" className="input" />
        <textarea placeholder="Your message" />
        <Button type="submit">Wyślij</Button>
      </form>
    </div>
  );
};
