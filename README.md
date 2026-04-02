# SchoolCoreOS – Login & Selection Flow

A React-based application that demonstrates a complete authentication flow with:
- Institute selection
- Role-based access
- Dynamic navigation
- Theme persistence (Dark/Light)

---

## 🔗 Live Demo
https://loginselectionflow.netlify.app/

---

## 🔐 Test Credentials (Flow-wise)

### 1. Invalid Credentials
- Email: any wrong email  
- Password: wrong  
- Result: Incorrect credentials  

---

### 2. No Institute Associated
- Email: ayushnakade@scos.com  
- Password: 1234  
- Result: Error – Not associated with any institute  

---

### 3. One Institute + One Role
- Email: jameswilson@scos.com   
- Password: 1234  
- Flow: Login → Dashboard  

---

### 4. One Institute + Multiple Roles
- Email: emily.davis@scos.com  
- Password: 1234  
- Flow: Login → Role Selection → Dashboard  

---

### 5. Multiple Institute + Multiple Roles
- Email: michael.ross@scos.com  
- Password: 1234  
- Flow: Login → Institute Selection → Role Selection → Dashboard  

---

### 6. Multiple Institute + Single Role
- Email: sarah.parker@scos.com  
- Password: 1234  
- Flow: Login → Institute Selection → Dashboard  

---

## 🚀 Features

- Dynamic login flow handling
- Role-based navigation
- Multi-institute support
- Theme persistence across screens
- Clean UI with responsive design

---

## 🛠️ Tech Stack

- React.js
- React Router
- CSS Modules
- Context API (State Management)

---

## 📌 Notes

- All flows have been tested and are working as expected
- Theme (Dark/Light) persists across navigation

---

## 📂 Setup

```bash
npm install
npm start
