#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

const spawn = child_process.spawn;

let cwd = process.cwd();

let args = process.argv.splice(2);
if (args == undefined) {
  throw new Error("No file is provided.");
}

let fileName = args[0];

let extention = path.extname(fileName);

let fileNameExtentionRemoved = path.basename(fileName, path.extname(fileName));

function Cwd_(pth) {
  return path.join(cwd, pth);
}

let fileValue = fs.readFileSync(fileName).toString();

function reverse(s) {
  return [...s].reverse().join("");
}

let reversed = reverse(fileValue);
let finalFileName =
  fileNameExtentionRemoved + "." + reverse(extention.replace(".", ""));
let newFileLocation = Cwd_(finalFileName);

fs.writeFileSync(newFileLocation, reversed);
const runningNodeFile = spawn("node", [`${newFileLocation}`], {
  cwd,
});

runningNodeFile.stdout.on("data", (data) => {
  data = data.toString();
  console.log(data);
});

runningNodeFile.stderr.on("data", (data) => {
  data = data.toString();
  console.error(data);
});

runningNodeFile.on("close", (code) => {
  code = code.toString();
  console.log(`Process exited with code ${code}`);
});

// fs.unlinkSync(newFileLocation);
