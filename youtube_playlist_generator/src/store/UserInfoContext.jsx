import React, { createContext, useState } from "react";

const UserContext = createContext();

const CreateUserProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState("");
  const [authorization_code, setAuthorization_code] = useState("");

  const context = {
    accessToken,
    authorization_code,
    setAccessToken,
    setAuthorization_code,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export { UserContext, CreateUserProvider };
