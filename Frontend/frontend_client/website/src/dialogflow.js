// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
"use strict";

const functions = require("firebase-functions");
const { WebhookClient } = require("dialogflow-fulfillment");
const { Card, Suggestion } = require("dialogflow-fulfillment");

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
        if (link == "api-devops") {
          agent.add(
            `Here at Catalyst, we believe that developers should spend their time building new products, not on setting up infrastructure and deployment pipelines - this is why we built Automate. Automate provides stack templates comprising code repositories, frontend applications, backend microservices, as well as API gateways across many different languages and vendors. In 5 minutes, Automate spins up full-stack infrastructure with a deployment pipeline. By eliminating the need for developers to handle devops, they can focus on what they love best - building awesome products!`
          );
          agent.add(
            "To know more about API DevOps, you can refer to this link: \n\n[https://automate.acnapi.io/#!/](https://automate.acnapi.io/#!/)"
          );
        } else if (link == "chart-as-a-service") {
          agent.add(
            "Assembly based prototyping that leverages on ANCAPI backend API to integrate the data from Accenture Insights Platform and ACNAPI’s Automate tool that generates the frontend chasis template. Graphs are also created via charting library visa Charting as a service provided by Automate. This accelerates the client work by speeding up the digital delivery process."
          );
        } else if (link == "recruitment-platform") {
          agent.add(
            "TalentCloud manages the complexity of hiring technical talents for you by combining the power of API to source for new talents in your most challenging projects while also making hiring process really easy to manage in just a couple of steps."
          );
          agent.add(
            "To know more about Recruitment Platform, you can refer to this link: \n\n[https://talentcloud.acnapi.io/#!/login](https://talentcloud.acnapi.io/#!/login)"
          );
        } else if (link == "ar-car-visualizer") {
          agent.add(
            `Our AR Car Visualizer lets you browse and view cars in the virtual world, with features to get into the driver’s seat, giving you a realistic experience of the car. Other exciting features include X-ray vision, which allows you to inspect the parts of the car.`
          );
        } else if (link == "aesop") {
          agent.add(
            `Aesop is an intelligent chatbot created by us that is able to translate data into a recommended output medium to transform the way Accenture tells stories. Leverage domain knowledge, Aesop then shape the content through a recommendation engine and generate a starter deck with relevant content that you can make use up.`
          );
        } else if (link == "travel-marketplace") {
          agent.add(
            `Aesop is an intelligent chatbot created by us that is able to translate data into a recommended output medium to transform the way Accenture tells stories. Leverage domain knowledge, Aesop then shape the content through a recommendation engine and generate a starter deck with relevant content that you can make use up.`
          );
        } else if (link == "banking-lifestyle-app") {
          agent.add(
            `The bank wanted to envision their existing lifestyle app extending lifestyle services to their customers. They also wanted to include some potential integration to their existing payment methods while envisioning some new ones (e-wallet). The team applied the ACNAPI methodology to this PoC to help the bank validate this hypothesis. This is how Banking Lifestyle App was created! Banking Lifestyle App is designed based on 3 main principles. Design Thinking, Lean Start Up and Liquid Assembly. `
          );
          agent.add(
            `For more information, watch our [demo video](https://www.youtube.com/watch?v=qjg6nN6Jl4I&index=1&list=PLx1DdLrrFFkrMgPnAe0c8ZI_tM_5jE3FO)`
          );
        } else if (link == "ar-car-manual") {
          agent.add(
            `Car dealership HQ are looking to improve remote diagnostics and reducing the cost of repair by sending in the right support engineer based on more accurate diagnosis. \nWe built an AR solution to empower car owners with the ability to scan their car and teach them to fix smaller manageable problems. This will enable mechanics to narrow down the larger more complex problems faster. The connection to a backend will also open up the possibility to send the scanned diagnostics to the “experts” for better advice.`
          );
        } else if (link == "ar-gamification") {
          agent.add(
            `We created an AR theatre reservation system to simulate the future of ticket reservations. The app uses image recognition to push video advertising through an AR app via recognized movie posters that increases product visibility. Users can then choose to reserve and purchase their tickets there and then without the hassle of joining a queue at a counter or having to login online to purchase tickets.`
          );
        } else if (link == "ar-theatre") {
          agent.add(
            `Our AR Gamification mobile app lets potential customers discover deals for your products and services by collecting tokens at physical locations, increasing your visibility in a novel and cool way. Place your deals in our app, and open up a brand new channel for your products and services!`
          );
        } else if (link == "ar-menu") {
          agent.add(
            `Our Augmented Reality Menu prototype gives your diners a whole new way to experience their food before making their orders. Currently, diners cannot experience the different food items on the menu before you make your orders, and those plastic models you find outside restaurants are not the most appetizing. \nWith our Augmented Reality Menu app, scan the menu to view the food item in augmented reality. What’s more is you are able to view information about the food item and make your order, all in augmented reality.`
          );
        } else {
          agent.add(
            `Here is some information about ${
              agent.parameters.apis[0]
            }:\n\n[https://beta.acnapi.io/info/${link}](https://beta.acnapi.io/info/${link})`
          );
        }
        agent.add(
          `If you would like to contact our sales rep to discuss further or request for a demo, please type **'/contact'**.`
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
    function validateEmail(agent) {
      // get the employee ID parameter from the request header received from Dialogflow
      let email = agent.parameters.email;
      let pattern = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (email.match(pattern) !== null) {
        agent.add(`Email format is incorrect, please try agagin.`);
      } else {
        agent.add(agent.request_.body.queryResult.fulfillmentText);
      }

    }

    let intentMap = new Map();
    intentMap.set("Default Welcome Intent", welcome);
    intentMap.set("Default Fallback Intent", fallback);
    intentMap.set("enquiry-whichproduct", enquiryWhichProduct);
    intentMap.set("help-whichproduct", helpWhichProduct);
    intentMap.set("enquiry-specific", enquiryWhichProduct);
    intentMap.set("help-specific", helpWhichProduct);
    intentMap.set("Email-validation", validateEmail);
    agent.handleRequest(intentMap);
  }
);
