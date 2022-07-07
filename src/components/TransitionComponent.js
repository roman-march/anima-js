import { jsx as _jsx } from "react/jsx-runtime";
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
const TransitionComponent = (props) => {
    const { type: Component, children, prevent, unmount: unmountOnExit, mount: mountOnEnter, onCustomTransition, onTransitionDone, onTransitionStart, ...rest } = props;
    const ctx = React.useMemo(() => ({
        in: false,
        node: null,
        done: null,
        callback: null,
        onTransitionDone: null,
        onTransitionStart: null,
    }), []);
    const handleDone = React.useCallback((event) => {
        if (prevent) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (ctx.onTransitionDone) {
            ctx.onTransitionDone(ctx.in);
        }
        ctx.done();
        nextFrame(() => {
            ctx.node.removeEventListener("transitionend", handleDone);
            ctx.node.removeEventListener("animationend", handleDone);
        });
    }, [prevent]);
    const handleAddEndListener = React.useCallback((node, done) => {
        ctx.node = node;
        ctx.done = done;
        if (ctx.onTransitionStart) {
            ctx.onTransitionStart(node, done);
        }
        if (ctx.onCustomTransition) {
            return onCustomTransition(ctx.in, node, done);
        }
        ctx.node.addEventListener("transitionend", handleDone, false);
        ctx.node.addEventListener("animationend", handleDone, false);
    }, [handleDone]);
    React.useEffect(() => {
        ctx.onTransitionDone = onTransitionDone;
        ctx.onTransitionStart = onTransitionStart;
        ctx.onCustomTransition = onCustomTransition;
    }, [onTransitionDone, onTransitionStart, onCustomTransition]);
    React.useEffect(() => {
        ctx.in = props.in;
    }, [props.in]);
    return (_jsx(AnimaContext.Provider, { value: { inTransition: props.in }, children: _jsx(CSSTransition, { ...rest, classNames: classNames, mountOnEnter: mountOnEnter, unmountOnExit: unmountOnExit, addEndListener: handleAddEndListener, children: _jsx(Component, { children: children }) }) }));
};
TransitionComponent.defaultProps = {
    prevent: true,
};
export default React.memo(TransitionComponent);
