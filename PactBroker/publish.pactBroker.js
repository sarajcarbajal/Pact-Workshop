const pact = require("@pact-foundation/pact-node");
const path = require("path");

let pactBrokerUrl = "http://localhost:8000";
let pactBrokerUsername = process.env.PACT_BROKER_USERNAME || "pact_workshop";
let pactBrokerPassword = process.env.PACT_BROKER_PASSWORD || "pact_workshop";

const exec = command =>
  require("child_process")
    .execSync(command)
    .toString().trim();

const opts = {
  pactFilesOrDirs: [path.resolve(__dirname, "../pacts/")],
  pactBroker: pactBrokerUrl,
  pactBrokerUsername: pactBrokerUsername,
  pactBrokerPassword: pactBrokerPassword,
  tags: ["master", "7-Protecting-provider-builds"],
  consumerVersion: exec("git rev-parse HEAD")
  // tags: [process.env.GIT_BRANCH || exec("git rev-parse --abbrev-ref HEAD")],
  // consumerVersion: process.env.GIT_COMMIT || exec("git rev-parse HEAD")
};

pact
  .publishPacts(opts)
  .then(() => {
    console.log("Pact contract publishing complete!");
    console.log("");
    console.log(`Head over to ${pactBrokerUrl} and login with`);
    console.log(`=> Username: ${pactBrokerUsername}`);
    console.log(`=> Password: ${pactBrokerPassword}`);
    console.log("to see your published contracts.");
  })
  .catch((e) => {
    console.log("Pact contract publishing failed: ", e);
  });
