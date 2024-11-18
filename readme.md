# Cypress Automation

## What is it:

This repository contains a suite of automated E2E tests for the GitHub.com web-based platform, designed to validate core functionalities and ensure a reliable user experience.

## Technical Summary:

- Cypress
- JavaScript

## How to install Project:

Make sure you have installed **Git and Node.js**.

- Clone the repository URL
- Install project dependencies: `npm install`
- Install Cypress: `npm install cypress --save-dev`

## How to Run Automated Tests manualy:

- To open Cypress: `npx cypress open`
- Select _E2E Testing_
- Select _Chrome_ browser
- Click _Start E2E Testing in Chrome_
- Click _testWithPageObjects.js_ file

All automated tests will run in sequence.

## Automated Tests Cover the Following Features:

- Login
- Navigation across different pages
- CRUD operations for repositories
- CRUD operations for issues
- Filtering existing repositories/issues
