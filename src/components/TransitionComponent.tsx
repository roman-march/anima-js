import React from "react";
import { CSSTransition } from "react-transition-group";

import { AnimaContext, AnimaTransitionContext } from "./TransitionContext";
import useCombinedRefs from "../useCombinedRefs";

import { IAnimaComponent, IAnimaProps, ITransitionContext } from "../types";
import { isNone } from "../utils";

const classNames = (state?: boolean, initial?: boolean) => ({
  appear: initial ? "init" : "exit",
  appearActive: initial ? "init enter" : "exit enter",
  appearDone: state ? "enter" : "",

  enter: initial ? "init" : "exit",
  enterActive: initial ? "init enter" : "enter",
  enterDone: state ? "enter" : "",

  exit: "enter",
  exitActive: "exit",
  exitDone: "exit",
});

const stopEvents = (event: any) => {
  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();
};

const TransitionComponent: React.FC<IAnimaComponent & IAnimaProps> = (
  props
) => {
  const {
    type: Component,
    forwardedRef,
    children,
    state,
    initial,
    relative,
    unmount: unmountOnExit,
    mount: mountOnEnter,
    onAnimaTransition,
    onAnimaDone,
    onAnimaStart,
    ...rest
  } = props;
  const ref = React.useRef(null);
  const combinedRef = useCombinedRefs(forwardedRef, ref);

  const { isRelative: isParentRelative } = React.useContext(
    AnimaTransitionContext
  );

  const isRelative = isNone(relative) ? isParentRelative : relative;

  const ctx = React.useMemo<ITransitionContext>(
    () => ({
      in: false,
      node: undefined,
      done: undefined,
      onAnimaDone: undefined,
      onAnimaStart: undefined,
      onAnimaTransition: undefined,
      playing: 0,
    }),
    []
  );

  const onTransitionStart = React.useCallback(
    (event: any) => {
      if (!isRelative) stopEvents(event);

      ctx.playing += 1;
    },
    [isRelative]
  );

  const onTransitionEnd = React.useCallback(
    (event: any) => {
      if (!isRelative) stopEvents(event);

      ctx.playing -= 1;

      if (ctx.playing <= 0) {
        handleDone(event);
      }
    },
    [isRelative]
  );

  const onTransitionCancel = React.useCallback(
    (event: any) => {
      if (!isRelative) stopEvents(event);

      ctx.playing -= 1;
    },
    [isRelative]
  );

  const handleDone = React.useCallback(
    (event: Event) => {
      const target = event.target as HTMLElement;

      if (!/\b(enter|exit)\b/i.test(target.className)) {
        return;
      }

      if (ctx.node && ctx.onAnimaDone) {
        ctx && ctx.onAnimaDone(ctx.in, ctx.node);
      }

      if (ctx.node) {
        ctx.node.removeEventListener("transitionrun", onTransitionStart);
        ctx.node.removeEventListener("transitioncancel", onTransitionCancel);
        ctx.node.removeEventListener("transitionend", onTransitionEnd);

        ctx.node.removeEventListener("animationstart", onTransitionStart);
        ctx.node.removeEventListener("animationcancel", onTransitionCancel);
        ctx.node.removeEventListener("animationend", onTransitionEnd);
      }

      ctx.done && ctx.done();
    },
    [isRelative]
  );

  const handleAddEndListener = React.useCallback(
    (node: HTMLElement, done: () => void) => {
      if (!/\b(enter|exit)\b/i.test(node.className)) {
        return;
      }

      ctx.node = node;
      ctx.done = done;
      combinedRef.current = ctx.node as any;

      if (ctx.onAnimaStart) {
        ctx.onAnimaStart(ctx.in, ctx.node);
      }

      if (ctx.onAnimaTransition) {
        return ctx.onAnimaTransition(ctx.in, ctx.node, ctx.done);
      }

      ctx.node.addEventListener("transitionrun", onTransitionStart, false);
      ctx.node.addEventListener("transitioncancel", onTransitionCancel, false);
      ctx.node.addEventListener("transitionend", onTransitionEnd, false);

      ctx.node.addEventListener("animationstart", onTransitionStart, false);
      ctx.node.addEventListener("animationcancel", onTransitionCancel, false);
      ctx.node.addEventListener("animationend", onTransitionEnd, false);
    },
    [handleDone, onTransitionEnd, onTransitionStart, onTransitionCancel]
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
      <AnimaTransitionContext.Provider value={{ isRelative }}>
        <CSSTransition
          {...rest}
          classNames={classNames(state, initial)}
          mountOnEnter={mountOnEnter}
          unmountOnExit={unmountOnExit}
          addEndListener={handleAddEndListener}
        >
          <Component ref={combinedRef}>{children}</Component>
        </CSSTransition>
      </AnimaTransitionContext.Provider>
    </AnimaContext.Provider>
  );
};

TransitionComponent.defaultProps = {};

export default React.memo(TransitionComponent);
