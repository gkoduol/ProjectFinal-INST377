## Developer Manual
This document is intended for developers who want to run, modify, or extend the EmpowerLink application. It assumes general familiarity with JavaScript, Node.js, and web applications, but no prior knowledge of this project.

## Installation
1. Clone the repository: git clone <https://github.com/gkoduol/ProjectFinal-INST377.git>

2. Navigate into the server directory: cd server

3. Install dependencies: npm install

4. Create a `.env` file in the `server` directory with the following variables:
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_APP_KEY=your_adzuna_app_key


## Running the Application
1. To start the server locally: npm start
2. The application will be available at: http://localhost:3001
3. The frontend is served statically from the 'public' folder.


## Running Tests
This project does not currently include automated tests.

## API Endpoints

### GET /api/jobs
Retrieves job listings from the Adzuna Jobs API based on search keyword and location.

Query Parameters:
- search: keyword for job search
- location: job location

### POST /api/saved-jobs
Saves a job to the Supabase database.

Request Body:
- title
- company
- location
- url

### GET /api/saved-jobs
Retrieves all saved jobs from the Supabase database.

## Known Issues
- Saved jobs are not associated with individual users.
- Duplicate saved jobs are not currently prevented.
- Mobile responsiveness is limited.

## Future Development
Potential improvements include:
- User authentication
- Job filtering and sorting
- Duplicate job prevention
- Enhanced mobile responsiveness
- Curated resources and mentorship links
