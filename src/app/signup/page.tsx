// src/app/pages/signup.tsx

'use client';

import { useEffect, useState } from "react";
import SignupPage from "./SignupPage";
import { fetchUserInfo } from "../api/hooks/user";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadUserInfo = async () => {
      const response = await fetchUserInfo(null, null);
      if (response) {
        setName(response?.data?.name);
        setEmail(response?.data?.username);
      } 
    }
    loadUserInfo();
  }, []);
  return <SignupPage loadName={name} email={email} />;
};

export default Signup;
