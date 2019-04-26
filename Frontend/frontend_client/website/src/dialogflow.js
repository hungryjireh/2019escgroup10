// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
"use strict";

const functions = require("firebase-functions");
const {
  WebhookClient
} = require("dialogflow-fulfillmeant");
const {
  Card,
  Suggestion
} = require("dialogflow-fulfillment");

process.env.DEBUG = "dialogflow:debug"; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(
  (request, response) => {
    const agent = new WebhookClient({
      request,
      response
    });
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
        } else if (link == "ai-wealth-manager") {
          agent.add(
            `The objective of wealth management chatbot is to create a chatbot on Amazon Echo/Alexa to interface with Open Banking APIs and enable users to manage their wealth on-demand via a voice agent. The chatbot is able to manage their risk profile, portfolio, make purchases as well as provide them with an analysis report for a requested company.`
          );
        } else if (link == "digital-butler") {
          agent.add(
            `Alfred is your digital butler on Slack who is able to interface with Trello automatically. Simply speak to Alfred and let him create best practice Trello cards for you with ease.`
          );
        } else if (link == "ar-menu") {
          agent.add(
            `Our Augmented Reality Menu prototype gives your diners a whole new way to experience their food before making their orders. Currently, diners cannot experience the different food items on the menu before you make your orders, and those plastic models you find outside restaurants are not the most appetizing. \nWith our Augmented Reality Menu app, scan the menu to view the food item in augmented reality. What’s more is you are able to view information about the food item and make your order, all in augmented reality.`
          );
        } else if (link == "video-analytics") {
          agent.add(
            `Prism provides you with an opportunity to practice your presentations with the help of AI, giving you multi-dimensional analysis of your performance. This allows you to fine-tune specific areas of your presentations to obtain the best results.`
          );
          agent.add(
            `To know more about Prism, you can refer to this link: [https://prism.acnapi.io/](https://prism.acnapi.io/)`
          );
        } else if (link == "sentiments-analysisu") {
          agent.add(
            `With our Sentiments Analysis platform, your business is well-equipped to deal with the fallout from public relations crisis as you will be better able to gauge how your customers are reacting to unfolding events, and whether your crisis management strategies are effective. Likewise, you will be better able to gauge the effectiveness of your public relations efforts over time. Being able to gauge the effectiveness of your public relations helps you to measure the return on investment of your public relations spend, which currently can be quite opaque.`
          );
          agent.add(
            `To know more about Sentiments Analysis platform, you can refer to this link: [http://sentiments2.acnapi.io/](http://sentiments2.acnapi.io/)`
          );
        } else if (link == "acnapi-mfa-login") {
          agent.add(
            `ACNAPI MFA Platform allows you to quickly intergrate with Accenture ESO in a plug and play manner. We have an array of best practice frontend templates and mobile native SDKs fo you to choose from. In addition, through ACNAPI RBAC and MFA Identity Federation, you canhave precise control over who can access your application by incorporating it to our SDK to reduce your implementation and development effort.`
          );
        } else if (link == "ticketing-platform") {
          agent.add(
            `We know that paper tickets can be a hassle for the tourist. Having to deal with collection, payment and ensuring things do not get lost are matters nobody wants to be bogged down by. We know what they want, and it was never just about the tickets.`
          );
          agent.add(
            `To know more about Ticketing Platform, you can refer to this link: [http://ticketing.acnapi.io](http://ticketing.acnapi.io)`
          );
        } else if (link == "smart-lock") {
          agent.add(
            `Smart Lock is developed with IoT technology and can be controlled by a mobile app. A central management dashboard provides analytics of usage data, which can be the basis for decisions such as deployment of more bicycles in a certain region.`
          );
          agent.add(
            `To know more about Smart Lock, you can refer to this link: [https://smartlock.acnapi.io](https://smartlock.acnapi.io)`
          );
        } else if (link == "smart-home") {
          agent.add(
            `SenseLights is a smart home prototype which controls the light warmth at home automatically based on environmental factors such as temperature and humidity.`
          );
        } else if (link == "smart-parking") {
          agent.add(
            `Smart Parking eliminates the hassles of parking coupons with a mobile app and QR code at each parking lot. After signing in and scanning the QR code at the parking lot, you are then shown the rate per minute for the lot. If you are agreeable, just start parking. When you are ready to leave, just un-park and make payment in the app.`
          );
          agent.add(
            `To know more about Smart Parking, you can refer to this [link](http://blog.acnapi.io/2017/09/20/the-pesky-coupon/)`
          );
        } else if (link == "smart-restaurant") {
          agent.add(
            `Conceptualizing the smart restaurant was borne out of the everyday office goer's need to relax after a hard day's work in a restaurant or pub. They have been "fighting" wars all day long and they want to feel a simple sense of relaxation through good service and good food. What we envisioned was to create such an experience with no boundaries on the technologies we could use, and that's exactly what we ended up doing.`
          );
          agent.add(
            `To know more about smart restaurant, you can refer to this link: http://restaurant.acnapi.io`
          );
        } else if (link == "queuing-system") {
          agent.add(
            `Chomp aims to remove the need for customers to wait in line by introducing a community-based application which allows customers to order at their own convenience, thereby improving the meal experience for the customer. With the help of analytics, it enables food vendors to estimate the demand for their product, and can therefore make decisions to improve their businesses, such as employing additional help at peak periods.`
          );
        } else if (link == "iot-led-walle") {
          agent.add(
            `The objective of IoT LED wall is to create an IOT LED Wall to demonstrate the feasibility of using an Arduino device to receive IOT commands over the internet and trigger the LED Wall to show a given message. This asset can be customized to work with any other IOT device that we can publish a command to.`
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