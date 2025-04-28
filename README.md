## 🏨 Hotel Booking Application

A full-stack web development project that allows users to create accounts, upload profile pictures, browse and book hotel properties, post reviews, make payments via Razorpay, and receive booking confirmation emails. Property owners can also list their hotels/restaurants on the platform.

---

## ✨ Features

- User registration (Sign Up) and Login
- User profile creation and picture upload
- Property listing with images and editing property details by hotel/restaurant owners
- Users can filter hotels, select dates, choose number of guests, and book stays.
- Users can cancel their Bookings as well
- Integrated Razorpay payment gateway for secure payments
- Review and rating system for properties
- Email confirmation upon successful booking
- Responsive and user-friendly UI

---

## 🛠️ Tech Stack

**Frontend:**  
- HTML, CSS, JavaScript  
- React.js  
- Tailwind CSS  

**Backend:**  
- Node.js  
- Express.js  

**Database:**  
- MongoDB (with Mongoose)/ Atlas

**Other Integrations:**  
- Razorpay (Payment Gateway)  
- Nodemailer (Email service for booking confirmation)
- Multer (for image uploads)

---

## 🧩 Dependencies

**Backend-side:**
- express – Web framework
- mongoose – MongoDB object modeling
- bcryptjs – Password hashing
- jsonwebtoken – Authentication
- nodemailer – Sending emails
- razorpay – Payment gateway integration
- cors – Enable Cross-Origin requests
- cookie-parser	- Parse and manage cookies in Express requests.
- dotenv -	Load environment variables from .env into process.env.
- morgan - request logger middleware for debugging and logging.


**Frontend-side:**
- @reduxjs/toolkit - Official, efficient Redux state management toolset.
- axios - Promise-based HTTP client for making API calls.
- react	- Frontend library for building user interfaces.
- react-dom	-	Serves as the entry point to the DOM for React apps.
- react-hook-form	-	Forms management in React apps with simple validation.
- react-redux	-	Official React bindings for Redux store.
- react-router-dom -	Declarative routing for React web apps.
- react-toastify - Toast notifications for React apps.

---

## 📁 Project Structure
```
Backend/
├── src/
│   ├── config/         # Configuration files (Razorpay, Email, etc.)
│   ├── controllers/    # Business logic
│   ├── db/             # MongoDB connection
│   ├── middleware/     # Auth middlewares
│   ├── model/          # Mongoose models
│   ├── routes/         # API routes
│   └── utils/          # Utility functions (Email sender, etc.)
├── server.js
├── .env.sample         # Environment variables template
├── package.json

Frontend/
├── src/
│   ├── api/            # Axios services (user, property, booking, payment, review)
│   ├── components/     # Reusable React components
│   ├── pages/          # Main Pages (Home, Properties, Profile, etc.)
│   ├── store/          # Actions , Reducers
│   ├── utils/          # Helper functions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── .env
├── package.json
```

---

## 🔑 Environment Variables (.env)

**Create a `.env` in both Frontend folder with the following variables:-**
```
NODEMAILER_APP_PASSWORD = your_nodemailer_password
NODEMAILER_MAIL = your_nodemailer_mail
VITE_RAZORPAY_KEY_ID = your_razorpay_key_id
VITE_RAZORPAY_KEY_ID_SECRET = your_razorpay_key_secret

```

**`.env` in Backend folder with the following variables:-**
```
MONGO_URL = your_mongodb_connection_string
JWT_SECRET_KEY = your_jwt_secret_key
RAZORPAY_KEY_ID = your_razorpay_key_id
RAZORPAY_SECRET_KEY = your_razorpay_key_secret
NODEMAILER_APP_PASSWORD = your_nodemailer_password
NODEMAILER_MAIL = your_nodemailer_mail
PORT = 8000
```
> ⚠️ Keep your `.env` file private and secure. **Not pushed into the GitHub.**

---

## 🛠️ Installation and Setup Instructions

### 1. Clone the repository
`
git clone https://github.com/Anshi-01/HotelApp
cd HotelApp
`

### 2. Install dependencies

**For the Backend:**
`
cd Backend
npm install
`

**For the Frontend:**
`
cd Frontend
npm install
`

---

### 3. Run the application

**Start the backend server:**
`
cd Backend
npx nodemon
`

**Start the frontend React app:**
`
cd Frontend
npm run dev
`


## 📸 Screenshots




---

## 🔗 Important Links

- **GitHub Repository:** [HotelApp](https://github.com/Anshi-01/HotelApp)

---

## ⚙️ Configurations

- Ensure MongoDB Atlas database is connected correctly.
- Razorpay account must be properly set up with API keys.
- Nodemailer requires a valid email address and password (preferably using App Passwords if using Gmail).

---

## 📢 Notes

- Ensure external libraries (Razorpay, MongoDB, Nodemailer) are properly referenced in the project.
- Environment variables should **NOT** be exposed publicly.

---

## 📩 Contact

For any queries, feel free to reach out:

- **Name:** [Anshika Srivastava]
- **Email:** [anshisrivastav16@gmail.com]
- **GitHub:** [Anshi-01](https://github.com/Anshi-01)

---
