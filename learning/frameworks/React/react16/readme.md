# New features in React 16
## Returning arrays
```javascript
render() {
  return [
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
```
## Returning strings
```javascript
render() {
  return 'I am an awasome string';
}
```
```javascript
render() {
 return [
  "Some text.",
  <h2 key="heading-1">A heading</h2>,
  "More text.",
  <h2 key="heading-2">Another heading</h2>,
  "Even more text."
 ];
}
```
## Fragments
The wrapper for elements, no needed to use `<div></div>` or `<span></span>`
`<React.Fragment/>`
```javascript
render() {
  return (
    <Fragment>
      Some text.
      <h2>A heading</h2>
      More text.
      <h2>Another heading</h2>
      Even more text.
    </Fragment>
  );
}
```
or
`<>`
```javascript
render() {
  return (
    <>
      Some text.
      <h2>A heading</h2>
      More text.
      <h2>Another heading</h2>
      Even more text.
    </>
  );
}
```
## React.createRef();
```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    return <input type="text" ref={this.inputRef} />;
  }
}
```
## React.forwardRef();
Can get access to dom element (not component wrapper) from react component
```javascript
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```
## <React.StrictMode>
Is like a Fragment, but detects warnings such as
> dentifying components with unsafe lifecycles
> Warning about legacy string ref API usage
> Detecting unexpected side effects
> Detecting legacy context API

```javascript
function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```

## Lifecircle

Now these methods are depreciated

> componentWillMount

> componentWillReceiveProps

> componentWillUpdate

### New lifecircles
> getDerivedStateFromProps

Generation a new state from recieved props

```javascript
static getDerivedStateFromProps(props, state) {

  if (props.id !== state.prevId) {
    return {
      externalData: null,
      prevId: props.id,
    };
  }

  // No state update necessary
  return null;
}
```

>getSnapshotBeforeUpdate

```javascript
getSnapshotBeforeUpdate(prevProps, prevState) { // return snapshot as 3rd argument in componentDidUpdate()
  if (prevProps.list.length < this.props.list.length) {
    return (
      this.listRef.scrollHeight - this.listRef.scrollTop
    );
  }
  return null;
}

componentDidUpdate(prevProps, prevState, snapshot) {
  // If we have a snapshot value, we've just added new items.
  // Adjust scroll so these new items don't push the old ones out of view.
  // (snapshot here is the value returned from getSnapshotBeforeUpdate)
  if (snapshot !== null) {
    this.listRef.scrollTop =
      this.listRef.scrollHeight - snapshot;
  }
}
```

> componentDidCatch

Catching errors

## Pointer events

(not supported in a bit part of browser)

> onPointerDown

> onPointerMove

> onPointerUp

> onPointerCancel

> onGotPointerCapture

> onLostPointerCapture

> onPointerEnter

> onPointerLeave

> onPointerOver

> onPointerOut
