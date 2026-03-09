# Mentora Backend (Simplified)

## A simplified backend for a mentorship platform where Parents, Students, and Mentors interact.

***This project implements core backend features including:***

- Authentication with JWT
- Parent-managed student accounts
- Mentor-created lessons
- Student lesson bookings
- Lesson sessions
- LLM-powered text summarization

The system is built using Node.js, Express, MongoDB, and OpenAI API.

### Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt password hashing
- OpenAI API (LLM summarization)
- express-rate-limit

### Project Structure

```bash
src/
 ├── config/
 │   └── db.js
 │
 ├── controllers/
 │   ├── authController.js
 │   ├── studentController.js
 │   ├── lessonController.js
 │   ├── bookingController.js
 │   ├── sessionController.js
 │   └── llmController.js
 │
 ├── models/
 │   ├── User.js
 │   ├── Student.js
 │   ├── Lesson.js
 │   ├── Booking.js
 │   └── Session.js
 │
 ├── routes/
 │   ├── authRoutes.js
 │   ├── studentRoutes.js
 │   ├── lessonRoutes.js
 │   ├── bookingRoutes.js
 │   ├── sessionRoutes.js
 │   └── llmRoutes.js
 │
 ├── middleware/
 │   ├── authMiddleware.js
 │   └── roleMiddleware.js
 │
 └── app.js

server.js
.env
package.json
```
### Setup Instructions
***1. Clone the Repository***
```bash
git clone https://github.com/RScodes1/mentora-backend.git
cd mentora
```
***2. Install Dependencies***
```bash
npm install
```
***3. Configure Environment Variables***

Create a .env file in the project root:
```bash
PORT=4500
MONGO_URI=*********
JWT_SECRET=**********************
OPENAI_API_KEY=************************
```
***Setting the OpenAI API Key***

- Create an API key from your OpenAI dashboard.
- Add it to the .env file
```bash
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
```
The backend will automatically load this key using dotenv.

Running the Server

Start the development server:
```bash
npm run dev
```
or
```bash
node server.js
```
Server will run on:
```bash
http://localhost:4500
```

### API Overview
- Endpoint	Method	Description
- /auth/signup	POST	Register parent or mentor
- /auth/login	POST	Login
- /auth/me	GET	Current user
- /students	POST	Create student (parent only)
- /students	GET	Get parent's students
- /lessons	POST	Create lesson (mentor only)
- /bookings	POST	Book lesson for student
- /sessions	POST	Create lesson session
- /lessons/:id/sessions	GET	Get sessions for lesson
- /llm/summarize	POST	Summarize text using LLM
  
### LLM Text Summarization

This feature integrates with the OpenAI API to generate concise summaries of large text inputs.

Endpoint:
```bash
POST /llm/summarize
``` 
Request Format
```bash
POST /llm/summarize
Content-Type: application/json
```
Body:
```bash
{
  "text": "Artificial intelligence is transforming industries across the world. Companies are increasingly using machine learning models to automate processes and improve decision making..."
}
```
Response Format
```bash
{
  "summary": "• AI is transforming industries globally\n• Machine learning helps automate processes\n• AI improves decision-making capabilities\n• Concerns exist around privacy and ethics",
  "model": "gpt-4o-mini"
}
```

### Validation Rules

The API performs basic input validation:

Condition	Response
Missing text	400
Text < 50 characters	400
Text > 10,000 characters	413

***Rate Limiting***

- The summarization endpoint is protected with basic rate limiting:-
- Maximum 10 requests per minute per IP
- This prevents abuse of the LLM API.

Error Handling

If the LLM service fails:
```bash
502 Bad Gateway
```
Example:
```bash
{
  "message": "LLM summarization failed"
}
```
Example curl Request

You can test the summarization endpoint using curl:
```bash
curl -X POST http://localhost:4500/llm/summarize \
-H "Content-Type: application/json" \
-d '{
"text":"Artificial intelligence is rapidly changing how businesses operate. Companies are using machine learning models to automate processes, analyze large datasets, and improve customer experiences. However, these advancements also bring challenges such as data privacy concerns and ethical considerations."
}'
```
### Assumptions

- The following assumptions were made during development:
- Students are not independent users; they belong to a parent account.
- Only parents and mentors can sign up.
- Lessons are created only by mentors.
- Parents book lessons for their students.
- Summaries are returned in bullet point format (3–6 points).
- Text input limit was set to 10,000 characters to control API cost and response latency.

### Future Improvements

- Possible enhancements include:
- Prevent duplicate bookings
- Add pagination for lessons and sessions
- Add mentor lesson listing
- Add student session attendance
- Add caching for LLM responses
- Add input validation with a schema validator like Joi or Zod
