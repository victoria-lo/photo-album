import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(<App />);
});

it("renders Account header", () => {
  const wrapper = shallow(<App />);
  const welcome = (
    <h1>
      Welcome to Photo Album. This is a tutorial for Firebase Cloud Storage and
      Authentication. Still in Progress.
    </h1>
  );
  expect(wrapper.contains(welcome)).toEqual(false);
});
