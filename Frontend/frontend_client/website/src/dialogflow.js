// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
"use strict";

const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
  (request, response) => {
    const agent = new WebhookClient({ request, response });
    console.log(
      "Dialogflow Request headers: " + JSON.stringify(request.headers)
    );
    console.log("Dialogflow Request body: " + JSON.stringify(request.body));

    function welcome(agent) {
      agent.add(`Welcome to my agent!`);
    }

    function fallback(agent) {
      agent.add(`I didn't understand`);
      agent.add(`I'm sorry, can you try again?`);
    }

    function escapeRegExp(str) {
      return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    }

    function replaceAll(str, find, replace) {
      return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
    }

    function enquiryWhichProduct(agent) {
      if (agent.parameters.apis.length == 1) {
        const link = replaceAll(
          agent.parameters.apis[0].toLowerCase(),
          " ",
          "-"
        );
        agent.add(
          `Here is some information about ${
            agent.parameters.apis[0]
          }:\n\n[https://beta.acnapi.io/info/${link}](https://beta.acnapi.io/info/${link})`
        );
        agent.add(
          `If you would like to contact our sales rep to discuss further, please type **'/contact'**.`
        );
      } else {
        let message = `Here are some information about the products you have requested:\n\n`;
        for (let i = 0; i < agent.parameters.apis.length; i++) {
          const link = replaceAll(
            agent.parameters.apis[i].toLowerCase(),
            " ",
            "-"
          );
          message =
            message +
            `${
              agent.parameters.apis[i]
            }: [https://beta.acnapi.io/info/${link}](https://beta.acnapi.io/info/${link})\n\n`;
        }
        agent.add(message);
        agent.add(
          `If you would like to contact our sales rep to discuss further, please type **'/contact'**.`
        );
      }
    }

    function helpWhichProduct(agent) {
      if (agent.parameters.apis.length == 1) {
        const link = replaceAll(
          agent.parameters.apis[0].toLowerCase(),
          " ",
          "-"
        );
        agent.add(
          `Here is some documentation about how to use ${
            agent.parameters.apis[0]
          }:\n\n[https://beta.acnapi.io/docs/${link}](https://beta.acnapi.io/docs/${link})`
        );
        agent.add(
          `If you need more help, please type **'/ticket'** to submit a support ticket.`
        );
      } else {
        let message = `Here are the documentation which might help you with those products:\n\n`;
        for (let i = 0; i < agent.parameters.apis.length; i++) {
          const link = replaceAll(
            agent.parameters.apis[i].toLowerCase(),
            " ",
            "-"
          );
          message =
            message +
            `${
              agent.parameters.apis[i]
            }: [https://beta.acnapi.io/docs/${link}](https://beta.acnapi.io/docs/${link})\n\n`;
        }
        agent.add(message);
        agent.add(
          `If you need more help, please type **'/ticket'** to submit a support ticket.`
        );
      }
    }

    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome);
    intentMap.set("Default Fallback Intent", fallback);
    intentMap.set("enquiry-whichproduct", enquiryWhichProduct);
    intentMap.set("help-whichproduct", helpWhichProduct);
    intentMap.set("enquiry-specific", enquiryWhichProduct);
    intentMap.set("help-specific", helpWhichProduct);
    agent.handleRequest(intentMap);
  }
);
