import React from "react";
import { IAnimaContext } from "../types";

export const AnimaContext = React.createContext<IAnimaContext>({
  inTransition: undefined,
});
