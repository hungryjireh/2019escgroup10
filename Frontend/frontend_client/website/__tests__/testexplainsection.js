import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByLabelText, getByText, getByTestId } from 'react-testing-library';
import ExplainSection from "../components/Explain/ExplainSection";
import {SectionImage, SectionNumber, SectionText} from "../components/Explain/ExplainSection";

afterEach(cleanup);

it("SectionImage renders", () => {
    const { asFragment } = render(<SectionImage />);
    expect(asFragment()).toMatchSnapshot();
});

it("SectionNumber renders", () => {
    const { asFragment } = render(<SectionNumber />);
    expect(asFragment()).toMatchSnapshot();
});

it("SectionText renders", () => {
    const { asFragment } = render(<SectionText />);
    expect(asFragment()).toMatchSnapshot();
});


test("SectionText renders with text", () => {
    const { getByText } = render(<SectionText>Hello55!</SectionText>);
    expect(getByText("Hello55!")).toBeTruthy;
});

test("SectionText renders with random input images", () => {
    const renderComponent = () => render(<SectionText><img></img></SectionText>);
    expect(renderComponent).toBeTruthy;
});

test("SectionImage does not render as it does not accept input texts", () => {
    const renderComponent = () => render(<SectionImage>throw</SectionImage>);
    expect(renderComponent).toThrowError;
});

test("SectionNumber renders with alphanum inputs", () => {
    const { getByText } = render(<SectionNumber>Hello55!</SectionNumber>);
    expect(getByText("Hello55!")).toBeTruthy;
});

test("SectionNumber renders with random input images", () => {
    const renderComponent = () => render(<SectionNumber><img></img></SectionNumber>);
    expect(renderComponent).toBeTruthy;
});