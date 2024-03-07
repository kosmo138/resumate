import React from "react";
import "./App.css";

interface BoxProps {
  text: string;
}

const Box: React.FC<BoxProps> = ({ text }) => {
  return (
    <div className="box">
      <p>{text}</p>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>자소서</h1>
      <div className="box-container">
        {[...Array(12).keys()].map((index) => (
          <Box key={index} text={`자소서 ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default App;
