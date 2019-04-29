import React, { useState, useEffect } from "react";
import styled from "styled-components";

import MagicHero from "./MagicHero";
import MagicConvo from "./MagicConvo";
import MagicNav from "./MagicNav";
import history from "../history";
import { db } from "../firebase";

const MagicLink = styled.div`
  background-color: #f9c03f;
  padding: 8rem 16rem;
`;
const MagicLinkWrapper = styled.div`
  background: #f2f2f2;
  // border: 1px solid red;
  width: 100%;
  // height: 100%;
`;

const MagicLinkComp = () => {
  const [ticket, setTicket] = useState({});
  useEffect(() => {
    var link = "";
    link = history.location.pathname.slice(7);

    console.log(history.location.pathname.slice(7));
    db.doc(`tickets/${link}`).onSnapshot(snapshot => {
      setTicket({
        ...snapshot.data(),
        id: snapshot.id
      });
    });
  }, []);

  return (
    <MagicLink>
      <MagicLinkWrapper>
        <MagicNav />
        <MagicHero ticket={ticket} />
        <MagicConvo ticket={ticket} />
      </MagicLinkWrapper>
      <div style={{ color: "#999999", marginTop: "4rem", textAlign: "center" }}>
        <span>© ACNAPI 2019</span>
      </div>
    </MagicLink>
  );
};

export default MagicLinkComp;
