#  The Code Whisperers

## 👉Project Description

Welcome to The-Code-Whisperers, a dedicated platform for coding enthusiasts to share their ideas and insights into the latest
technologies shaping the industry. Whether you're passionate about web development,
AI, blockchain, or any other tech domain, this platform provides a space for you to articulate your thoughts and connect with like-minded individuals



https://github.com/user-attachments/assets/9788d6f0-5ee3-45b3-a46c-311d862117b0

## ⚙️Tech Stacks Used
- Reactjs
- Tailwind
- Express
- AWS (EC2) 
- Nodejs
- Prisma
- Postgres
- Cloudinary
- Zod

# 👉Features

- Secure login and registration using JWT authentication
- Easy-to-use interface for creating blog posts.
- Support for uploading and embedding images using Cloudinary and Multer.
- Data validation and integrity ensured with Zod.
 
# Upcoming
- Integration of Quinn Text Editor
- GPT-3.5 Integration
- Enable interactive discussions with threaded comments
- Search Blog Functionality
- Upvote and Bookmark Blogs

# Project Setup


**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash

git clone https://github.com/abbi4code/The-Code-Whisperers.git
cd The-Code-Whisperers
```

**Installation**

Install the project dependencies using npm:

In both server and Client

```bash

npm install

```

**Set Up Environment Variables**

- Create a copy of .env.example and name the file `.env` in the server folder
- Set up Postgres DATABASE_URL in .env file. You can get a free PostgreSQL connection string from [Aiven.io](https://aiven.io/) or [Neon.tech](https://neon.tech/).

Your env file should look like this

```env
DATABASE_URL=""
JWT_SECRET=""


CLOUD_NAME=""
API_KEY=""
API_SECRET=""
```
Run the following cmds 

```bash
npm run prisma:migrate
npx prisma generate
npm run dev
```


- `npm run prisma:migrate ` applies database migrations to sync your database schema with your Prisma schema.
- `npx prisma generate` generates TypeScript typings based on your Prisma schema

- Your can get the cloudinary credentials by creating a new account. [Cloudinary](https://cloudinary.com/)

> Note: `frontend/src/config.ts` contains `backendurl`. If you need your frontend to point to local backend server, uncomment `export const backendurl = "http://localhost:3000/api/"

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.



  
