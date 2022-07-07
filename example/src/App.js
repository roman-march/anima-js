import React from "react";
import useAnima from "anima-test-js";

import "./App.css";

function App() {
  const { anima } = useAnima();

  const [items, setItems] = React.useState([
    { id: 1, text: "1" },
    { id: 2, text: "2" },
    { id: 3, text: "3" },
    { id: 4, text: "4" },
    { id: 5, text: "5" },
  ]);

  const handleClick = () => {
    setItems((items) => [...items.slice(3, 5), { id: 9, text: "9" }]);
  };

  return (
    <anima.ul group onClick={handleClick}>
      {items.map(({ id, text }) => (
        <anima.li key={id} className="list">
          {text}
        </anima.li>
      ))}
    </anima.ul>
  );
}

export default App;
