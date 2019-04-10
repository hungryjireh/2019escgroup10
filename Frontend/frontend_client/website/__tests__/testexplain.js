import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByLabelText, getByText, getByTestId } from 'react-testing-library';
import Explain from "../components/Explain/Explain";
import {ExplainHeader, ExplainSectionWrapper} from "../components/Explain/Explain";

afterEach(cleanup);

it("ExplainHeader renders", () => {
    const { asFragment } = render(<ExplainHeader />);
    expect(asFragment()).toMatchSnapshot();
});

it("ExplainSectionWrapper renders", () => {
    const { asFragment } = render(<ExplainSectionWrapper />);
    expect(asFragment()).toMatchSnapshot();
});

it("ExplainHeader renders with text", () => {
    const { getByText } = render(<ExplainHeader>Hello!</ExplainHeader>);
    expect(getByText("Hello!")).toBeTruthy;
});

it("Correct Values in Explain module", () => {
    const { getByText, getByAltText } = render(<Explain />);
    expect(getByText("How Does it Work?")).toBeTruthy;
    expect(getByText("Having trouble with an API, want to try out our products, or maybe you just want to chat? Fret not, Botty is here to help!")).toBeTruthy;
    expect(getByText("Your issues not resolved by Botty? Don't worry, you can send a ticket to one of our human administrators via Botty!")).toBeTruthy;
    expect(getByText("We will get back to your ticket as efficiently and professionally as possible. It's a promise from us! Yay, problem solved!")).toBeTruthy;
});

