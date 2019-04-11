import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByLabelText, getByText, getByTestId } from 'react-testing-library';
import BotStart from "../components/Hero/Bot/BotStart";
import {BlueHead, BotImage, BotFormOne, BotFormTwo, BotButton} from "../components/Hero/Bot/BotStart";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup);

it("BlueHead renders", () => {
    const { asFragment } = render(<BlueHead />);
    expect(asFragment()).toMatchSnapshot();
});

it("BotImage renders", () => {
    const { asFragment } = render(<BotImage />);
    expect(asFragment()).toMatchSnapshot();
});

it("BotFormOne renders", () => {
    const { asFragment } = render(<BotFormOne />);
    expect(asFragment()).toMatchSnapshot();
});

it("BotFormTwo renders", () => {
    const { asFragment } = render(<BotFormTwo />);
    expect(asFragment()).toMatchSnapshot();
});

test("BotButton Components", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <BotButton to="/botchatting"/>
        </BrowserRouter>,
    div
    );
    ReactDOM.unmountComponentAtNode(div);
});

test("BotStart renders", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <BrowserRouter>
            <BotStart />
        </BrowserRouter>,
    div
    );
    ReactDOM.unmountComponentAtNode(div);
});
