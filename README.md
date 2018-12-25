# react-native-double-tap

A wrapper component for React Native which supports both double and single tap. Works on both Android and iOS.

## Installation

- `npm install --save react-native-double-tap`

## Usage

```js
export default class App extends React.Component {
  render() {
    return (
      <View>
        <DoubleClick
          singleTap={() => {
            console.log("single tap");
          }}
          doubleTap={() => {
            console.log("double tap");
          }}
          delay={200}
        >
          <Button title="Single or Double Tap" />
        </DoubleClick>
      </View>
    );
  }
}
```

## Props

| Property  | Type     | Default | Description                   |
| --------- | -------- | ------- | ----------------------------- |
| delay     | number   | 200     | Time for delay between taps   |
| singleTap | function | null    | callback for single tap event |
| doubleTap | function | null    | callback for double tap event |

## License

MIT
