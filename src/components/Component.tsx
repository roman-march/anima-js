import React from "react";
import { SwitchTransition, TransitionGroup } from "react-transition-group";

import TransitionComponent from "./TransitionComponent";

import { isBool } from "../utils";
import { IAnimaComponent, IAnimaProps } from "../types";
import useAnima from "../index";

const AnimaComponent: React.FC<IAnimaComponent & IAnimaProps> = ({
  type,
  forwardedRef,
  group: groupTransition,
  switch: switchTransition,
  component: Component,
  transitionKey,
  ...props
}) => {
  const { inTransition } = useAnima();
  const inProp = props.in !== undefined ? props.in : inTransition;
  const customType = type === "custom" ? Component : type;

  if (isBool(groupTransition)) {
    return (
      <TransitionGroup
        {...props}
        in={inProp}
        key={props.children.key}
        ref={forwardedRef}
        component={customType}
      />
    );
  }

  if (isBool(switchTransition)) {
    return (
      <SwitchTransition>
        <TransitionComponent
          {...props}
          forwardedRef={forwardedRef}
          key={transitionKey}
          type={customType}
          in={inProp}
        />
      </SwitchTransition>
    );
  }

  return (
    <TransitionComponent
      {...props}
      forwardedRef={forwardedRef}
      key={props.children && props.children.key}
      type={customType}
      in={inProp}
    />
  );
};

export default React.memo(AnimaComponent);
