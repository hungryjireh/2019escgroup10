import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByLabelText, getByText, getByTestId } from 'react-testing-library';
import {ItemHeader, ItemNum} from "../components/OverviewItem";
import OverviewItem from "../components/OverviewItem";

afterEach(cleanup);

it("ItemHeader renders", () => {
    const { asFragment } = render(<ItemHeader />);
    expect(asFragment()).toMatchSnapshot();
});

it("ItemNum renders", () => {
    const { asFragment } = render(<ItemNum />);
    expect(asFragment()).toMatchSnapshot();
});

test('ItemNum contains alphanum text', () => {
    const { getByText } = render(<ItemNum>5A</ItemNum>);
    expect(getByText("5A"));
})

test('ItemNum accepts image tags', () => {
    const { getByText } = render(<ItemNum><img></img></ItemNum>);
    expect(document.querySelector("img"));
})

test('ItemHeader contains alphanum text', () => {
    const { getByText } = render(<ItemHeader>5A</ItemHeader>);
    expect(getByText("5A"));
})

test('ItemHeader accepts image tags', () => {
    const { getByText } = render(<ItemHeader><img></img></ItemHeader>);
    expect(document.querySelector("img"));
})

test('OverviewItem contains correct child elements', () => {
    const { getByText } = render(<OverviewItem />);
    expect(document.querySelector("ItemNum"));
    expect(document.querySelector("ItemHeader"));
})