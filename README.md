# Stage 1 Backend - Number Classification API

This project implements a RESTful API that classifies numbers and returns interesting mathematical properties along with a fun fact.

## Table of Contents

- [Introduction](#introduction)
- [Requirements](#requirements)
- [API Specification](#api-specification)
- [Implementation](#implementation)
- [Deployment](#deployment)
- [Testing](#testing)
- [Submission](#submission)

## Introduction

This API takes an integer as input and returns various mathematical properties of that number, including whether it's prime, perfect, or an Armstrong number, the sum of its digits, and a fun fact retrieved from the Numbers API.

## Requirements

### Technology Stack

- Node.js with Express.js (or any language/framework of your choice)

### General Requirements

- Deployed to a publicly accessible endpoint.
- CORS (Cross-Origin Resource Sharing) must be handled.
- Responses must be in JSON format.
- Code must be hosted on a public GitHub repository.
- A well-structured `README.md` file is required.

## API Specification

### Endpoint

`GET <your-domain.com>/api/classify-number?number=371`

## Setup Instructions

1. Clone the repository: `git clone https://github.com/Tez-cyber/HNG_12-stage1`
2. Navigate to the project directory: `cd your-repo`
3. Install dependencies: `npm install`
4. Start the server: `npm start`

### Required JSON Response Format (200 OK)

```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}