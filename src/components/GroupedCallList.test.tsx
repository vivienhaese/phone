import React from "react";
import { render, screen } from "@testing-library/react";
import GroupedCallList from "./GroupedCallList";
import { Call } from "../model/models";
import { SelectedCalls } from "../pages/Home";
import { BrowserRouter } from "react-router-dom";

// Mock router
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
  useRouteMatch: () => ({ path: "/call" }),
}));

const callA: Call = {
  call_type: "answered",
  created_at: "2021-10-28T22:26:27.783Z",
  direction: "inbound",
  from: "+33174834291",
  id: "e0ec4e5d-9672-49bb-b41b-7a9b209743e9",
  is_archived: false,
  notes: [],
  to: "+33197060260",
  duration: 100,
  via: "via",
};
const callB: Call = {
  ...callA,
  created_at: "2021-10-29T22:26:27.783Z",
};
const callC: Call = {
  ...callA,
  created_at: "2021-10-29T22:26:27.783Z",
};
const callD: Call = {
  ...callA,
  created_at: "2021-10-30T22:26:27.783Z",
};

test("Should display grouped dates", () => {
  const calls: Call[] = [callA, callB, callC, callD];

  const { container } = render(
    <BrowserRouter>
      <GroupedCallList
        calls={calls}
        selectedCalls={{} as SelectedCalls}
        isSelectionActive={false}
        onCallSelected={() => {}}
      ></GroupedCallList>
    </BrowserRouter>
  );

  // Carrefull, in hour cas, the local string displays french dates format
  // todo: force locale in jest
  const dateA = screen.getByText("28/10/2021");
  expect(dateA).toBeInTheDocument();
  const dateB = screen.getByText("29/10/2021");
  expect(dateB).toBeInTheDocument();
  const dateC = screen.getByText("30/10/2021");
  expect(dateC).toBeInTheDocument();
});

test("Should display calls under dates", () => {
  const calls: Call[] = [callA, callB, callC, callD];

  render(
    <BrowserRouter>
      <GroupedCallList
        calls={calls}
        selectedCalls={{} as SelectedCalls}
        isSelectionActive={false}
        onCallSelected={() => {}}
      ></GroupedCallList>
    </BrowserRouter>
  );

  const dateA = screen.getByText("28/10/2021");
  expect(dateA.nextElementSibling?.children.length).toEqual(1);

  const dateB = screen.getByText("29/10/2021");
  expect(dateB.nextElementSibling?.children.length).toEqual(2);
});

test("Should display checkbox when selection mode is active", () => {
  const calls: Call[] = [callA, callB, callC, callD];

  const { container } = render(
    <BrowserRouter>
      <GroupedCallList
        calls={calls}
        selectedCalls={{}}
        isSelectionActive={true}
        onCallSelected={() => {}}
      ></GroupedCallList>
    </BrowserRouter>
  );

  const checkbox = container.querySelector(`#selectCallCheckbox_${callA.id}`);
  expect(checkbox).not.toBeNull();
});
