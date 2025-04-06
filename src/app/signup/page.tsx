// src/app/pages/signup.tsx

'use client';

import { useEffect, useState } from "react";
import SignupPage from "./SignupPage";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const info = sessionStorage.getItem("signupInfo");
    if (info) {
      const { name, email } = JSON.parse(info);
      setName(name);
      setEmail(email);
      sessionStorage.removeItem("signupInfo"); // 한번 쓰고 제거
    }
  }, []);
  return <SignupPage name={name} email={email} />;
};

export default Signup;
