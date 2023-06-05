# BeatBuddy
Social Media for Spotify users to chat with each other and discuss all things music.
## Table of Contents
## Installation 
1. Clone the repository to your local machine: git clone https://github.com/ChefSteveP/BeatBuddy.git
2. Install the required dependencies: axios, body-parser, cookie-parser, cors, debug, dotenv, express, firebase, firebase-admin, http-errors, jade, morgan, mui, react-router-dom
3. Create a 'permissions.json' file and add Firebase information
4. Create three instances of Terminal. CD into frontend, backend, backend->routes->inbox
5. npm start frontend and backend. node index.js in inbox.
The application should now be running on http://localhost:3000/
## How to Use Project
### Basic Usage
To use BeatBuddy, first click the 'LOGIN WITH SPOTIFY' button and authorize BeatBuddy to view your Spotify account data. Once you are logged in, you can start using the app.
### Features
- View profile and additional information: To view your profile, navigate to the 'MY PROFILE' section of the app. A personal profile displaying information about your top artists and top tracks. Fields for your location and bio can be edited as well as the ability to switch your profile to private.
- Discover people with similar interests on BeatBuddy: In the 'DISCOVER' section of the app, you can find all public users, as well discover people with similar interests or people that are nearby. You can also search for specific users using the search bar at the top.
- Create and view forum posts: In the 'FORUM' section of the app, you can find and search for forum posts. You can also create your own post as well as comment and like/dislike existing forum posts.
- Direct message other BeatBuddy users: In the 'INBOX' section of the app, you can start new conversations with other BeatBuddy users as well as review and add to existing conversations.
## Major Components and Features

-   **Liked Songs Page**: Displays a user's liked songs with album picture.
-   **User's Top Artists Page**: Displays the user's top artists of all time, the last year, and the last month.
-   **User's Top Songs Page**: Displays the user's top songs of all time, the last year, and the last month.
-   **User Profile Page**:
    -   Users can view and edit their profiles.
    -   Users can select to display artists and songs from their Top/Liked pages.
    -   Users can make their profile private.
-   **Discover Page**: Displays all public user profiles, enabling users to view others' profiles and send messages.
-   **Inbox Page**: Shows the user's chat interactions with other users.
-   **Forum Page**:
    -   Displays all the discussion boards.
    -   Users can click on and access the posts.
## The Status of those Features

-   **Liked Songs Page**: Currently under development. The functionality to display a user's liked songs and album artwork is not yet operational.
-   **User's Top Artists Page**: Almost fully functional. Displays the user's top 10 artists based on the Last Month, but not for All Time or Last Year.
-   **User's Top Songs Page**: Almost fully functional. Displays the user's top 10 songs based on the Last Month, but not for All Time or Last Year.
-   **User Profile Page**: Almost fully functional.
    -   Users can view and edit their profiles: Functional.
    -   Users can select to display artists and songs from their Top/Liked pages: Currently not functional.
    -   Users can make their profile private: Functional.
-   **Discover Page**: Almost fully functional. Displays all public user profiles, but not directly send messages to them.
-   **Inbox Page**: Fully functional. Displays the user's chat interactions with other users.
-   **Forum Page**: Fully functional.
    -   Displays all the discussion boards.
    -   Users can click on and access the posts.
## Credits
