# Rent-a-Car Project

Welcome to the Rent-a-Car project! This application allows clients to view and hire vehicles, while merchants can add their vehicles for hire. The project is built using AWS Amplify, utilizing DynamoDB for storing vehicle entries, API Gateway for managing APIs, Cognito User Pool for user authentication, Lambda functions for serverless computing, and an S3 bucket for storing images.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [License](#license)

## Introduction

The Rent-a-Car project provides a platform for both clients and merchants in the car rental industry. Clients can register, log in, and browse available vehicles for hire. Merchants, on the other hand, can register, log in, and add vehicles to the platform, including vehicle details and images.

## Features

### Client Features:

- User registration and login
- View available vehicles for hire
- User-friendly interface for easy navigation
- Secure authentication through Cognito User Pool

### Merchant Features:

- User registration and login
- Add vehicles for hire, including details and images
- Manage vehicle entries
- Secure authentication through Cognito User Pool

## Technologies Used

- **AWS Amplify:** A set of tools and services for building scalable and secure cloud-powered applications.
- **DynamoDB:** A fully managed NoSQL database service for storing and retrieving vehicle entries.
- **API Gateway:** A fully managed service for creating, publishing, and managing APIs at scale.
- **Cognito User Pool:** A user directory that scales to hundreds of millions of users, providing sign-up and sign-in functionality.
- **Lambda Functions:** Serverless computing service for running code without provisioning or managing servers.
- **S3 Bucket:** Scalable object storage for storing and retrieving images associated with vehicle entries.

## Usage

1. **Client Registration/Login:**
   - Clients can register or log in to the platform using the client interface.

2. **Browse Vehicles:**
   - Clients can view a list of available vehicles for hire.

3. **Merchant Registration/Login:**
   - Merchants can register or log in to the platform using the merchant interface.

4. **Add Vehicles:**
   - Merchants can add vehicles to the platform, providing details and images.

5. **Manage Vehicles:**
   - Merchants can manage their vehicle entries, including updates and deletions.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify the project for your own purposes.

