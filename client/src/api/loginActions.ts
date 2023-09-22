// import Request
import { apiUrl } from "@/constant";

export const loginAction = async (request: FormData, method: string) => {
  const username = request.get("username");
  const password = request.get("password");

  const body = JSON.stringify({
    username,
    password,
  });

  const headers = { "Content-Type": "application/json" };

  const response = await fetch(apiUrl + "/api/login", {
    method,
    headers,
    body,
  });
  if (response.ok) {
    const body = await response.json();
    if (body.isSuccess) {
      localStorage.setItem("token", body.token);
      return true;
    } else return false;
  } else {
    console.log("response error");
    return false;
  }
};
