# BlogSpot - A Simple CMS Web App

BlogSpot is a web application built using React.js for the frontend, Node.js for the backend, and MongoDB as the database. It allows users to read blogs posted by other writers and create and publish their own blogs. The project utilizes the TinyMCE text editor to enhance the blog writing experience.

## Live Demo

Explore the live demo of BlogSpot to experience its features and functionalities:

<img src="https://github.com/shuvra-matrix/images/blob/main/Screenshot%202024-01-09%20030449.png?raw=true" att="blogpostimage" width="100%" height="700px">

<br>

### This web application is hosted on a free server, so it may take some time to load. Please be patient. Thank you!

<br>

### Live Demo : [BlogSpot Live Demo](https://publicblogspot.netlify.app/)

<br>

Feel free to read existing blogs, create your own posts, and experiment with the various features provided by BlogSpot. Please note that this is a demo version, and any content created is for demonstration purposes only.

For the most up-to-date and interactive experience, visit the live demo and engage with the BlogSpot platform. Enjoy exploring and creating content in this user-friendly CMS!

## Features

1. **Read Blogs:**

   - Users can explore and read blogs posted by other writers.

2. **Write, Edit, and Delete Posts:**

   - Authenticated users can create, edit, and delete their own blog posts.

3. **TinyMCE Text Editor:**

   - The application features the TinyMCE text editor to provide users with a rich and user-friendly writing experience.

4. **User Authentication:**

   - Users can create accounts, log in, and log out securely.

5. **Update User Details:**

   - Authenticated users have the ability to update their profile details.

6. **Change Password:**
   - Users can change their account password for added security.

## Local Installation Guide

To run BlogSpot locally, follow these steps:

### Prerequisites

1. Node.js and npm installed on your machine.
2. MongoDB installed and running.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/shuvra-matrix/MERN-CMS-PROJECT.git
   cd MERN-CMS-PROJECT
   ```

2. Install dependencies for both the frontend and backend:

   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../public
   npm install
   ```

3. Set up environment variables:

   - In the `server` directory, create a `.env` file with the following content:

     ```
     MONGO_USER=<your-mongo-user>
     MONGO_PASSWORD=<your-mongo-password>
     EMAIL_ID=<your-email-id>
     EMAIL_PASSWORD=<your-email-password>
     ```

   - In the `public` directory, create a `.env` file with your TinyMCE API key:

     ```
     REACT_APP_TINYMCE_API_KEY=<your-tinymce-api-key>
     ```

4. Start the local development servers:

   - In the `server` directory:

     ```bash
     npm start
     ```

     The server will run on `http://localhost:3030`.

   - In the `public` directory:

     ```bash
     npm start
     ```

     The frontend will run on `http://localhost:3000`.

5. Open your web browser and navigate to `http://localhost:3000` to access the BlogSpot web app.

## Disclaimer

BlogSpot is a small project created by me for portfolio purposes only. All blog posts on this platform are written by users, and the platform does not take any responsibility for the content of these posts. Users are advised to use the platform responsibly and report any inappropriate content.

Feel free to explore, contribute, and enhance this project for your learning and showcase purposes!

Certainly! Here's a template for the Fork and Issue Report section:

## Fork and Issue Report

### Fork the Repository

If you'd like to contribute to this project or use it as a starting point for your own CMS project, you can fork the repository. Follow these steps:

1. Navigate to the [repository](https://github.com/shuvra-matrix/MERN-CMS-PROJECT) on GitHub.
2. Click the "Fork" button in the upper right corner of the page.
3. Once the forking process is complete, you'll have your copy of the repository.

### Issue Reporting

If you encounter any issues or have suggestions for improvements, please check the existing issues on the repository. If your issue is not already listed, you can create a new issue. Follow these steps:

1. Navigate to the [Issues](https://github.com/shuvra-matrix/MERN-CMS-PROJECT/issues) tab on the GitHub repository.
2. Check if the issue already exists. If not, click on the "New Issue" button.
3. Provide a clear and descriptive title for the issue.
4. Specify the details of the problem or the feature request.
5. If applicable, include steps to reproduce the issue.
6. Add any relevant labels or milestones.
7. Click "Submit new issue" to create the issue.

Thank you for your contribution and feedback!
