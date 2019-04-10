import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByLabelText, getByText, getByTestId } from 'react-testing-library';
import Bot from "../components/Hero/Bot/Bot";

afterEach(cleanup);

test("Bot initialization response", () => {
    const { getByText } = render(<Bot/>);
    expect(getByText("Hello! My name is Botty. How may I help you today?"));
    expect(getByText(/For a list of shortcuts, type/));
    expect(getByText(/shortcuts/));
    expect(getByText(/!/));
});