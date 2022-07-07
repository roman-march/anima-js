import React from "react";

import Component from "./components/Component";
import { AnimaContext } from "./components/TransitionContext";
import tags from "./tags";

interface IUseAnima {
  anima: ComponentType;
  inTransition: boolean | null;
}

interface IAnimaProps {
  in?: string | number | boolean | null;
  transitionKey?: string | number | boolean | null;
  group?: boolean;
  switch?: boolean;
  prevent?: boolean;
  unmount?: boolean;
  mount?: boolean;
  onAnimaTransition?: () => void;
  onAnimaDone?: () => void;
  onAnimaStart?: () => void;
}

type TypeAnima<E extends React.ElementType = React.ElementType> = {
  type?: E;
};

type AnimaProps<E extends React.ElementType> = TypeAnima<E> &
  Omit<React.ComponentProps<E>, keyof TypeAnima>;

const AnimaComp = <E extends React.ElementType>({ type }: AnimaProps<E>) =>
  React.forwardRef<E, AnimaProps<E> & IAnimaProps>(function AnimaComponent(
    props,
    ref
  ) {
    return <Component {...props} type={type} forwardedRef={ref} />;
  });

type ComponentType = {
  [T in keyof JSX.IntrinsicElements]: React.FC<
    React.ComponentProps<T> & IAnimaProps
  >;
};

// @ts-ignore
const components: ComponentType = {};

tags.forEach((type: string) => {
  // @ts-ignore
  components[type] = AnimaComp<any>({ type });
});

const useAnima = (): IUseAnima => {
  const { inTransition } = React.useContext(AnimaContext);

  return {
    anima: components,
    inTransition,
  };
};

export default useAnima;
