import React, { createContext } from "react";

interface User {
  firstName: string;
  lastName: string;
  color: string;
}

const initialUser: User = {
  firstName: "Daniel",
  lastName: "Chao",
  color: "#000000",
};

export const UserContext = createContext<{
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}>({
  user: initialUser,
  setUser: () => {},
});
