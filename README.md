# Study Notion

## Overview

Study Notion is an e-learning platform developed using Next.js with a focus on secure user authentication and streamlined session management. The platform allows students to sign up, log in, and access their personalized dashboard. Though still in development, Study Notion currently implements core features such as user authentication and profile management.

## Tech Used

- `NextJS`: A React-based framework for building fast, scalable applications with server-side rendering and routing.

- `NextAuth`: Provides secure and flexible user authentication and session management for the platform.

- `Typescript`: Ensures type safety and improves code maintainability and readability.

- `Nodemailer`: Facilitates email notifications, such as sending verification or welcome emails during the signup process.

- `Cloudinary`: Manages media uploads and optimizes profile pictures to ensure fast load times and efficient storage.

- `TypeORM`: An ORM that simplifies database interactions through an easy-to-use API, enabling efficient management of entities and relations.

These technologies lay the foundation for a scalable and secure platform, with future features such as course management planned.

## Demo

### Home

![Home](Screenshots/Screenshot%20from%202024-10-19%2019-18-42.png)

### Login

![Login](Screenshots/Screenshot%20from%202024-10-19%2019-18-57.png)

### Dashboard

![Dashboard](Screenshots/Screenshot%20from%202024-10-19%2019-19-25.png)

## Set-Up the project Locally

1. First clone this project locally.

   ```bash
   git clone https://github.com/Sahil2k07/StudyNotion-NextJS.git
   ```

2. Move to the project directory.

   ```bash
   cd StudyNotion-NextJS
   ```

3. Install all the dependencies.

   ```bash
   npm i
   ```

4. Set up all the required env variable by making a `.env` file. A `.env.example` file has been given for reference.

   ```dotenv
    DB_HOST=
    DB_PORT=
    DB_USERNAME=
    DB_PASSWORD=
    DB_NAME=

    NEXTAUTH_URL=
    NEXTAUTH_SECRET=

    BCRYPT_ROUNDS=

    # Cloudinary Details.
    CLOUD_NAME=
    API_KEY=
    API_SECRET=
    FOLDER_NAME=

    # Nodemailer Details
    MAIL_HOST=
    MAIL_USER=
    MAIL_PASS=

    # Razorpay Details
    RAZORPAY_KEY=
    RAZORPAY_SECRET=

    # NextAuth Providers
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    GITHUB_CLIENT_ID=
    GITHUB_CLIENT_SECRET=
   ```

5. Run the command to Start the project in Dev Mode.

   ```bash
   npm run dev
   ```
