## Blogsphere (Create AI-powered blogs effortlessly)

#### blogging website made with reactjs, express and mongdb. create blog content with google's gemini.

#### Includes complete user management, google's gemini ai and razorpay integrations.

![App Screenshot](https://mir-s3-cdn-cf.behance.net/project_modules/disp/69027e213638185.6749b426d2268.png)

## Tech Stack

**Client:** React

**Server:** Node, Express

**DB:** MongoDb

**AI:** Google Gemini AI

**Deployment:** Vercel

### Other Stacks available

If you want a more progressive backend checkout the Nestjs + React Repo

**React + Nestjs** : [github.com/GaneshSrambikal/blog_app_react_nestjs](https://github.com/GaneshSrambikal/blog_app_react_nestjs)

## Authors

- [@GaneshSrambikal](https://github.com/GaneshSrambikal)

## About

Blogshpere is an innovative platform that leverages artificial intelligence to simplify content creation with google's gemini ai. Whether you're a professional writer or a hobbyist, our tools help you craft compelling blogs, manage images, and reach your audience efficiently.

Complete user management lets you manage your profile details, reset passwords and more. Besides creating new posts user get rewards point which later can be redeem to ai credits. User also gets rewards for liking and commenting on post.

Purchase Ai credits with seemless payment through razorpay payment gateway.

_Earn rewards_
|Action | Rewards |
|-------|---------|
| 1 🗎 Blog post | 10 🪙 rewards|
| 1 ❤️ Like | 1 🪙 reward|
| 1 💬 comment | 5 🪙 reward |

_Redeem Rewards to AI Credits_
| Rewards |Redeem to => | AI credits |
|--------|--------|------------|
| 100 🪙 | 100 👉🏻| 100 💳|

_Buy AI Credits_
| Price (Rs) | AI Credits |
|-------|------------|
| 100 💸 | 100 💳 |

## Packages Used

**Frontend:**

| Packages           | npm links                                           |
| ------------------ | --------------------------------------------------- |
| axios              | https://www.npmjs.com/package/axios                 |
| joi                | https://www.npmjs.com/package/joi                   |
| jwt-decode         | https://www.npmjs.com/package/jwt-decode            |
| google/generate-ai | https://www.npmjs.com/package/@google/generative-ai |
| react-confetti     | https://www.npmjs.com/package/react-confetti        |
| react-icons        | https://www.npmjs.com/package/react-icons           |
| react-router-dom   | https://www.npmjs.com/package/react-router-dom      |

**Backend:**
|Packages | npm links |
|---------|-----------|
|express|https://www.npmjs.com/package/express|
|mongodb|https://www.npmjs.com/package/mongodb|
|razorpay|https://www.npmjs.com/package/razorpay|
|cloudinary|https://www.npmjs.com/package/cloudinary|
|mongoose|https://www.npmjs.com/package/mongoose|
|multer|https://www.npmjs.com/package/multer|
|nodemailer|https://www.npmjs.com/package/nodemailer|
|multer-storage-cloudinary|https://www.npmjs.com/package/multer-storage-cloudinary|
|jsonwebtoken|https://www.npmjs.com/package/jsonwebtoken|
|joi|https://www.npmjs.com/package/joi|
|bcryptjs|https://www.npmjs.com/package/bcryptjs|

## Installation

#### Clone / fork the repo

```bash
  git clone https://github.com/GaneshSrambikal/blog_app_react_node.git
```

#### Frontend (cd frontend)

```bash
  npm install
```

#### Backend (cd backend)

```bash
  npm install
```

#### Set your .env variable key and value

_for backend_

```code
PORT=5000
MONGO_URI=''
VITE_API_BASE_URL='/api'
SUPER_ADMIN=''
NODE_MAILER_EMAIL=''
NODE_MAILER_PASSWORD=''
APP_TOKEN_NAME=''
CLOUDINARY_CLOUD_NAME=''
CLOUDINARY_API_KEY=''
CLOUDINARY_API_SECRET=''
CLOUDINARY_URL=''
VITE_CLOUDINARY_PRESET=''
RAZORPAY_KEY_ID=''
RAZORPAY_KEY_SECRET=''
```

_for frontend_

```code
VITE_API_BASE_URL='http://localhost:5000/api'
NODE_ENV=development
VITE_CLOUDINARY_UPLOAD_URL=''
VITE_CLOUDINARY_PRESET=''
VITE_GEMINI_API_KEY=''

```

## Run Locally

Start the server

```bash
  npm run server
```

Start the client

```bash
npm run dev
```
