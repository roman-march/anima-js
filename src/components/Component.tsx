import React from "react";
import { SwitchTransition, TransitionGroup } from "react-transition-group";

import TransitionComponent from "./TransitionComponent";

import { isBool } from "../utils";
import { IAnimaComponent, IAnimaProps } from "../types";

const AnimaComponent: React.FC<IAnimaComponent & IAnimaProps> = ({
  type,
  forwardedRef,
  group: groupTransition,
  switch: switchTransition,
  component: Component,
  transitionKey,
  ...props
}) => {
  const customType = type === "custom" ? Component : type;

  if (isBool(groupTransition)) {
    return (
      <TransitionGroup
        {...props}
        key={props.children.key}
        component={customType}
      />
    );
  }

  if (isBool(switchTransition)) {
    return (
      <SwitchTransition>
        <TransitionComponent {...props} key={transitionKey} type={customType} />
      </SwitchTransition>
    );
  }

  return (
    <TransitionComponent
      {...props}
      key={props.children && props.children.key}
      type={customType}
    />
  );
};

export default React.memo(AnimaComponent);
