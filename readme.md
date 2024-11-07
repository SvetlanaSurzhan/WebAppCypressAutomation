# Cypress Automation

## What is it:

This repository contains a suite of automated tests for the GitHub.com platform, designed to validate core functionalities and ensure a reliable user experience.

## Technical Summary:

- Cypress
- JavaScript

## How to install Project:

Make sure you have installed **Git and Node.js**.

- Clone the repository URL
- Install project dependencies: `npm install`
- Install Cypress: `npm install cypress --save-dev`

## How to Run Automated Tests manualy:

- To open Cypress - run command: "npx cypress open"
- Select `E2E Testing`
- Select `Chrome` browser
- Click `Start E2E Testing in Chrome`
- Click `testWithPageObjects.js` file

All automated tests will run in sequence.

## Automated Tests Cover the Following Features:

- Login
- Navigation across different pages
- CRUD operations for repositories
- CRUD operations for issues
- Filtering existing repositories/issues
