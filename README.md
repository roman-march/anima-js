# Anima.js 🎞

**Anima.js** - SCSS/SASS Animation library.<br />
With Anima.js you can write **compact** code using the transitions and animations controlled from javascript.

## Download

npm:
```bash
npm install anima-js --save
```
yarn:
```bash
yarn add anima-js
```

## Usage

```jsx
import useAnima from "anima-js";

const App = ({ isVisible }) => {
  const { anima } = useAnima();
  
  return (
    <anima.h1 className="title" state in={isVisible}>
      Hello world
    </anima.h1>
  )
}
```
```scss
.title {
  @include in {
    opacity: 1;
    transition: opacity .5s;
  }

  @include out {
    opacity: 0;
    transition: opacity .25s;
  }
}
```

<details>
<summary>I <b>recommend</b> using special mixins for shorter code</summary>

```scss
@mixin in {
  &[class$="enter"] {
    @content;
  }
}

@mixin out {
  &[class$="exit"] {
    @content;
  }
}

@mixin animation-in($animation: 1s 0s both) {
  &[class$="enter"] {
    $name: anima-#{unique-id()};
    animation: #{$name} $animation;
    @keyframes #{$name} {
      @content;
    }
  }
}

@mixin animation-out($animation: 1s 0s both) {
  &[class$="exit"] {
    $name: anima-#{unique-id()};
    animation: #{$name} $animation;
    @keyframes #{$name} {
      @content;
    }
  }
}
```
</details>


## Examples

[Simple Transition](https://codesandbox.io/s/anima-js-transition-animation-hhhnf2)

[Switch Transition](https://codesandbox.io/s/anima-js-transition-switch-hqcmfb)

[Group Transition](https://codesandbox.io/s/anima-js-transition-group-memsdx)

[Animated Button](https://codesandbox.io/s/anima-js-button-giulzx)

## Callbacks

A callback that will fire when an animation starts.

```tsc
onAnimaStart: (in: boolean, node: HTMLElement) => void
```

A callback that will fire when an animation has finished.

```tsc
onAnimaDone: (in: boolean, node: HTMLElement) => void
```

A callback that fires before an animation starts.<br />
If you want to use custom animation you need this method.

```tsc
onAnimaTransition: (in: boolean, node: HTMLElement, done: Function) => void
```

## Custom Components

Sometimes you need to use custom components.

```jsx
const MyComponent = ({ children }) => (
  <h1>{children}<h1>
)

<anima.custom component={MyComponent}>
  Hello world
</anima.custom>
```
