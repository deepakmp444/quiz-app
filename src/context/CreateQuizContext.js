import { createContext, useState } from "react";

export const CreatePlayQuizContextApi = createContext();

const CreateQuizContextProvider = ({ children }) => {
  const [urlId, setUrlId] = useState("");
  const [idOfFirestore, setIdofFirestore] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <CreatePlayQuizContextApi.Provider
      value={{
        urlId,
        setUrlId,
        idOfFirestore,
        setIdofFirestore,
        userName,
        setUserName,
      }}
    >
      {children}
    </CreatePlayQuizContextApi.Provider>
  );
};

export default CreateQuizContextProvider;
