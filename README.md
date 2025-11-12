🍔 FoodWagen – A2SV Web Project Assessment

This is a solution for the A2SV Web Project Assessment.
The goal was to build a functional, user-friendly web page for managing food items using Next.js and TypeScript, based on a provided Figma design.
The application connects to a mock API to perform full CRUD (Create, Read, Update, Delete) operations and search.

🚀 Live Demo

🔗 View Deployed App on Vercel
https://foodwagen-a2sv-assessment.vercel.app/

✨ Key Features

Full CRUD: Add, Edit, and Delete food items with a global modal.

API-driven Search: Filter meals by name using the “Find Meal” button.

Responsive Design: Fully responsive layout for mobile, tablet, and desktop.

Global Notifications: Automatic success and error toasts for all API actions using Sonner.

⚡ Optimized Performance

- Image optimization
- use tanstackquery to memoization and caching


🧱 Robust Error Handling

Route-Level: Uses error.tsx for route-level UI crashes.

Component-Level: Uses react-error-boundary to prevent the data list from crashing the entire page.

API-Level: Uses a global QueryClient to catch and display errors for all failed API calls.

🛠️ Technologies Used
Category	Tool / Library
Framework	Next.js 16.0.1 (App Router)
Language	TypeScript
UI Library	React 19.2
Styling	Tailwind CSS & Global CSS
Data Fetching / API State	TanStack Query (React Query) v5
Global UI State	Zustand
Form Handling	React Hook Form (custom validation)
Schema Validation	Zod
Testing	Vitest, React Testing Library (RTL), Mock Service Worker (MSW)
Notifications	Sonner
Icons	Lucide-react
🏃 How to Run Locally
1️⃣ Clone the Repository
git clone [Your Repository URL]
cd [your-repo-name]

2️⃣ Install Dependencies
npm install

3️⃣ Create Environment File

Create a .env file in the root directory and add the following line:

NEXT_PUBLIC_API_BASE_URL="https://6852821e0594059b23cdd834.mockapi.io"

4️⃣ Run the Development Server
npm run dev


Then open http://localhost:3000
 in your browser.

🧪 Running Tests

This project uses Vitest for unit and integration testing.
To run all tests:

npm run test

🧠 Challenges Faced & Solutions
🧩 Challenge 1: Inconsistent & “Dirty” API Data

Problem:
The mock API returned inconsistent data:

Some items had flat properties (restaurantName), others had nested ones (restaurant.name).

Mixed data types (e.g., "price": "15.99" vs rating: 4.5).

Boolean status represented in multiple ways (open: true, status: "Open", restaurant.isOpen: true).

Solution – Data Normalization:
Implemented a normalizeFood utility that transforms inconsistent ApiFood objects into a clean CleanFood format.
We applied this transformation via the select option inside the useGetFoods TanStack Query hook — ensuring UI components always receive normalized, predictable data.

🔄 Challenge 2: Stale Data After Mutations

Problem:
After adding, updating, or deleting an item, the API succeeded, but the page displayed stale data.

Solution – Query Invalidation:
Used useMutation for CUD operations and called

queryClient.invalidateQueries({ queryKey: ["foods"] })


inside onSuccess.
This forced TanStack Query to refetch the latest data, keeping the UI perfectly in sync.

🔔 Challenge 3: Global Error & Success Feedback

Problem:
We needed a unified feedback system for all API actions without repeating toast logic everywhere.

Solution – Global QueryClient Configuration:
Configured a central QueryClient in src/lib/query-client.ts with:

queryCache.onError → handles failed queries globally.

defaultOptions.mutations.onError / .onSuccess → handles all mutation feedback.

This centralized toast logic using Sonner, making the components cleaner and reducing repetition.
