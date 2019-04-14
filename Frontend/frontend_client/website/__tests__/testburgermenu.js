import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByLabelText, getByText, getByTestId } from 'react-testing-library';
import BurgerMenu from "../components/BurgerMenu";
import {BurgerLink, Darken} from "../components/BurgerMenu";

afterEach(cleanup);

it("BurgerLink renders", () => {
    const { asFragment } = render(<BurgerLink />);
    expect(asFragment()).toMatchSnapshot();
});

test('Navbar elements all present', () => {
    const { getByText, getByAltText } = render(<BurgerMenu />);
    expect(getByText('Home'));
    expect(getByText('About Us'));
    expect(getByText('Case Studies'));
    expect(getByText('Our Assets'));
    expect(getByText('Contact Us'));
})

test('assert Home to be home link', () => {
    const { getByText } = render(<BurgerMenu />);
    expect(getByText('Home').getAttribute('href')).toContain('https://beta.acnapi.io');
})

test('assert About Us to be About Us link', () => {
    const { getByText } = render(<BurgerMenu />);
    expect(getByText('About Us').getAttribute('href')).toContain('https://beta.acnapi.io/#!/#about_us');
})

test('assert Our Assets to be Our Assets link', () => {
    const { getByText } = render(<BurgerMenu />);
    expect(getByText('Our Assets').getAttribute('href')).toContain('https://beta.acnapi.io/#!/#assets');
})

test('assert Case Studies to be Case Studies link', () => {
    const { getByText } = render(<BurgerMenu />);
    expect(getByText('Case Studies').getAttribute('href')).toContain('https://beta.acnapi.io/#!/#case_study');
})

test('calls "onClick" prop on button click of Darken', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<Darken onClick={onClick} className="darken animation" data-testid="darken-animation"/>);

    fireEvent.click(getByTestId(/darken-animation/i));
    expect(onClick).toHaveBeenCalled();
});