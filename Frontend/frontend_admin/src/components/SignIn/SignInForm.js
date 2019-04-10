import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import decode from "jwt-decode";
import history from "../../history";

export const SignInForm = styled.div`
  width: 40%;
  height: 70%;
  background-color: hsl(210, 36%, 99%);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.14);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 8rem 16rem;
`;

export const FormHeader = styled.h1`
  font-size: 6rem;
  color: #004d66;
  margin-bottom: 1rem;
  font-weight: 100;
`;

export const FormContent = styled.form`
  display: flex;
  flex-direction: column;
  & > label {
    font-size: 1.6rem;
    color: #004d66;
    font-weight: 100;
    margin-bottom: 0.6rem;
  }
`;

export const ContentUser = styled.input`
  width: 100%;
  height: 4.2rem;
  border: 1px solid silver;
  border-radius: 8px;
  font-size: 1.6rem;
  padding: 0 1rem;
  margin-bottom: 2rem;
`;

export const ContentPassword = styled.input`
  width: 100%;
  height: 4.2rem;
  border: 1px solid silver;
  border-radius: 8px;
  font-size: 1.6rem;
  padding: 0 1rem;
`;

export const FormButton = styled.button`
  width: 100%;
  height: 4.2rem;
  border: 1px solid silver;
  border-radius: 8px;
  background: #749abe;
  color: hsl(0, 0%, 100%);
  text-transform: uppercase;
  opacity: 0.7;
  font-size: 1.6rem;
  font-weight: 100;
  cursor: pointer;
  text-align: center;
  padding: 1rem;
`;

const WrongWarning = styled.div`
  // border: 1px solid black;
  width: 100%;
  height: 3rem;
  text-align: right;
  color: red;
  margin-top: 0.4rem;
`;

const SignInFormComp = props => {
  const [isWrong, setIsWrong] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isWrong) {
      document.querySelector(".warning").innerText =
        "*Login failed! Username or password wrong.";
    } else {
      document.querySelector(".warning").innerText = "";
    }
  }, [isWrong]);

  const handleFormSubmit = e => {
    e.preventDefault();
    // axios
    //   .post("http://localhost:8000/api/token/", {
    //     username: username,
    //     password: password
    //   })
    //   .then(response => {
    //     const decoded = decode(response.data.access);
    //     localStorage.setItem("admin-is-logged-in", true);
    //     localStorage.setItem("admin-logged-in-jti", decoded.jti);
    //     localStorage.setItem("admin-logged-in-userid", decoded.user_id);
    //     history.replace({
    //       pathname: `/dashboard=${decoded.jti}`,
    //       state: {
    //         jti: decoded.jti,
    //         userID: decoded.user_id
    //       }
    //     });
    //   })
    //   .catch(error => {
    //     setIsWrong(true);
    //   });

    var user_id;
    if (username === "admin" && password === "happy") {
      user_id = 1;
    } else if (username === "bostan" && password === "happy") {
      user_id = 9;
    } else if (username === "hello" && password === "happy") {
      user_id = 5;
    } else {
      setIsWrong(true);
    }
    localStorage.setItem("admin-is-logged-in", true);
    localStorage.setItem("admin-logged-in-jti", "blablabla");
    localStorage.setItem("admin-logged-in-userid", user_id);
    history.replace({
      pathname: `/dashboard=blablabla`,
      state: {
        jti: "blablabla",
        userID: user_id
      }
    });
  };

  return (
    <SignInForm>
      <FormHeader>Hello!</FormHeader>
      <FormContent onSubmit={handleFormSubmit}>
        <label for="username">Username</label>
        <ContentUser id='username'
          type='text'
          value={username}
          onChange={e => {
            setIsWrong(false);
            console.log(isWrong);
            setUsername(e.target.value);
          }}
        />
        <label for="password">Password</label>
        <ContentPassword id='password'
          type="password"
          value={password}
          onChange={e => {
            setIsWrong(false);
            console.log(isWrong);
            setPassword(e.target.value);
          }}
        />
        <WrongWarning className="warning" />
        <FormButton to="/dashboard">Sign In</FormButton>
      </FormContent>
    </SignInForm>
  );
};

export default SignInFormComp;
