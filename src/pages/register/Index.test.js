import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.log(error.message);
    } else {
      console.log("User signed up successfully");
    }
  };

  useEffect(() => {
    const addRoleToUser = async () => {
      const { user } = await supabase.auth.signIn({
        email: email,
        password: password,
      });
      const { data, error } = await supabase.from("user_roles").insert({
        user_id: user.id,
        role: "user",
      });
      if (error) {
        console.log(error.message);
      }
    };

    if (email && password) {
      addRoleToUser();
    }
  }, [email, password]);

  return <div></div>;
}
