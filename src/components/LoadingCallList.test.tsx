import React from "react";
import { render } from "@testing-library/react";
import LoadingCallList from "./LoadingCallList";

test("Should render exact number of skeleton", () => {
  const callNumber = 42;
  const { container } = render(
    <LoadingCallList callNumber={callNumber}></LoadingCallList>
  );

  // +1 we have a small skeleton for the date
  expect(container.firstChild?.childNodes.length).toEqual(callNumber + 1);
});
