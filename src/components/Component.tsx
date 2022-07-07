import React from "react";
import PropTypes from "prop-types";
import { SwitchTransition, TransitionGroup } from "react-transition-group";

import AnimaComponent from "./TransitionComponent";

import { isBool } from "../utils";

const TransitComponent: React.FC<any> = ({
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
        <AnimaComponent {...props} key={transitionKey} type={customType} />
      </SwitchTransition>
    );
  }

  return (
    <AnimaComponent
      {...props}
      key={props.children && props.children.key}
      type={customType}
    />
  );
};

TransitComponent.propTypes = {
  type: PropTypes.string,
};

export default React.memo(TransitComponent);
