import React from "react";
import { CSSTransition } from "react-transition-group";

import { AnimaContext } from "./TransitionContext";
import { nextFrame } from "../utils";
import useCombinedRefs from "../useCombinedRefs";

import { IAnimaComponent, IAnimaProps, ITransitionContext } from "../types";

const classNames = {
  appear: "out",
  appearActive: "out in",
  appearDone: "",

  enter: "enter out",
  enterActive: "enter out in",
  enterDone: "",

  exit: "exit in",
  exitActive: "exit in out",
  exitDone: "out",
};

const TransitionComponent: React.FC<IAnimaComponent & IAnimaProps> = (
  props
) => {
  const {
    type: Component,
    forwardedRef,
    children,
    prevent,
    unmount: unmountOnExit,
    mount: mountOnEnter,
    onAnimaTransition,
    onAnimaDone,
    onAnimaStart,
    ...rest
  } = props;
  const ref = React.useRef(null);
  const combinedRef = useCombinedRefs(forwardedRef, ref);

  const ctx = React.useMemo<ITransitionContext>(
    () => ({
      in: false,
      node: undefined,
      done: undefined,
      onAnimaDone: undefined,
      onAnimaStart: undefined,
      onAnimaTransition: undefined,
      count: 0,
    }),
    []
  );

  const handleStart = React.useCallback(() => {
    ctx.count += 1;
  }, []);

  const handleCancel = React.useCallback(() => {
    ctx.count -= 1;
  }, []);

  const handleDone = React.useCallback(
    (event: Event) => {
      ctx.count -= 1;

      if (ctx.count > 0) {
        return;
      }

      const target = event.target as HTMLElement;

      if (!/\b(in|out)\b/i.test(target.className)) {
        return;
      }

      if (ctx.node && ctx.onAnimaDone) {
        ctx && ctx.onAnimaDone(ctx.in, ctx.node);
      }

      ctx.done && ctx.done();

      nextFrame(() => {
        if (ctx.node) {
          ctx.node.removeEventListener("transitionstart", handleStart);
          ctx.node.removeEventListener("transitioncancel", handleCancel);
          ctx.node.removeEventListener("transitionend", handleDone);

          ctx.node.removeEventListener("animationstart", handleStart);
          ctx.node.removeEventListener("animationcancel", handleCancel);
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
      combinedRef.current = ctx.node as any;

      if (ctx.onAnimaStart) {
        ctx.onAnimaStart(ctx.in, ctx.node);
      }

      if (ctx.onAnimaTransition) {
        return ctx.onAnimaTransition(ctx.in, ctx.node, ctx.done);
      }

      ctx.node.addEventListener("transitionstart", handleStart, false);
      ctx.node.addEventListener("transitioncancel", handleCancel, false);
      ctx.node.addEventListener("transitionend", handleDone, false);

      ctx.node.addEventListener("animationstart", handleStart, false);
      ctx.node.addEventListener("animationcancel", handleCancel, false);
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
        <Component ref={combinedRef}>{children}</Component>
      </CSSTransition>
    </AnimaContext.Provider>
  );
};

TransitionComponent.defaultProps = {
  prevent: true,
};

export default React.memo(TransitionComponent);
