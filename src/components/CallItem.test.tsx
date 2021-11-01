import React from "react";
import { render, screen } from "@testing-library/react";
import CallItem, { ARCHIVED_OPACITY } from "./CallItem";
import { Call } from "../model/models";

const call: Call = {
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

const archivedCall: Call = {
  ...call,
  is_archived: true,
};

test("Should render phone number", () => {
  render(<CallItem call={call}></CallItem>);
  const phoneNumber = screen.getByText("+33174834291");
  expect(phoneNumber).toBeInTheDocument();
});

test("Should render call time", () => {
  render(<CallItem call={call}></CallItem>);
  const time = screen.getByText("00:26:27");
  expect(time).toBeInTheDocument();
});

test("Should render with transparency when archived", () => {
  const { container } = render(<CallItem call={archivedCall}></CallItem>);
  expect(container.firstChild).toHaveClass("call-item");
  expect(container.firstChild).toHaveStyle(`opacity: ${ARCHIVED_OPACITY}`);
});

test("Should render without transparency when NOT archived", () => {
  const { container } = render(<CallItem call={call}></CallItem>);
  expect(container.firstChild).toHaveClass("call-item");
  expect(container.firstChild).toHaveStyle(`opacity: 1`);
});
