import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByLabelText, getByText, getByTestId } from 'react-testing-library';
import ContentClient from "../components/Hero/Bot/ContentClient";
import {ClientFace, ClientText} from "../components/Hero/Bot/ContentClient";

afterEach(cleanup);

it("ClientFace renders", () => {
    const { asFragment } = render(<ClientFace />);
    expect(asFragment()).toMatchSnapshot();
});

it("ClientText renders", () => {
    const { asFragment } = render(<ClientText />);
    expect(asFragment()).toMatchSnapshot();
});