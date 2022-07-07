import React from "react";
import { CSSTransition } from "react-transition-group";

import { AnimaContext } from "./TransitionContext";
import { nextFrame } from "../utils";

const classNames = {
  appear: "t-in-out",
  appearActive: "t-in",
  appearDone: "t-in",

  enter: "t-in-out",
  enterActive: "t-in",
  enterDone: "t-in",

  exit: "t-out",
  exitActive: "t-out",
  exitDone: "t-out",
};

const TransitionComponent: React.FC<any> = (props) => {
  const {
    type: Component,
    children,
    prevent,
    unmount: unmountOnExit,
    mount: mountOnEnter,
    onAnimaTransition,
    onAnimaDone,
    onAnimaStart,
    ...rest
  } = props;

  const ctx = React.useMemo<any>(
    () => ({
      in: false,
      node: null,
      done: null,
      callback: null,
      onAnimaDone: null,
      onAnimaStart: null,
    }),
    []
  );

  const handleDone = React.useCallback(
    (event: React.CompositionEvent) => {
      if (prevent) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (ctx.onAnimaDone) {
        ctx.onAnimaDone(ctx.in);
      }

      ctx.done();

      nextFrame(() => {
        ctx.node.removeEventListener("transitionend", handleDone);
        ctx.node.removeEventListener("animationend", handleDone);
      });
    },
    [prevent]
  );

  const handleAddEndListener = React.useCallback(
    (node: React.ReactElement, done: Function) => {
      ctx.node = node;
      ctx.done = done;

      if (ctx.onAnimaStart) {
        ctx.onAnimaStart(node, done);
      }

      if (ctx.onAnimaTransition) {
        return onAnimaTransition(ctx.in, node, done);
      }

      ctx.node.addEventListener("transitionend", handleDone, false);
      ctx.node.addEventListener("animationend", handleDone, false);
    },
    [handleDone]
  );

  React.useEffect(() => {
    ctx.onAnimaDone = onAnimaDone;
    ctx.onAnimaStart = onAnimaStart;
    ctx.onAnimaTransition = onAnimaTransition;
  }, [onAnimaDone, onAnimaStart, onAnimaTransition]);

  React.useEffect(() => {
    ctx.in = props.in;
  }, [props.in]);

  return (
    <AnimaContext.Provider value={{ inTransition: props.in }}>
      <CSSTransition
        {...rest}
        classNames={classNames}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        addEndListener={handleAddEndListener}
      >
        <Component>{children}</Component>
      </CSSTransition>
    </AnimaContext.Provider>
  );
};

TransitionComponent.defaultProps = {
  prevent: true,
};

export default React.memo(TransitionComponent);
