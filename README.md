Sajilo Users — User Management Dashboard

Built for the Sajilo Life Pvt. Ltd. React Developer Intern/Trainee assessment.

Live Demo: https://sajilo-user-dashboard-assessment.vercel.app/
GitHub Repo: https://github.com/NakarmiKevus/sajilo-user-dashboard-assessment.git

Overview

Browse users from the DummyJSON API, search/filter them, view full user details, add new users, and delete existing ones.

Tech Stack

React (Vite), Tailwind CSS v4, React Router, Axios
Custom hook: useUsers

Features

User Listing

Responsive grid with photo, name, email, phone, company
Search by name, filter by gender
Pagination
Loading/error/empty states (including distinguishing "no users at all" vs "no results for filters")

User Details

/user/:id page with personal info, address, company, and bank sections
Back navigation
404/error handling for invalid IDs

Add User

Controlled form with client-side validation (required fields, email format, age range)
POST request to DummyJSON's simulated add endpoint
Success confirmation with redirect, inline error messages on failed validation

Delete User

Available from both the user card and the details page
Confirmation dialog before deletion
DELETE request, color-coded success/error feedback
Removed from the list immediately on success

Other

Reusable components: UserCard, UserGrid, Pagination, Navbar
Centralized API calls in userService.js
Handles missing/malformed nested fields (address, company, bank) defensively

Getting Started
bash
git clone [repo URL]
cd project-1-user-dashboard
npm install
npm run dev

Open http://localhost:5173.

API

DummyJSON Users

GET /users?limit=0
GET /users/:id
POST /users/add
DELETE /users/:id

Key Decisions

All users fetched upfront (no server pagination); search/filter/pagination run client-side, consistent with Project 2's approach.
DummyJSON's Add/Delete endpoints are simulated and don't persist data server-side (explicitly allowed per the assessment brief). Newly added users appear in the current session but won't survive a page refresh, since there's no real backend. Deleted users are removed from local state immediately, with the same server-side limitation.
No Context API used — unlike Project 2's cart, CRUD operations here don't need global state shared across unrelated components, so operations live directly in the pages/hook that need them.
Edit User was deliberately not built, due to time constraints. Add, Delete, and full Read/listing functionality were prioritized to demonstrate CRUD competency, per the brief's own guidance to prioritize core requirements over completeness of every feature.
