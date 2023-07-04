import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Form from  "../components/Form";
import "../styles/App.css";

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <Form />
      <Footer />
    </div>
  );
};

export default App;
