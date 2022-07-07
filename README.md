# Anima.js 🎞

**Anima.js** - CSS Animation library controlled by React-Transition-Group.<br />
With Anima.js you can write **compact** code using the classic animation library for react.

## Download

npm:
```bash
npm install anima-js --save
```
yarn:
```bash
yarn add anima-js
```

## Differences

Classic code using the **react-transition-group**

```jsx 
import { TransitionGroup, CSSTransition } from 'react-transition-group'

return (
  <TransitionGroup component="ul">
    {items.map(({ id, text }) => (
      <CSSTransition classNames="item" key={id} timeout={500}>
        <li>{text}</li>
      </CSSTransition>
    ))}
  </TransitionGroup>
)

```
⬇️ And using the **Anima.js** ⬇️

```jsx
const { anima } = useAnima();
  
return (
  <anima.ul group>
    {items.map(({ id, text }) => (
      <anima.li key={id} className="item">{text}</anima.li>
    ))}
  </anima.ul>
)
```

🎬⏱ Also, you don't have to think about timeout. Anime.js **automatically** manages the start and end of the animation. ⏱🎬

## Usage

```jsx
import useAnima from "anima-js";

const App = ({ isVisible }) => {
  const { anima } = useAnima();
  
  return (
    <anima.h1 className="title" in={isVisible}>
      Hello world
    </anima.h1>
  )
}
```

## Transitions

As in the library React-Transition-Group, there are three type of transitions

### Simple Transition
Live [demo](https://codesandbox.io/s/anima-js-transition-animation-hhhnf2)
```jsx
<anima.h1 className="title" in={isVisible}>
  Hello world
</anima.h1>
```
```css
/* enter state */
.t-in.title {
  opacity: 1;
  transition: opacity .5s;
}

/* exit state */
.t-out.title {
  opacity: 0;
  transition: opacity .25s;
}
```

### Switch Transition

Live [demo](https://codesandbox.io/s/anima-js-transition-switch-hqcmfb)

```jsx
<anima.span className="title" switch transitionKey={isDone}>
  {isDone ? "Finish" : "Start"}
<anima.span>
```
```css
 /* initial state */
.t-in-out.title {
  opacity: 0;
}

/* enter state */
.t-in.title {
  opacity: 1;
  transition: opacity .5s;
}

/* exit state */
.t-out.title {
  opacity: 0;
  transition: opacity .25s;
}
```

### Group Transition

Live [demo](https://codesandbox.io/s/anima-js-transition-group-memsdx)

```jsx
<anima.ul group>
  {items.map(({ id, text }) => (
    <anima.li key={id} className="item">{text}</anima.li>
  ))}
<anima.ul>
```
```css
 /* initial state */
.t-in-out.title {
  opacity: 0;
}

/* enter state */
.t-in.title {
  opacity: 1;
  transition: opacity .5s;
}

/* exit state */
.t-out.title {
  opacity: 0;
  transition: opacity .25s;
}
```

## Callbacks

### onAnimaStart

A callback that will fire when an animation starts.

```tsx
onAnimaStart: (node: HTMLElement, done: Function) => void
```

### onAnimaDone

A callback that will fire when an animation has finished.

```tsx
onAnimaDone: (in: boolean) => void
```

### onAnimaTransition

A callback that fires before an animation starts.<br />
If you want to use custom animation you need this method.

```tsx
onAnimaTransition: (in: boolean, node: HTMLElement, done: Function) => void
```

## Custom Components

Sometimes you need to use custom components.

```jsx
const MyComponent = ({ children }) => (
  <h1>{children}<h1>
)

<anima.custom className="title" component={MyComponent}>
  Hello world
</anima.custom>
```
