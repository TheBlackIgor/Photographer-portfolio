import "./PanelLogin.scss";

import { useState } from "react";
import { Form } from "react-router-dom";

import { Button } from "@/components";

import { loginAction } from "./LoginAction";

export const PanelLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();
    form.append("username", username);
    form.append("password", password);

    loginAction(form, "POST");
  };

  return (
    <form
      method={"POST"}
      action="/czadowyPanel/login"
      className="panel-login-form"
      onSubmit={e => handleSubmit(e)}
    >
      <div className="panel-login-input-group">
        <label htmlFor="username" className="panel-login-label">
          Username
        </label>
        <input
          required
          autoComplete="off"
          name="username"
          id="username"
          className="panel-login-input"
          value={username}
          type="text"
          onChange={e => setUsername(e.target.value)}
        />
      </div>
      <div className="panel-login-input-group">
        <label htmlFor="username" className="panel-login-label">
          Password
        </label>
        <input
          required
          autoComplete="off"
          name="username"
          id="username"
          className="panel-login-input"
          value={password}
          type="password"
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <Button type="submit">Log in</Button>
    </form>
  );
};
