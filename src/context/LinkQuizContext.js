import { createContext, useState } from "react";
import { db } from "../FirebaseConfig";
import { getDoc, doc } from "firebase/firestore";

// this is for Store Score data into Firestore

export const quizContextApi = createContext();

export function LinkQuizContextProvider({ children }) {
  const [quizId, setQuizId] = useState("1212");
  const [score, setScore] = useState(0);

  const getQuiz = (id) => {
    const quizDoc = doc(db, "quiz", id);
    return getDoc(quizDoc);
  };

  return (
    <quizContextApi.Provider
      value={{
        getQuiz,
        quizId,
        setQuizId,
        score,
        setScore,
      }}
    >
      {children}
    </quizContextApi.Provider>
  );
}
