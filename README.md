# CS 4278 Project

This project is a web application for Reuse Vandy that seeks to streamline the way purchases are made while minimizing extraneous information. We have developed several features towards that goal. Since the time to develop this project was shorter than desired, we split the development of the application into back-end and front-end sub-repositories that were developed independently and in paralllel.

## Deployment Instructions

The front-end and back-end run as independent services that communicate with each other. The front-end React application is compiled into static HTML/CSS and JS files that are served from a Amazon S3 bucket. In constrast, the backend is built to run from a dedicated EC2 instance and listen for traffic over HTTPS.

## Dependencies

- Latest version of Node Version Manager (NVM)
- Node_v16.14.0 downloaded using NVM
- Git as the version control system
- A running a MySQL database (either hosted locally or on the cloud)
- A static file server to hold the front-end assets

## Front-end

To build the front-end component,

1. Navigate into the `front-end` sub-directory adjacent to this file
2. Run `npm ci` in the terminal to download third-party library dependencies
3. Run `npm run build` in the terminal - this command will transpile the React components into static HTML
4. In the directory, a new `build` directory should have been created - upload the entire directory to a static file server and configure that server to respond to requests for files

## Back-end

The easiest way to deploy the back-end is to SSH into a EC2 instance and clone the GitHub repository from inside the VM. Then follow these instructions

1. Navigate into the `back-end` sub-directory adjacent to this file
2. Run `npm ci` in the terminal to download third-party library dependencies
3. Create a `.env` file based on the `.env.template` provided and fill in the required environment variables. These include secret keys for S3 buckets, credentials for connecting to the database, and AES cipher keys among other information. <b> Do not skip this step. </b>
4. Run `npm run start` to start the back-end server at the port provided in the `.env` file.
5. Ensure that your EC2 instance is configured to receive HTTP/HTTPS traffic from the internet at the choosen ports.

## Project Framework
- Front end - ReactJS
- Back end - Node.js
- Web server framework - Express
- Database - MySQL
- Object relational mapping (ORM) - Sequelize
- Deployment - AWS EC2, AWS RDS, S3 Object Storage
- Cloud based repo/DevOps - GitHub
