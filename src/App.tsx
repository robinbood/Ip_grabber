import React, { useState, type CSSProperties } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [notification, setNotification] = useState<string>("");
  const [hello, setHello] = useState<string>("");
  const [masla, setMasla] = useState<CSSProperties>(); 

  const reset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotification(`Have a great day ${username}`);
    setPassword("");
    setUsername("");
  };
  const Login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username === "" || password === "") {
      const style = {
        border: "2px solid red"
      }
      setMasla(style);
      return;
    }
    try {
      const locationData = await axios.get("http://ip-api.com/json/").then(response => response.data());
      const greetingData = await axios.get(`https://hellosalut.stefanbohacek.dev/?lang=${locationData.country}`).then(response => response.data());
      setHello(greetingData.data.hello);
      setNotification(`${hello} ${username}, you have successfully logged in!`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      setNotification("Error occurred while logging in");
    }
  };
  return (
    <>
      <h1>{notification}</h1>
      <div>
        <form onSubmit={Login}>
          <input
            type="text"
            placeholder="Enter your name"
            onChange={({ target }) => setUsername(target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your passsowrd"
            onChange={({ target }) => setPassword(target.value)}
            required
          />
          <button type="submit" style={masla}>Login</button>
          <button type="reset" onChange={() => reset}>
            Logout
          </button>
        </form>
      </div>
    </>
  );
};

export default App;
