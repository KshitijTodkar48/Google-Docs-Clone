## ⭐ Introduction
 This project is a clone of 'Google Docs', designed to provide a collaborative document editing experience similar to Google Docs. It allows multiple users to create, edit, and collaborate on documents in real-time.

## 🟢 Features

- **Document Creation and Storage:** Users can create new documents and store them securely in the database.
- **Real-time Document Editing:** Multiple users can collaborate and edit the same document simultaneously, with changes reflected instantly for all participants.
- **Real-time Sync:** Changes made by different users are automatically synchronized across all connected clients, ensuring seamless collaboration.
- **Rich Text Editing:** The Quill text editor provides a rich editing experience, allowing users to format text, add images, and more.

## 🔧 Tech-Stack 

- **Frontend:**
  - React.js
  - Quill
  - shadcn/ui

- **Backend:**
  - Node.js
  - Socket.io

- **Database:**
  - MongoDB

- **Other Tools:**
  - TypeScript
  - Docker

## ▶️ Getting Started

To get a local copy up and running, please follow these simple steps.

### 🟡 Prerequisites

Here's what you need to be able to run the application locally:

- Node.js (Version: >=18.x)
- MongoDB
- npm / yarn

## 💻 Development

### 🟢 Setup (without Docker) :

1. Clone the repo. (or fork https://github.com/KshitijTodkar48/Google-Docs-Clone/fork).

   ```sh
   git clone https://github.com/KshitijTodkar48/Google-Docs-Clone.git
   ```

2. Go to the server directory.
 
   ```sh
   cd server
   ```

3. Install packages with npm/yarn.

   ```sh
   npm install
   ```
   or
   
   ```sh
   yarn install
   ```

   
4. Set up your `.env` variables.

   Create a new file named `.env` in `Google-Docs-Clone/server` directory.

   In the server `.env` file, add a variable named `DATABASE_URL`.
   
   - You will need you own MongoDB database (local or cloud). Put its link under `DATABASE_URL` in the `.env` file.

   Add another variable named `CLIENT_ORIGIN` and set its value to `http://localhost:5173`.

  
5. Run the following command:
   
    ```sh
    npm run dev
    ```

  Now the backend server will be running on http://localhost:3000

6. Open a new terminal and go to the client directory.

   ```sh
   cd client
   ```

7. Install the client dependencies with npm/yarn.

   ```sh
   npm install
   ```

8. Set up your `.env` variables.

   Create a new file named `.env` in `Google-Docs-Clone/client` directory.
   
   In that file, add a variable named `VITE_SERVER_URL` and set its value to `http://localhost:3000`.
   
10. Run the following command: 
    ```sh
    npm run dev
    ```
    
 The React app will be running on http://localhost:5173


## 🐋 Setup (with Docker) :

1. Set up environment variables:
   - Follow the steps 4 and 8 in the above 'Setup without docker' guide.
     

2. Run the following command in the root directory: 
    ```sh
    docker-compose up
    ```

Now the application will be running on http://localhost:5173


## ▶️ Preview

https://github.com/KshitijTodkar48/Google-Docs-Clone/assets/120639775/a7dc1200-3617-4214-b065-339a55eaad59

