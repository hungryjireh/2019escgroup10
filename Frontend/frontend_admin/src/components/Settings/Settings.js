import React from "react";
import styled from "styled-components";

import DefaultsSection from "./DefaultsSection";
import UpdatesSection from "./UpdatesSection";
import useLockBodyScroll from "../../Hooks/useLockBodyScroll.js";

const Settings = styled.div`
  position: fixed;
  background: white;
  width: 60vw;
  height: 90vh;
  left: 20%;
  top: 5%;
  z-index: 5;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 4rem 4rem 4rem 6rem;
`;

const SettingsContent = styled.div`
  height: 100%;
  overflow: scroll;
  padding-right: 2rem;
`;

const Blacken = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  z-index: 4;
`;

const SettingsTitle = styled.h1`
  font-size: 32px;
  font-weight: 400;
  color: #334e68;
  margin-bottom: 4rem;

  & > span {
    float: right;
    font-size: 3.4rem;
    color: #334e68;
    right: 3.4rem;
    top: 1.8rem;
    cursor: pointer;
  }
`;

const SettingsSection = styled.div`
  margin-bottom: 4rem;
`;

const SectionTitle = styled.h2`
  color: #abc1d5;
  text-transform: uppercase;
  border-bottom: 0.5px solid #abc1d5;
  padding-bottom: 0.6rem;
  font-weight: 100;
  margin-bottom: 4rem;
`;

const SettingsComp = ({ user, setHasSettingsFalse }) => {
  useLockBodyScroll();
  return (
    <div>
      <Blacken onClick={setHasSettingsFalse} />
      <Settings>
        <SettingsContent>
          <SettingsTitle>
            Settings
            <span onClick={setHasSettingsFalse}>&#10006;</span>
          </SettingsTitle>
          <SettingsSection>
            <SectionTitle>Tickets Panel</SectionTitle>
            <DefaultsSection user={user} />
          </SettingsSection>
          <SettingsSection>
            <SectionTitle>Updates</SectionTitle>
            <UpdatesSection user={user} />
          </SettingsSection>
        </SettingsContent>
      </Settings>
    </div>
  );
};

export default SettingsComp;
