import React from "react";
import styled from "styled-components";

const FooterSection = styled.div`
  margin-left: 1rem;
`;

export const SectionHeader = styled.h3`
  color: #00bcd4;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 2.4rem;
  &::selection {
    background-color: #f9c03f;
    color: #2e2e2e;
  }

  @media (max-width: 1100px) {
    font-size: 1.6rem;
  }
`;

export const SectionList = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li`
  margin-bottom: 2rem;
`;

export const ItemLink = styled.a`
  font-size: 1.7rem;
  font-weight: 300;
  color: #a5a5af;
  &:hover {
    color: #f9c03f;
  }
  &::selection {
    background-color: #f9c03f;
    color: #2e2e2e;
  }

  @media (max-width: 1100px) {
    font-size: 1.4rem;
  }
`;

const FooterSectionComp = props => {
  const sections = props.links.map(({ link, text }) => {
    return (
      <ListItem>
        <ItemLink href={link}>{text}</ItemLink>
      </ListItem>
    );
  });

  return (
    <FooterSection>
      <SectionHeader>{props.header}</SectionHeader>
      <SectionList>{sections}</SectionList>
    </FooterSection>
  );
};

export default FooterSectionComp;
