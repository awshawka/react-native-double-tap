const React = require("react");
const ReactTestRenderer = require("react-test-renderer");
const DoubleTap = require("../index");

describe("DoubleTap", () => {
  test("it renders without crashing", () => {
    const instance = ReactTestRenderer.create();
    expect(instance.toJSON()).toMatchSnapshot();
  });
});
