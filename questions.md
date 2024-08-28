## What is the difference between Component and PureComponent? Give an example where it might break my app.

As I remember, `PureComponent` uses shallow comparison of its props and state to optimize re-renders. This optimization technique, while beneficial, can also lead to problems with rendering. Overusing such techniques, even when props don’t change often, can introduce overhead due to the shallow comparison performed every time. Additionally, with `PureComponent`, props must be handled carefully to avoid missing necessary re-renders, especially when dealing with nested objects or arrays, which are only compared by reference and not by value.

## Context + ShouldComponentUpdate might be dangerous. Why is that?

I don’t have much experience with context + class components, but I suspect that using them together could lead to re-render issues if context changes aren’t handled correctly. If `shouldComponentUpdate` is implemented without considering context changes, it might not re-render the component when context values change, leading to outdated or incorrect data being displayed.

## Describe 3 ways to pass information from a component to its PARENT.

1. **Callback Functions**: In React, the main way to pass data from children to parents is by using callback functions. This allows the child component to call a function provided by the parent to send data back.

2. **State Management Libraries**: Alternatively, state management libraries like Redux or the Context API can be used. In these approaches, the child updates the state, which the parent or other components can consume, making it suitable for complex applications.

3. **Refs**: Another method is using refs with `useImperativeHandle` in functional components or `createRef` in class components. This allows direct interaction with child components, including accessing methods that can be used to pass data.

4. **Pub/Sub Pattern**: Additionally, the pub/sub pattern can be used, where the child component emits events that the parent listens to and responds to.

## Give 2 ways to prevent components from re-rendering.

1. **React.memo**: We can wrap the component with `React.memo` to prevent unnecessary re-renders by comparing the previous props with the current ones.

2. **Static Key**: We can use a static key for the component if we want to prevent re-renders based on dynamic data changes.

## What is a fragment and why do we need it? Give an example where it might break my app.

A `Fragment` in React lets you group components without adding extra DOM nodes, avoiding unnecessary nesting. However, this might cause styling issues if styles rely on extra wrapper elements. When dealing with lists, you should use the `Fragment` tag and provide keys to help React handle re-renders correctly. Missing or incorrect keys could cause rendering issues or performance problems.

## Give 3 examples of the HOC pattern.

1. **Error Handling**: An HOC can be used to catch errors in components and display a fallback UI.

2. **Theming**: An HOC can provide theme context to components, allowing them to access theme variables and styles.

3. **State Sharing**: An HOC can share state or functionality across multiple components, such as connecting components to a Redux store.

## What's the difference in handling exceptions in promises, callbacks, and async...await?

- **Callback Functions**: With callback functions, we pass the error as the first argument. If an error exists, it's passed; otherwise, null is passed.
- **Promises**: With promises, we handle errors in the `.catch()` method.
- **Async/Await**: With `async/await`, we use `try...catch` to handle errors inside the catch block.

## How many arguments does setState take and why is it async?

`setState` has two arguments: the first can be either a new state value or a function that receives the previous state as a parameter and returns the new state. The second argument is an optional callback function that is executed after the state has been updated. `setState` is asynchronous to optimize performance and ensure that multiple state updates are batched together and you always have the last state.

## List the steps needed to migrate a Class to Function Component.

1. **Create a New Functional Component**: Start by creating a functional component with the same name as the class component.

2. **Handle State Management**: Convert state management from `this.state` to the `useState` hook.

3. **Handle Lifecycles**: Replace lifecycle methods like `componentDidMount` and `componentDidUpdate` with the `useEffect` hook.

4. **Test the Component**: Test the new functional component to ensure it behaves the same way as the class component.

5. **Replace the Previous Component**: Once testing is complete, replace the old class component with the new functional component in your application.

## List a few ways styles can be used with components.

1. **CSS Modules**: Scoped styles that are only applied to the component.
2. **Inline CSS**: Styles applied directly on the component using the `style` attribute.
3. **CSS-in-JS Libraries**: Libraries like Styled Components, Emotion, etc., which allow styling within the component file.

## How to render an HTML string coming from the server.

1. **dangerouslySetInnerHTML**: Use `dangerouslySetInnerHTML` to render raw HTML strings directly.
2. **Iframe**: Use an `iframe`, which is a safer way to isolate the HTML content and avoid potential XSS (Cross-Site Scripting) attacks.
