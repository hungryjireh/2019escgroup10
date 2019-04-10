import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByLabelText, getByText, getByTestId } from 'react-testing-library';
import {ItemLink, NavBurger, NavList, ListItem} from "../components/Nav";
import Nav from "../components/Nav";

afterEach(cleanup);

it("ItemLink renders", () => {
    const { asFragment } = render(<ItemLink />);
    expect(asFragment()).toMatchSnapshot();
});

it("NavBurger renders", () => {
    const { asFragment } = render(<NavBurger />);
    expect(asFragment()).toMatchSnapshot();
});

it("ListItem renders", () => {
    const { asFragment } = render(<ListItem />);
    expect(asFragment()).toMatchSnapshot();
});

it("NavList renders", () => {
    const { asFragment } = render(<NavList />);
    expect(asFragment()).toMatchSnapshot();
});

test('assert the image link to be home link', () => {
    const { getByTestId } = render(<Nav />);
    const allAgent = getByTestId('home-logo');
    expect(getByTestId('home-logo').hasAttribute('href'));
    expect(allAgent.getAttribute('href')).toBe('https://beta.acnapi.io');
})

test('assert the first item link to be About Us link', () => {
    const { getByText, getByAltText } = render(<Nav />);
    const allAgent = document.querySelector('.nav-links').innerHTML;
    expect(allAgent).toContain('https://beta.acnapi.io/#!/#about_us');
})

test('assert the second item link to be Assets link', () => {
    const { getByText, getByAltText } = render(<Nav />);
    const allAgent = document.querySelectorAll('.nav-links')[1].innerHTML;
    expect(allAgent).toContain('https://beta.acnapi.io/#!/#assets');
})

test('assert the third item link to be Case Studies link', () => {
    const { getByText, getByAltText } = render(<Nav />);
    const allAgent = document.querySelectorAll('.nav-links')[2].innerHTML;
    expect(allAgent).toContain('https://beta.acnapi.io/#!/#case_study');
})

test('Navbar elements all present', () => {
    const { getByText, getByAltText } = render(<Nav />);
    expect(document.querySelectorAll(".nav-links").length).toBe(4);
    expect(document.querySelectorAll(".company-logo").length).toBe(1);
    expect(getByAltText("nav burger"));
})

test('calls "onClick" prop on button click of ItemLink with text', () => {
    const onClick = jest.fn();
    const { getByText } = render(<ItemLink onClick={onClick}>About Us</ItemLink>);

    fireEvent.click(getByText(/About Us/i));
    expect(onClick).toHaveBeenCalled();
});

test('calls "onClick" prop on button click of ItemLink with image', () => {
    const onClick = jest.fn();
    const { getByAltText } = render(<ItemLink><img onClick={onClick} alt="company logo"></img></ItemLink>);

    fireEvent.click(getByAltText(/company logo/i));
    expect(onClick).toHaveBeenCalled();
});

test('calls "onClick" prop on button click of NavBurger', () => {
    const onClick = jest.fn();
    const { getByAltText } = render(<NavBurger onClick={onClick} alt="nav burger" />);

    fireEvent.click(getByAltText(/nav burger/i));
    expect(onClick).toHaveBeenCalled();
});