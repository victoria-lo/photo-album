import React from "react";
import App from "./App";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<App />);
});

it("renders correctly", () => {
  const rendered = renderer.create(<App />);
  expect(rendered.toJSON()).toMatchSnapshot();
});
