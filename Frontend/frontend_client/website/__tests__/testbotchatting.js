import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByLabelText, getByText, getByTestId } from 'react-testing-library';
import BotChatting from "../components/Hero/Bot/BotChatting";
import {ChattingHeader, ChattingContent, ChattingForm, FormChatbox, FormButton} from "../components/Hero/Bot/BotChatting";

afterEach(cleanup);

it("ChattingHeader renders", () => {
    const { asFragment } = render(<ChattingHeader />);
    expect(asFragment()).toMatchSnapshot();
});

it("ChattingContent renders", () => {
    const { asFragment } = render(<ChattingContent />);
    expect(asFragment()).toMatchSnapshot();
});

it("ChattingForm renders", () => {
    const { asFragment } = render(<ChattingForm />);
    expect(asFragment()).toMatchSnapshot();
});

it("FormChatbox renders", () => {
    const { asFragment } = render(<FormChatbox />);
    expect(asFragment()).toMatchSnapshot();
});

it("FormButton renders", () => {
    const { asFragment } = render(<FormButton />);
    expect(asFragment()).toMatchSnapshot();
});

test("Test BotChatting Components", () => {
    const { getByAltText, getByText } = render(<BotChatting />);
    expect(getByAltText("robot face"));
    expect(document.querySelector('.chatting-content'));
    expect(document.querySelector('.chatting-form'));
    expect(document.querySelector('.form-chatbot'));
    expect(getByText('Submit'));
    expect(getByText("ACNAPI Botty"));
});

test("Form Button Clicking", () => {
    const onClick = jest.fn();
    const { getByText } = render(<FormButton onClick={onClick}>Submit</FormButton>);
    fireEvent.click(getByText('Submit'));
    expect(onClick).toHaveBeenCalled();
});

test("FormChatbox Rendering with alphanum", () => {
    const { getByText } = render(<FormChatbox>Hello555!</FormChatbox>);
    expect(getByText('Hello555!'));
});

test("FormChatbox Rendering with image", () => {
    const renderComponent = () => render(<FormChatbox><img></img></FormChatbox>);
    expect(renderComponent);
});

test("ChattingHeader Rendering with alphanum", () => {
    const { getByText } = render(<ChattingHeader>Hello555!</ChattingHeader>);
    expect(getByText('Hello555!'));
});

test("ChattingHeader Rendering with image", () => {
    const renderComponent = () => render(<ChattingHeader><img></img></ChattingHeader>);
    expect(renderComponent);
});

test("ChattingForm Rendering with alphanum", () => {
    const { getByText } = render(<ChattingForm>Hello555!</ChattingForm>);
    expect(getByText('Hello555!'));
});

test("ChattingForm Rendering with image", () => {
    const renderComponent = () => render(<ChattingForm><img></img></ChattingForm>);
    expect(renderComponent);
});

test("ChattingContent Rendering with alphanum", () => {
    const { getByText } = render(<ChattingContent>Hello555!</ChattingContent>);
    expect(getByText('Hello555!'));
});

test("ChattingContent Rendering with image", () => {
    const renderComponent = () => render(<ChattingContent><img></img></ChattingContent>);
    expect(renderComponent);
});