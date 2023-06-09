# BeatBuddy
Social Media for Spotify users to chat with each other and discuss all things music.
## Table of Contents
1. [Project Title](#beatbuddy)
2. [Installation](#installation)
3. [How to Use Project](#how-to-use-project)
4. [Major Components and Features](#major-components-and-features)
5. [The Status of those Features](#the-status-of-those-features)
6. [Credits](#credits)
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
### Group Members
  1. William Kieffer - Created the discovery page. Here users can see other users that compare to them across a number of different categories. These can include: liked songs, top artist, top songs, or even region. As well as search all public users. 
  2. Stephen Pasch - Created the forum page. Here users can start a public forum topic. Then other users can comment their responses. Forum threads can be upvoted or downvoted and searched for by name.
  3. Nihar Satasia - Created the inbox page. Here users can start direct messages with existing users in the system. Borrows the structure of interaction that i-message uses. 
  4. Kevin Shi - Created the Login and Profile pages. Using spotify authentication, a user will sign in with their account. Then using the spotify API the profile page requests that users relavant data. This data is displayed in the categories of Top Songs, Top Artists, and liked songs.
  
### Database Documentation
1. Firebase Firestore cloud database. A NoSQL cloud storage system by google that was configured to this web application and in test mode. That mean access to our database will expire in 30 days. 
