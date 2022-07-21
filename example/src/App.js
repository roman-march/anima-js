import React from "react";
import useAnima from "anima-js";

import "./App.css";

const initialItems = [
  { id: 1, text: "One" },
  { id: 2, text: "Two" },
  { id: 3, text: "Three" },
];

function App() {
  const ref = React.useRef(null);

  const { anima } = useAnima();
  const [isActive, setActive] = React.useState(true);
  const [isVisible, setVisible] = React.useState(false);
  const [items, setItems] = React.useState(initialItems);

  const handleItemOneClick = React.useCallback(() => {
    console.log(ref.current);

    setVisible((value) => !value);
  }, []);

  const handleItemTwoClick = React.useCallback(() => {
    setActive((value) => !value);
  }, []);

  const handleItemThreeClick = React.useCallback(() => {
    setItems((items) => [...items.filter((_, i) => i !== items.length - 1)]);
  }, []);

  return (
    <main className="root">
      <section onClick={handleItemOneClick}>
        <anima.div ref={ref} className="item-one" mount unmount in={isVisible}>
          Click
        </anima.div>
      </section>

      <section onClick={handleItemTwoClick}>
        <anima.div className="item-two" switch transitionKey={isActive}>
          {isActive ? "Enabled" : "Disabled"}
        </anima.div>
      </section>

      <section onClick={handleItemThreeClick}>
        <anima.ul group>
          {items.map((item) => (
            <anima.li key={item.id} className="item-three">
              {item.text}
            </anima.li>
          ))}
        </anima.ul>
      </section>
    </main>
  );
}

export default App;
