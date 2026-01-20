# Reach17 API

> RESTful API for managing educational courses aligned with UN Sustainable Development Goals (SDGs)

[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.x-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.x-brightgreen.svg)](https://www.mongodb.com/)
[![Jest](https://img.shields.io/badge/Jest-30.x-red.svg)](https://jestjs.io/)
[![Coverage](https://img.shields.io/badge/Coverage-90%25-brightgreen.svg)](https://jestjs.io/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## 📖 About

**Reach17** is a RESTful API designed to manage a catalog of educational courses, universities, and course types. The platform aims to promote education aligned with the United Nations' 17 Sustainable Development Goals (SDGs).

This API provides endpoints to:

- Manage **Course Types** (e.g., Environmental Sustainability, Social Innovation)
- Manage **Universities** offering courses
- Manage **Courses** with relationships to types and universities
- Associate courses with multiple universities (Many-to-Many relationship)
- Filter and search courses by name and type

---

## 🚀 Technologies

- **Node.js** 20.x - JavaScript runtime
- **Express.js** 5.x - Web framework
- **MongoDB** 7.x - NoSQL database
- **Mongoose** - MongoDB ODM
- **express-validator** - Input validation and sanitization
- **Jest** - Testing framework
- **Supertest** - HTTP testing
- **mongodb-memory-server** - In-memory database for testing
- **dotenv** - Environment variable management

---

## ✨ Features

### Core Functionality

- ✅ **Full CRUD operations** for Course Types, Universities, and Courses
- ✅ **RESTful API design** with standard HTTP methods and status codes
- ✅ **Many-to-Many relationships** between Courses and Universities
- ✅ **Advanced filtering** by course name and type
- ✅ **Data population** with Mongoose for complete responses

### Security & Validation

- ✅ **Input validation** on all endpoints
- ✅ **NoSQL injection protection** via sanitization
- ✅ **Type-safe ObjectId validation**
- ✅ **Error handling** with user-friendly messages

### Testing & Quality

- ✅ **Automated test suite** with Jest + Supertest
- ✅ **90% code coverage** (47 tests)
- ✅ **In-memory MongoDB** for fast, isolated tests

### Developer Experience

- ✅ **Multi-database support** (Local, Atlas, Docker)
- ✅ **Professional Git workflow** (main + development branches)
- ✅ **Nodemon** for hot-reload during development
- ✅ **Comprehensive documentation**

---

## 📦 Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (choose one option below)

### Clone Repository

```bash
git clone https://github.com/Galdrial/Reach17-API.git
cd Reach17-API
git checkout development  # or main for stable version
```

### Install Dependencies

```bash
npm install
```

---

## 🗄️ Database Setup

Choose **ONE** of the following options:

### Option 1: Local MongoDB (Recommended for Development)

1. **Install MongoDB** locally from [mongodb.com/download](https://www.mongodb.com/download)
2. **Start MongoDB** service:

   ```bash
   # Linux/Mac
   sudo systemctl start mongod

   # Or using mongod directly
   mongod
   ```

3. **Configure** `.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/reach17
   PORT=3000
   NODE_ENV=development
   ```

### Option 2: MongoDB Atlas (Cloud - Recommended for Production)

1. **Create free account** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. **Create cluster** and get connection string
3. **Configure** `.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/reach17
   PORT=3000
   NODE_ENV=development
   ```

### Option 3: Docker Compose

1. **Install Docker** from [docker.com](https://www.docker.com/)
2. **Start MongoDB container**:
   ```bash
   docker-compose up -d
   ```
3. **Configure** `.env`:
   ```env
   MONGODB_URI=mongodb://mongodb:27017/reach17
   PORT=3000
   NODE_ENV=development
   ```
4. **Stop container**:
   ```bash
   docker-compose down
   ```

---

## 🏃 Running the Application

### Development Mode (with auto-reload)

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

The API will be available at: **http://localhost:3000**

Health check endpoint: **http://localhost:3000/api/health**

---

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Watch Mode (during development)

```bash
npm run test:watch
```

### Test Results

- **47 tests** passing
- **90.14% code coverage**
- Tests include validation, error handling, filters, and relationships

---

## 📚 API Endpoints

### Base URL

```
http://localhost:3000/api
```

### Health Check

```http
GET /api/health
```

**Response:**

```json
{
  "success": true,
  "message": "Reach17 API is running! 🚀",
  "timestamp": "2026-01-20T10:00:00.000Z"
}
```

---

## 🏷️ Course Types

### Create Course Type

```http
POST /api/course-types
Content-Type: application/json

{
  "name": "Environmental Sustainability"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6789",
    "name": "Environmental Sustainability",
    "createdAt": "2026-01-20T10:00:00.000Z",
    "updatedAt": "2026-01-20T10:00:00.000Z"
  }
}
```

### Get All Course Types

```http
GET /api/course-types
```

**Response (200):**

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6789",
      "name": "Environmental Sustainability",
      "createdAt": "2026-01-20T10:00:00.000Z",
      "updatedAt": "2026-01-20T10:00:00.000Z"
    },
    {
      "_id": "65a1b2c3d4e5f6790",
      "name": "Social Innovation",
      "createdAt": "2026-01-20T10:05:00.000Z",
      "updatedAt": "2026-01-20T10:05:00.000Z"
    }
  ]
}
```

### Get Course Type by ID

```http
GET /api/course-types/:id
```

### Update Course Type

```http
PUT /api/course-types/:id
Content-Type: application/json

{
  "name": "Climate Action"
}
```

### Delete Course Type

```http
DELETE /api/course-types/:id
```

---

## 🏫 Universities

### Create University

```http
POST /api/universities
Content-Type: application/json

{
  "name": "University of Bologna"
}
```

### Get All Universities

```http
GET /api/universities
```

### Get University by ID

```http
GET /api/universities/:id
```

### Update University

```http
PUT /api/universities/:id
Content-Type: application/json

{
  "name": "University of Milan"
}
```

### Delete University

```http
DELETE /api/universities/:id
```

---

## 📖 Courses

### Create Course

```http
POST /api/courses
Content-Type: application/json

{
  "name": "Climate Change Solutions",
  "courseType": "65a1b2c3d4e5f6789"
}
```

**Response (201):**

```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6791",
    "name": "Climate Change Solutions",
    "courseType": "65a1b2c3d4e5f6789",
    "universities": [],
    "createdAt": "2026-01-20T10:00:00.000Z",
    "updatedAt": "2026-01-20T10:00:00.000Z"
  }
}
```

### Get All Courses (with filters)

```http
# Get all courses
GET /api/courses

# Filter by name (case-insensitive)
GET /api/courses?name=climate

# Filter by course type
GET /api/courses?courseType=65a1b2c3d4e5f6789

# Combine filters
GET /api/courses?name=climate&courseType=65a1b2c3d4e5f6789
```

**Response (200):**

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6791",
      "name": "Climate Change Solutions",
      "courseType": {
        "_id": "65a1b2c3d4e5f6789",
        "name": "Environmental Sustainability"
      },
      "universities": [
        {
          "_id": "65a1b2c3d4e5f6792",
          "name": "University of Bologna"
        }
      ],
      "createdAt": "2026-01-20T10:00:00.000Z",
      "updatedAt": "2026-01-20T10:00:00.000Z"
    }
  ]
}
```

### Get Course by ID

```http
GET /api/courses/:id
```

### Update Course

```http
PUT /api/courses/:id
Content-Type: application/json

{
  "name": "Advanced Climate Solutions",
  "courseType": "65a1b2c3d4e5f6789"
}
```

### Delete Course

```http
DELETE /api/courses/:id
```

### Add University to Course

```http
POST /api/courses/:courseId/universities/:universityId
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6791",
    "name": "Climate Change Solutions",
    "courseType": { ... },
    "universities": [
      {
        "_id": "65a1b2c3d4e5f6792",
        "name": "University of Bologna"
      }
    ]
  }
}
```

### Remove University from Course

```http
DELETE /api/courses/:courseId/universities/:universityId
```

---

## 🔒 Security Features

### Input Validation

All endpoints validate input data using `express-validator`:

- Required fields check
- String length validation (min/max)
- MongoDB ObjectId format validation
- Custom error messages

### Sanitization

Protection against NoSQL injection:

- Input trimming
- HTML character escaping
- Type checking

### Error Responses

Consistent error format:

```json
{
  "success": false,
  "error": "Error message"
}
```

Validation errors:

```json
{
  "success": false,
  "errors": [
    {
      "field": "name",
      "message": "Name must be at least 2 characters"
    }
  ]
}
```

---

## 📁 Project Structure

```
Reach17-API/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── models/
│   │   ├── CourseType.js        # CourseType schema
│   │   ├── University.js        # University schema
│   │   └── Course.js            # Course schema (with relationships)
│   ├── controllers/
│   │   ├── courseTypeController.js
│   │   ├── universityController.js
│   │   └── courseController.js
│   ├── routes/
│   │   ├── courseTypes.js
│   │   ├── universities.js
│   │   └── courses.js
│   ├── middleware/
│   │   └── validation.js        # Input validation rules
│   └── app.js                   # Express app configuration
├── tests/
│   ├── setup.js                 # Test configuration
│   ├── courseType.test.js       # CourseType tests
│   ├── university.test.js       # University tests
│   └── course.test.js           # Course tests
├── server.js                    # Application entry point
├── package.json
├── .env.example                 # Environment variables template
├── .gitignore
├── docker-compose.yml           # Docker configuration
└── README.md
```

---

## 🌐 REST API Design Principles

This API follows REST best practices:

### HTTP Methods

- `GET` - Retrieve resources
- `POST` - Create resources
- `PUT` - Update resources
- `DELETE` - Delete resources

### Status Codes

- `200` - OK (success)
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

### Response Format

All responses follow a consistent JSON structure:

```json
{
  "success": true|false,
  "data": { ... },      // on success
  "error": "message",   // on error
  "count": 10           // for lists
}
```

---

## 🤝 Contributing

This is an educational project. For improvements or bug fixes:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Simone Galdieri**

- GitHub: [@Galdrial](https://github.com/Galdrial)
- Project: [Reach17-API](https://github.com/Galdrial/Reach17-API)

---

## 🙏 Acknowledgments

- Built as part of the **start2impact** Node.js course
- Inspired by the UN's 17 Sustainable Development Goals
- Thanks to the Node.js and MongoDB communities

---

**⭐ If you find this project useful, please consider giving it a star on GitHub!**
