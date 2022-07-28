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
  stagger,
  component,
  transitionKey,
  children,
  ...props
}) => {
  const CustomComponent = React.forwardRef(function AnimaCustomComponent(
    props,
    ref
  ) {
    return <component.type {...props} forwardedRef={ref} />;
  });

  const { inTransition } = useAnima();
  const inProp = props.in !== undefined ? props.in : inTransition;
  const customType = type === "custom" ? CustomComponent : type;

  const newChildren = React.Children.map(children, (child, index: any) => {
    if (React.isValidElement(child)) {
      const props = child.props as any;
      const style = props.style || {};

      if (stagger !== undefined) {
        style["--delay"] = index * stagger;
      }

      return React.cloneElement<any>(child, {
        ...props,
        style,
      });
    }

    return child;
  });

  if (isBool(groupTransition)) {
    return (
      <TransitionGroup
        {...props}
        children={newChildren}
        in={inProp}
        key={children.key}
        ref={forwardedRef}
        component={customType}
      />
    );
  }

  if (isBool(switchTransition)) {
    if (type === "custom" && component === undefined) {
      return <SwitchTransition>{children}</SwitchTransition>;
    }

    return (
      <SwitchTransition>
        <TransitionComponent
          {...props}
          forwardedRef={forwardedRef}
          key={transitionKey}
          type={customType}
        >
          {newChildren}
        </TransitionComponent>
      </SwitchTransition>
    );
  }

  return (
    <TransitionComponent
      {...props}
      children={newChildren}
      forwardedRef={forwardedRef}
      key={children && children.key}
      type={customType}
      in={inProp}
    />
  );
};

export default React.memo(AnimaComponent);
