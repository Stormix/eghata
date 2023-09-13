 # Eghata - Moroccan Volunteer  Platform

![./docs/architecture.png](./docs/architecture.png)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [About](#about)

## Overview

This project is a monorepo containing the source code and documentation for the Eghata plateform. This platform is designed to connect volunteers and individuals in need of assistance across Morocco.

## Features

- **Listing of "Need Help Requests"**: 
  - Categorized requests and offers (Rescue, Medical Assistance, etc.).
  - Location, description, status, contact information, and more.
- **Information Resources**:
  - Access to blood donation centers, food banks, hospitals, and associations.
- **Real-time Updates**:
  - Live updates on request statuses and user interactions.
- **Mapping and Location Services**:
  - Integration with mapping services for geolocation and address validation.
- **Search and Filtering**:
  - Efficient request/offer search and filtering options.
- **Internationalization (i18n)**:
  - Support for multiple languages and regions.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node [v18.x.x](https://nodejs.org/en/download/)

### Installation

1. Clone the repository:

  ```bash
    git clone https://github.com/The-Embassy-Collective/eghata
    cd eghata
  ```

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs` applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
pnpm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd my-turborepo
pnpm dev
```


## Contributing
Contributions are welcome! To contribute to this project, follow these steps:

Fork this repository.
- Create a branch: `git checkout -b feature/your-feature-name`
- Commit your changes: `git commit -m 'Add some feature'`
- Push to the branch: `git push origin feature/your-feature-name`
- Create a pull request.
Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for more details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).



# About Eghata

## Project Overview:

A Moroccan volunteer connection platform and an extension/enhancement of the existing Nt3awnou نتعاونو platform, dedicated to aiding individuals impacted by various crises, including the recent earthquake in Morocco. Building upon the core mission of streamlining and coordinating timely assistance, our goal is to expand the platform's capabilities, making it a versatile hub for connecting volunteers and people in need of help throughout Morocco.

For reference:

- https://nt3awnou-nt3awnou-rescue-map--jdhkn.hf.space/
- https://tawari2.org/index.php
- https://www.maroc-solidarite.com/


## Key Features and Components:

### 1. Listing of "Need Help Requests"
   - **Request or Offer Type:** Users can specify whether they are requesting assistance or offering help. The platform accommodates various categories, including:
     - Rescue
     - Medical Assistance
     - Shelter
     - Food & Water
     - Danger (emergency situations)
     - Carpooling (with options for volume and capacity)
   - **Location / Address:** Requesters can pinpoint their location or provide an address to help volunteers locate them.
   - **Description:** Users can provide additional details about their specific needs or offers, giving context to their requests or offers.
   - **Status:** Indicates the current status of the request or offer (e.g., pending, in progress, completed).
   - **Contact Info:** Requesters and volunteers can exchange contact information to coordinate assistance.
   - **Start Date (Carpooling Only):** For carpooling requests, the start date is specified to plan transportation efficiently.
   - **End Date / Deadline (Carpooling Only):** Carpooling requests may have a deadline for when the assistance is needed.

### 2. Info

   - **Blood Donation Centers:** The platform provides information on local blood donation centers, making it easier for users to find places to donate blood.
   - **Food Banks:** Users can access details about nearby food banks, helping those in need find food resources.
   - **Hospitals:** Information about hospitals, including locations and contact details, is available for users who require medical assistance or want to volunteer in healthcare.
   - **Associations:** This section features information on various volunteer associations and organizations where users can join or collaborate for community support.



## Layouts

### Home Screen

- [App Logo]  
- [Navigation Menu]  
- [Search Bar]  
- Recent "Need Help Requests" list:
  - [Request Title]
  - [Request Description]
  - ...
- [Filter Options]
- [Create Request/Offer Button]

### Request/Offer Detail Screen

- [Back Button]  
- [Request/Offer Type]  
- [Location]  
- [Description]  
- [Status]  
- [Contact User]  
- [Offer Assistance]  

### Create Request/Offer Screen

- [Request/Offer Type Dropdown]  
- [Location Input/Map]  
- [Description Text Area]  
- [Status (if request)]  
- [Start Date (if carpooling)]  
- [End Date (if carpooling)]  
- [Submit Button]  

### Map View Screen

- [Map with Markers]  
- [Filter Options]  
- [Switch to List View Button]  

### List View Screen

- [List of Requests/Offers]  
  - [Request/Offer Title]  
  - [Request/Offer Description]  
  - ...
- [Filter/Categories]  
- [Switch to Map View Button]  


### Information Screens

- List of Organizations/Centers:  
  - [Organization Name]  
  - [Contact Information]  
  - ...
- [Get Directions/Contact Button]  


## Resources
- Flows: [https://www.figma.com/file/PYlNkCAAsNyiKlG1ZUFm8J/nt3awnou-userflow?type=whiteboard&node-id=0%3A1&t=eYklXE40vfVrRvOq-1](https://www.figma.com/file/PYlNkCAAsNyiKlG1ZUFm8J/nt3awnou-userflow?type=whiteboard&node-id=0%3A1&t=eYklXE40vfVrRvOq-1 "https://www.figma.com/file/PYlNkCAAsNyiKlG1ZUFm8J/nt3awnou-userflow?type=whiteboard&node-id=0%3A1&t=eYklXE40vfVrRvOq-1")

- Wireframe: https://www.figma.com/file/JM6gStruX3ltmkcx5Iuj2z/eghata?type=design&node-id=0%3A1&mode=design&t=qaVnkRPDE78XTJTh-1


## Features Dump
- 
