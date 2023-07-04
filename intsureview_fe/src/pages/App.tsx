import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Form from "../components/Form";
import "../styles/App.css";
import { UserContext } from "../contexts/UserContext";

const App: React.FC = () => {
  const [user, setUser] = React.useState({
    firstName: "Daniel",
    lastName: "Chao",
    color: "#000000",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="wrapper">
        <Header />
        <Form />
        <Footer />
      </div>
    </UserContext.Provider>
  );
};

export default App;
