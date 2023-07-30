# Modus ETP Node Js Developer Assessment

An assessment to be completed to move ahead in the hiring process

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contact](#contact)

## Getting Started

### Prerequisites

- Tools/Softwares required, such as Node.js, npm, code studio etc.

### Installation

1. Clone the repo https://github.com/palash-cj/Modus-ETP-Assessment.git
2. Move to the cloned directory then to "Assessment-Backend"
3. Install all the dependencies
```bash
npm install
```

## Usage

1. To start the server, use this command
```bash
npm start
```
2. To start the development, use this command
```bash
npm run dev
```

## API Endpoints

1. To get all the records of the csv file, 
- GET /file
- Request: none
2. To add new record in the csv file,
- POST /file
- Request: name, age, occupation, city
3. To get the particular record,
- GET /file/:id
- Request: none
4. To update the particular record,
-   PUT /file/:id
-   Request: name, age, occupation, city
5. To delete the particular record,
-   DELETE /file/:id
-   Request: none

## Testing

- To run the automated testing, use this command
```bash
npm test
```

## Contact

- Palash Jamaiwar
- palashjemi@gmail.com
- +91 8975021396