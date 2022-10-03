export const getUserData = () => {
    const data = localStorage.getItem("UserData");
    if (data) {
      return JSON.parse(data);
    } else {
      return {};
    }
  };