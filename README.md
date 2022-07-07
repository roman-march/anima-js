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

## Different

Classic code using **react-transition-group**

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
⬇️ And using **Anima.js** ⬇️

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

### Transition animation
Live [demo](https://codesandbox.io/s/anima-js-transition-animation-hhhnf2)
```jsx
<anima.h1 className="title" in={isVisible}>Hello world</anima.h1>
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
