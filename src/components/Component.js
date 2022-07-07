import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import React from "react";
import PropTypes from "prop-types";
import { SwitchTransition, TransitionGroup } from "react-transition-group";
import TransitionComponent from "./TransitionComponent";
import { isBool } from "../utils";
const AnimaComponent = ({ type, forwardedRef, group: groupTransition, switch: switchTransition, component: Component, transitionKey, ...props }) => {
    const customType = type === "custom" ? Component : type;
    if (isBool(groupTransition)) {
        return (_createElement(TransitionGroup, { ...props, key: props.children.key, component: customType }));
    }
    if (isBool(switchTransition)) {
        return (_jsx(SwitchTransition, { children: _createElement(TransitionComponent, { ...props, key: transitionKey, type: customType }) }));
    }
    return (_createElement(TransitionComponent, { ...props, key: props.children && props.children.key, type: customType }));
};
AnimaComponent.propTypes = {
    type: PropTypes.string,
};
export default React.memo(AnimaComponent);
