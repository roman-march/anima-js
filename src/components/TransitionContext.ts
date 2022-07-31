import React from "react";
import { IAnimaContext, IAnimaTransitionContext } from "../types";

export const AnimaContext = React.createContext<IAnimaContext>({
  inTransition: undefined,
});

export const AnimaTransitionContext =
  React.createContext<IAnimaTransitionContext>({
    isRelative: false,
  });
