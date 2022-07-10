import React from "react";

import Component from "./components/Component";
import { AnimaContext } from "./components/TransitionContext";
import tags from "./tags";

import { PropsType, IAnimaProps, IUseAnima, IAnimaContext } from "./types";

// @ts-ignore
const components: ComponentType = {};

const AnimaComp = <E extends React.ElementType>({ type }: PropsType<E>) =>
  React.forwardRef<E, PropsType<E> & IAnimaProps>(function AnimaComponent(
    props,
    ref
  ) {
    return <Component {...props} type={type} forwardedRef={ref} />;
  });

tags.forEach((type: string) => {
  components[type] = AnimaComp<any>({ type });
});

const useAnima = (): IUseAnima & IAnimaContext => {
  const { inTransition } = React.useContext(AnimaContext);

  return {
    anima: components,
    inTransition,
  };
};

export default useAnima;
