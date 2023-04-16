import { Global } from "./Global";

export const GetProfile = async (userId, setState) => {
  const request = await fetch(Global.url + "user/profile/" + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem("token")
    }
  });
  const data = await request.json();
  if(data.status === "success"){
    setState(data.user)
  }
  return data;
}

export const saveUser = async (newUser) => {
  const request = await fetch(Global.url + "user/register", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-type": "application/json"
    }
  });
  const data = await request.json();
  return data;
}
