import React from "react";

export interface IUseAnima {
  anima: ComponentType;
}

export interface IAnimaComponent {
  type: string | any;
  children?: any;
  forwardedRef?: React.Ref<any>;
  component?: React.ElementType;
}

export interface IAnimaProps {
  in?: InPropType;
  transitionKey?: any;
  group?: boolean;
  switch?: boolean;
  prevent?: boolean;
  unmount?: boolean;
  mount?: boolean;
  onAnimaDone: OnAnimaDoneType;
  onAnimaStart: OnAnimaStartType;
  onAnimaTransition: OnAnimaTransition;
}

export type InPropType = boolean | undefined;
export type OnAnimaDoneType = (inProp: InPropType, node: HTMLElement) => void;
export type OnAnimaStartType = (inProp: InPropType, node: HTMLElement) => void;
export type OnAnimaTransition =  (inProp: InPropType, node: HTMLElement, done: () => void) => void; // prettier-ignore

export interface ITransitionContext {
  in: boolean | undefined;
  node?: HTMLElement;
  done?: () => void;
  onAnimaDone?: OnAnimaDoneType;
  onAnimaStart?: OnAnimaStartType;
  onAnimaTransition?: OnAnimaTransition;
}

export interface IAnimaContext {
  inTransition: InPropType;
}

export type ItemType<E extends React.ElementType = React.ElementType> = {
  type?: E;
};

export type PropsType<E extends React.ElementType> = ItemType<E> &
  Omit<React.ComponentProps<E>, keyof ItemType>;

export type ComponentType = {
  [T in keyof JSX.IntrinsicElements]: React.FC<
    React.ComponentProps<T> & IAnimaProps
  >;
};
