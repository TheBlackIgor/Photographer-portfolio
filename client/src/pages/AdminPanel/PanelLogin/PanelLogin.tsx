import "./PanelLogin.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginAction } from "@/api";
import { Button, Loader, TextInput } from "@/components";

export const PanelLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    form.append("username", username);
    form.append("password", password);

    if (await loginAction(form, "POST")) {
      navigate("/czadowyPanel");
    } else {
      setMessage("invalid data");
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <form
          method={"POST"}
          action="/czadowyPanel/login"
          className="panel-login-form"
          onSubmit={e => handleSubmit(e)}
        >
          <TextInput
            label="Username"
            name="username"
            value={username}
            setValue={setUsername}
            required={true}
          />
          <TextInput
            label="Password"
            name="password"
            type="password"
            value={password}
            setValue={setPassword}
            required={true}
          />
          <Button type="submit">Log in</Button>
          <div className="panel-login-message">{message}</div>
        </form>
      )}
    </>
  );
};
