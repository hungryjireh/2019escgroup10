import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByLabelText, getByText, getByTestId } from 'react-testing-library';
import ContentBot from "../components/Hero/Bot/ContentBot";
import {BotFace, BotText} from "../components/Hero/Bot/ContentBot";

afterEach(cleanup);

it("BotFace renders", () => {
    const { asFragment } = render(<BotFace />);
    expect(asFragment()).toMatchSnapshot();
});

it("BotText renders", () => {
    const { asFragment } = render(<BotText />);
    expect(asFragment()).toMatchSnapshot();
});