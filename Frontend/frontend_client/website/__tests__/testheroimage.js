import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByLabelText, getByText, getByTestId } from 'react-testing-library';
import HeroImage from "../components/Hero/HeroImage";
import {HeroImageMobile, HeroImageWrapper, TextHighlight, TelegramSubtext, ImageSubtext, ImageHeader} from "../components/Hero/HeroImage";

afterEach(cleanup);

it("HeroImageMobile renders", () => {
    const { asFragment } = render(<HeroImageMobile />);
    expect(asFragment()).toMatchSnapshot();
});

it("HeroImageWrapper renders", () => {
    const { asFragment } = render(<HeroImageWrapper />);
    expect(asFragment()).toMatchSnapshot();
});

it("TextHighlight renders", () => {
    const { asFragment } = render(<TextHighlight />);
    expect(asFragment()).toMatchSnapshot();
});

it("TelegramSubtext renders", () => {
    const { asFragment } = render(<TelegramSubtext />);
    expect(asFragment()).toMatchSnapshot();
});

it("ImageSubtext renders", () => {
    const { asFragment } = render(<ImageSubtext />);
    expect(asFragment()).toMatchSnapshot();
});

it("ImageHeader renders", () => {
    const { asFragment } = render(<ImageHeader />);
    expect(asFragment()).toMatchSnapshot();
});

test("Test HeroImage Components", () => {
    const { getByAltText, getByText } = render(<HeroImage />);
    expect(getByAltText("bricks"));
    expect(getByAltText("arm"));
    expect(getByAltText("hero image robot"));
    expect(getByText("Chat"));
    expect(getByText("With Us Now."));
    expect(getByText(/Say/));
    expect(getByText("Hello"));
    expect(getByText(/to Botty!/));
    expect(getByText("Also available on:"));
    expect(getByAltText("telegram"));
});

test("Telegram Link renders", () => {
    const { getByText } = render(<HeroImage />);
    expect(getByText("Also available on:").innerHTML.includes("https://telegram.me/acnapibotty_bot")).toBeTruthy;
});