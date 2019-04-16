import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByLabelText, getByText, getByTestId } from 'react-testing-library';
import {SectionHeader} from "../components/OverviewSection";
import OverviewSection from "../components/OverviewSection";

//UpdateItem.js
// import UpdateItem from "../components/UpdateItem";
// import {ItemMain, ItemInfo, ItemSub} from "../components/UpdateItem";

//UpdateList.js
// import {ListHeader, HeaderTitle, HeaderButton, HeaderPopup, ListContent} from "../components/UpdateList";
// import UpdateListComp from "../components/UpdateList";

afterEach(cleanup);

it("SectionHeader renders", () => {
    const { asFragment } = render(<SectionHeader />);
    expect(asFragment()).toMatchSnapshot();
});

test('SectionHeader renders with text', () => {
    const { getByText } = render(<SectionHeader>LOOK@!</SectionHeader>);
    expect(getByText("LOOK@!"));
})
