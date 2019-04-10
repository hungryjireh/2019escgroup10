import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByLabelText, getByText, getByTestId } from 'react-testing-library';
import Footer from "../components/Footer/Footer";
import {FooterHeader, FooterSectionWrapper} from "../components/Footer/Footer";

afterEach(cleanup);

it("FooterHeader renders", () => {
    const { asFragment } = render(<FooterHeader />);
    expect(asFragment()).toMatchSnapshot();
});

it("FooterSectionWrapper renders", () => {
    const { asFragment } = render(<FooterSectionWrapper />);
    expect(asFragment()).toMatchSnapshot();
});

test('Footer all present', () => {
    const { getByText } = render(<Footer />);
    expect(getByText("We'd love to work with you"));
    expect(getByText('Learn'));
    expect(getByText('Our Assets'));
    expect(getByText('Case Studies'));
    expect(getByText('Automate DevOps'));
    expect(getByText('Ride Platform'));
    expect(getByText('Smart Parking'));
    expect(getByText('Contact'));
    expect(getByText('Contact Us'));
    expect(getByText('Join Our Team'));
})

test("FooterHeader renders with text", () => {
    const { getByText } = render(<FooterHeader>Hello55!</FooterHeader>);
    expect(getByText("Hello55!"));
});

test("FooterHeader renders with image", () => {
    const renderComponent = () => render(<FooterHeader><img></img></FooterHeader>);
    expect(renderComponent).toBeTruthy;
});

test('Our Assets link correct', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('Our Assets').getAttribute('href')).toBe("https://beta.acnapi.io/#!/#assets");
})

test('Automate DevOps link correct', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('Automate DevOps').getAttribute('href')).toBe("http://blog.acnapi.io/2017/09/20/slow-to-code/");
})

test('Ride Platform link correct', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('Ride Platform').getAttribute('href')).toBe("http://blog.acnapi.io/2017/04/24/a-transport-gap/");
})

test('Smart Parking link correct', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('Smart Parking').getAttribute('href')).toBe("http://blog.acnapi.io/2017/09/20/the-pesky-coupon/");
})

test('Contact Us link correct', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('Contact Us').getAttribute('href')).toBe("https://beta.acnapi.io/#!/");
})

test('Join Our Team link correct', () => {
    const { getByText } = render(<Footer />);
    expect(getByText('Join Our Team').getAttribute('href')).toBe("https://talent.acnapi.io/");
})