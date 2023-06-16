// import Request
import { apiUrl } from "@/constant";

export const loginAction = async (request: FormData, method: string) => {
  const username = request.get("username");
  const password = request.get("password");

  console.log(username, password);
  const body = JSON.stringify({
    username,
    password,
  });

  const response = await fetch(apiUrl + "/api/XD", { method, body });
  if (response.ok) {
    const body = await response.json();
    console.log(body);
  } else {
    console.log("response error");
  }
};
