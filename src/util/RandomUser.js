import { v4 as uuidv4 } from "uuid";
export const checkDataFromLocalStorage = () => {
  try {
    console.log("Empty");
    const UserData = {
      quizapp: "Twitter,Instagram,LinkedIn : deepakmp444",
      time: new Date().toLocaleString(),
      userID: uuidv4(),
      initialValue: true,
      quiz: [],
    };
    localStorage.setItem("UserData", JSON.stringify(UserData));
    console.log("user first Time", UserData);
    return UserData;
  } catch (error) {
    return null;
  }
};
