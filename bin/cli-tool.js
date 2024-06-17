#!/usr/bin/env node

const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const https = require("https");

const repoBaseUrl =
  "https://raw.githubusercontent.com/yourusername/yourrepo/main/src/components/";

function downloadComponent(component, dest) {
  const url = `${repoBaseUrl}${component}`;
  const filePath = path.resolve(dest, component);

  https
    .get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filePath);
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          console.log(`Downloaded ${component}`);
        });
      } else {
        console.error(
          `Failed to download ${component}: ${response.statusCode}`
        );
      }
    })
    .on("error", (err) => {
      console.error(`Error: ${err.message}`);
    });
}

function downloadComponents(components, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  components.forEach((component) => {
    downloadComponent(component, dest);
  });
}

function main() {
  const args = process.argv.slice(2);
  const dest = path.resolve(process.cwd(), "src/components");

  if (args.length === 0) {
    console.error("Please specify the components to download.");
    process.exit(1);
  }

  downloadComponents(args, dest);
}

main();
