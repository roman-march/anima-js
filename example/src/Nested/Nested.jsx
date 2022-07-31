import React from "react";
import useAnima from "anima-js";

import s from "./Nested.module.scss";

const Nested = () => {
  const { anima } = useAnima();
  const [isRootVisible, setRootVisible] = React.useState(false);
  const [isVisible, setVisible] = React.useState(true);

  const handleClick = () => {
    if (isRootVisible) {
      setVisible((value) => !value);
    }
  };

  const handleRootClick = () => {
    setRootVisible(true);
  };

  return (
    <anima.div
      className={s.root}
      in={isRootVisible}
      state
      onClick={handleRootClick}
    >
      <anima.ul
        className={s.list}
        in={isVisible}
        unmount
        relative
        stagger={0.1}
        onClick={handleClick}
      >
        <anima.li>01</anima.li>
        <anima.li>02</anima.li>
        <anima.li>03</anima.li>
        <anima.li>04</anima.li>
      </anima.ul>
    </anima.div>
  );
};

export default Nested;
