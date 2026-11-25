# TenderTrack Frontend

## 1. Project Overview

TenderTrack is a web-based Procurement and Bid Management System designed to simplify and streamline the tendering process. It provides a centralized platform where administrators, contractors, and auditors can interact with tender information, manage bids, and monitor procurement activities.

The frontend is built using **React 18 and Vite** and communicates with a Flask REST API hosted on Render.

The application provides an intuitive interface for user authentication, tender management, bid submission, and role-based access to system functionality.

### Main Features

- **User Authentication:** User registration, login, and email verification using a verification token.
- **Role-Based Dashboards:** Different dashboard experiences based on user roles.
- **Tender Management:** View, create, filter, and paginate tender listings.
- **Tender Details:** View detailed information about individual tenders.
- **Bid Submission:** Contractors can submit bids against available tenders.
- **Bid Review:** Authorized users can review submitted bids.
- **Bid Management:** Access and manage bid-related information.
- **Responsive Interface:** A consistent interface with a black, red, and green theme.

## 2. Technology Stack

The frontend uses the following technologies:

| Technology | Purpose |
|---|---|
| React 18 | Building the user interface |
| Vite | Development server and build tool |
| JavaScript | Frontend application logic |
| CSS | Styling and responsive layouts |
| Vitest | Frontend testing |
| Flask REST API | Backend communication |

## 3. System Requirements

Before setting up the project, ensure that the following are installed:

- Node.js 18 or later.
- npm (Node Package Manager).
- Git.
- A running Flask backend or access to the deployed Render API.

To verify your Node.js and npm installations:

```bash
node -v
npm -v
```

## 4. Installation and Setup

Follow these steps to run the frontend locally.

### Step 1: Clone the Repository

```bash
git clone <repository-url>
```

Navigate into the frontend project directory:

```bash
cd frontend
```

### Step 2: Install Dependencies

Install the required project dependencies:

```bash
npm install
```

### Step 3: Configure Environment Variables

The application uses the deployed Render backend by default, so an environment file is not required for the standard setup.

To connect to a local Flask backend, create an environment file:

```bash
cp .env.example .env
```

Configure the API URL:

```env
VITE_API_URL=/api
```

The local Flask backend should be running on port 5000, with the Vite development server proxying API requests through `/api`.

### Step 4: Start the Development Server

Run:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:5174
```

Note: Vite's configured development port should be checked in `vite.config.js`. If the port is changed, the backend CORS configuration must also be updated.

## 5. API Integration

### Backend API

The frontend communicates with a Flask REST API responsible for processing application requests, managing data, and handling authentication and authorization.

**Deployed backend:**

https://backend-tender-trackerr.onrender.com

**API documentation (Swagger):**

https://backend-tender-trackerr.onrender.com/apidocs/

### API Functionality

The frontend integrates with the backend to support the following operations:

| API Functionality | Description |
|---|---|
| User Registration | Creates new user accounts. |
| User Authentication | Handles login and user authentication. |
| Email Verification | Verifies registered accounts using emailed tokens. |
| Tender Management | Retrieves, creates, and manages tender records. |
| Tender Details | Retrieves information about individual tenders. |
| Bid Submission | Allows contractors to submit bids. |
| Bid Management | Retrieves and manages submitted bids. |
| Role-Based Access | Supports permissions based on user roles. |

### API Configuration

The deployed Render API is the default backend.

For local development, the frontend can be configured to communicate with the local Flask backend using:

```env
VITE_API_URL=/api
```

The exact API endpoint paths and HTTP methods are documented in the backend Swagger interface.

## 6. User Accounts and Authentication

TenderTrack supports registration, email verification, and login.

### Registration Process

1. A user creates an account through the registration page.
2. The backend processes the registration request.
3. A verification token is sent to the user's email.
4. The user enters the token on the `/verify` page.
5. Once verified, the user can sign in.

Existing accounts that have already been verified can sign in directly.

### Demo Accounts

After running the backend seed script (`python seed.py`), the following demo accounts are available:

| Role | Email | Password |
|---|---|---|
| Administrator | admin@tendertrack.com | admin12345 |
| Contractor | contractor@tendertrack.com | contractor123 |
| Auditor | auditor@tendertrack.com | auditor12345 |

These are development demo credentials and should not be used in production.

## 7. Running Tests

The frontend uses Vitest for testing.

To execute the test suite:

```bash
npm test
```

This runs the available frontend tests to help verify application functionality and identify potential issues.

## 8. Production Build

To generate an optimized production version of the frontend, run:

```bash
npm run build
```

The production files are generated in the `dist/` directory.

These files can then be deployed to a static hosting service.

## 9. Deployment

The frontend can be deployed using platforms such as Vercel or Netlify.

### Deployment Configuration

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variable | `VITE_API_URL` |

The project includes:

- `vercel.json` for Vercel deployment configuration.
- `public/_redirects` for Netlify routing configuration.

These configurations help ensure that application routes continue working when users refresh pages or navigate directly to internal URLs.

### Backend CORS Configuration

After deploying the frontend, the deployed frontend URL must be added to the backend's `CORS_ORIGINS` environment variable.

For example:

```env
CORS_ORIGINS=http://localhost:5174,https://YOUR-FRONTEND-URL
```

The values should be comma-separated, without spaces or trailing slashes.

After updating the environment variable on Render, redeploy the backend.

## 10. Challenges and Known Issues

During development and integration, the following areas require attention:

### 10.1 Cross-Origin Resource Sharing (CORS)

The frontend and backend may run on different origins during development and deployment.

This can cause browser requests to be blocked if the frontend URL is not included in the backend's CORS configuration.

**Solution:** Configure the backend's `CORS_ORIGINS` variable to include the local development URL and deployed frontend URL.

### 10.2 Backend Connectivity

The frontend depends on the Flask API to retrieve and submit application data.

If the backend is unavailable, API-dependent features such as authentication, tender listings, and bid management may not function correctly.

**Solution:** Ensure the backend is running and that the frontend is configured with the correct API URL.

### 10.3 Email Verification

New users must complete email verification before signing in.

An invalid, expired, or missing verification token can prevent successful account verification.

**Solution:** Ensure that users enter a valid token generated by the backend.

### 10.4 Environment Configuration

Switching between the deployed Render backend and a local Flask backend requires the correct API URL configuration.

Incorrect environment variables may cause failed API requests.

**Solution:** Verify the `VITE_API_URL` setting and restart the Vite development server after modifying the environment file.

### 10.5 Deployment and Page Refreshes

Single-page applications can encounter routing issues when users refresh an internal page or access a route directly.

**Solution:** The project includes `vercel.json` and `public/_redirects` to support frontend route handling during deployment.

### Known Bugs

No confirmed outstanding frontend bugs are documented in this README. The integration issues above are potential configuration and operational challenges, not claims of unresolved defects.


## 11. Project Structure

The frontend is organized into separate folders for the application pages, reusable components, context, hooks, and tests. The main application files are kept directly under `src`.

```text
frontend_tender_trackerr/
|
|-- public/
|   |-- images/
|   |-- _redirects
|
|-- src/
|   |-- components/
|   |   |-- BidForm.jsx
|   |   |-- BidRow.jsx
|   |   |-- Navbar.jsx
|   |   |-- Notice.jsx
|   |   |-- Pager.jsx
|   |   |-- ProtectedRoute.jsx
|   |   |-- TenderForm.jsx
|   |   |-- UploadButton.jsx
|   |
|   |-- context/
|   |-- hooks/
|   |-- pages/
|   |-- test/
|   |-- tests/
|   |
|   |-- api.js
|   |-- App.jsx
|   |-- main.jsx
|   |-- styles.css
|
|-- .env.example
|-- .gitignore
|-- index.html
|-- package.json
|-- README.md
```

### Main Files and Folders

- `components/` contains the reusable interface components, including bid forms, tender forms, navigation, notifications, pagination, and protected routes.
- `context/` contains the application's context files.
- `hooks/` contains custom React hooks used by the application.
- `pages/` contains the different application screens.
- `test/` and `tests/` contain the frontend testing files.
- `api.js` handles communication with the backend API.
- `App.jsx` contains the main application component.
- `main.jsx` is the frontend entry point.
- `styles.css` contains the application's styling.
- `.env.example` provides the environment variable configuration template.
- `package.json` defines the project dependencies and available npm scripts.
- `public/` stores static assets and deployment-related files.
```

### Folder and File Responsibilities

- `src/pages/`: Contains the individual application screens.
- `src/components/`: Contains reusable interface components.
- `src/hooks/useFetch.js`: Provides reusable data-fetching functionality.
- `src/api.js`: Centralizes API requests and backend communication.
- `src/styles.css`: Contains the application's styling and theme.
- `public/_redirects`: Provides Netlify routing support.
- `vercel.json`: Configures Vercel deployment routing.
- `vite.config.js`: Configures the Vite development environment.

## 12. Conclusion

TenderTrack's frontend provides an accessible interface for interacting with the procurement and bid management system. By using React and Vite, the application offers a modular and maintainable structure while integrating with a Flask REST API for backend functionality.

The system supports user authentication, role-based dashboards, tender management, and bid processing, providing a centralized interface for the different users involved in the tendering process.