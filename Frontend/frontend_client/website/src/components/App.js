import React, { useEffect } from "react";
import Main from "./Main";
import axios from "axios";

const App = () => {
  //   useEffect(() => {
  //     axios
  //       .post("http://localhost:5000/api/df_text_query", {
  //         // text: "I want to find out more about your apis"
  //         //   text: "smart restaurant"
  //         // text: "I would like to contact a sales rep"
  //         // text: "Lim Kay Hian"
  //         text: "kayhian@rocketmail.com.sg"
  //       })
  //       .then(response => {
  //         console.log(response.data.fulfillmentMessages[0].text.text[0]);
  //         // console.log(response.data.fulfillmentMessages[1].text.text[0]);
  //         // console.log(response.data);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }, []);

  return <Main />;
};

export default App;
