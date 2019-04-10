import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByLabelText, getByText, getByTestId } from 'react-testing-library';
import FooterSection from "../components/Footer/FooterSection";
import {SectionHeader, SectionList, ListItem, ItemLink} from "../components/Footer/FooterSection";

afterEach(cleanup);

it("SectionHeader renders", () => {
    const { asFragment } = render(<SectionHeader />);
    expect(asFragment()).toMatchSnapshot();
});

it("SectionList renders", () => {
    const { asFragment } = render(<SectionList />);
    expect(asFragment()).toMatchSnapshot();
});

it("ListItem renders", () => {
    const { asFragment } = render(<ListItem />);
    expect(asFragment()).toMatchSnapshot();
});

it("ItemLink renders", () => {
    const { asFragment } = render(<ItemLink />);
    expect(asFragment()).toMatchSnapshot();
});

test("ItemLink renders with alphanum inputs", () => {
    const { getByText } = render(<ItemLink>Hello55!</ItemLink>);
    expect(getByText("Hello55!")).toBeTruthy;
});

test("ItemLink renders with image inputs", () => {
    const renderComponent = () => render(<ItemLink><img></img></ItemLink>);
    expect(renderComponent).toBeTruthy;
});

test("SectionHeader renders with alphanum inputs", () => {
    const { getByText } = render(<SectionHeader>Hello55!</SectionHeader>);
    expect(getByText("Hello55!")).toBeTruthy;
});

test("SectionHeader renders with image inputs", () => {
    const renderComponent = () => render(<SectionHeader><img></img></SectionHeader>);
    expect(renderComponent).toBeTruthy;
});

test("SectionList renders with alphanum inputs", () => {
    const { getByText } = render(<SectionList>Hello55!</SectionList>);
    expect(getByText("Hello55!")).toBeTruthy;
});

test("SectionList renders with image inputs", () => {
    const renderComponent = () => render(<SectionList><img></img></SectionList>);
    expect(renderComponent).toBeTruthy;
});

test("ListItem renders with alphanum inputs", () => {
    const { getByText } = render(<ListItem>Hello55!</ListItem>);
    expect(getByText("Hello55!")).toBeTruthy;
});

test("ListItem renders with image inputs", () => {
    const renderComponent = () => render(<ListItem><img></img></ListItem>);
    expect(renderComponent).toBeTruthy;
});