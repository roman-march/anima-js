import React from "react";
import { CSSTransition } from "react-transition-group";

import { AnimaContext } from "./TransitionContext";
import { nextFrame } from "../utils";

import { IAnimaComponent, IAnimaProps, ITransitionContext } from "../types";

const classNames = {
  appear: "t-in-out",
  appearActive: "t-in",
  appearDone: "",

  enter: "t-in-out",
  enterActive: "t-in",
  enterDone: "",

  exit: "t-in t-out",
  exitActive: "t-in t-out",
  exitDone: "t-out",
};

const TransitionComponent: React.FC<IAnimaComponent & IAnimaProps> = (
  props
) => {
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

  const ctx = React.useMemo<ITransitionContext>(
    () => ({
      in: false,
      node: undefined,
      done: undefined,
      onAnimaDone: undefined,
      onAnimaStart: undefined,
      onAnimaTransition: undefined,
    }),
    []
  );

  const handleDone = React.useCallback(
    (event: Event) => {
      const target = event.target as HTMLElement;

      if (!/t-in|t-out/.test(target.className)) {
        return;
      }

      if (prevent) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (ctx.node && ctx.onAnimaDone) {
        ctx && ctx.onAnimaDone(ctx.in, ctx.node);
      }

      ctx.done && ctx.done();

      nextFrame(() => {
        if (ctx.node) {
          ctx.node.removeEventListener("transitionend", handleDone);
          ctx.node.removeEventListener("animationend", handleDone);
        }
      });
    },
    [prevent]
  );

  const handleAddEndListener = React.useCallback(
    (node: HTMLElement, done: () => void) => {
      ctx.node = node;
      ctx.done = done;

      if (ctx.onAnimaStart) {
        ctx.onAnimaStart(ctx.in, ctx.node);
      }

      if (ctx.onAnimaTransition) {
        return ctx.onAnimaTransition(ctx.in, ctx.node, ctx.done);
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
