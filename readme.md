# Street Art Map Prototype

## Overview

This project is a prototype for a **Street Art Map** application. It allows users to explore street art locations on an interactive map, view detailed information about each location, and navigate dynamically using WebSocket updates. The app is built using **React**, **Mapbox GL**, and a **Node.js Express** backend.

## Features

- Interactive map with **Mapbox GL** integration.
- Dynamic WebSocket updates to focus on specific map points.
- Modal popups for detailed information about street art locations.
- Language switcher for multilingual support (English, Spanish, German).
- QR code for accessing the controller interface.
- Responsive design with custom styles.

## Project Structure

### Frontend
- **Framework**: React
- **Styling**: CSS modules and custom styles
- **Applications**:
  - `projection-app`: Displays the map and handles WebSocket updates.
  - `control-app`: Provides a controller interface for managing the map.
- **Key Components**:
  - `App.jsx`: Main application logic for both apps.
  - `HomeButton.jsx`: Navigation button to return to the home screen.
  - `GlobalLayout.jsx`: Layout wrapper for the control app.
  - `LanguageContext`: Context for managing translations.
- **Libraries**:
  - `mapbox-gl`: For map rendering and interactivity.
  - `qrcode.react`: For generating QR codes.
  - `react-router-dom`: For routing in the control app.

### Backend
- **Language**: Node.js
- **Framework**: Express
- **Features**:
  - REST API to fetch street art cases.
  - WebSocket server for real-time updates.
  - Serves static images for the map.

## Installation

### Prerequisites
- **Node.js** and **npm** installed.

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies for both frontend and backend:
   ```bash
   npm install
   cd projection-app
   npm install
   cd ../control-app
   npm install
   ```
3. Start the backend server:
   ```bash
    cd api
    npm start
    ```
4. Start the frontend applications:
5. For the projection app:
   ```bash
   cd projection-app
   npm start
   ```
   For the control app:
   ```bash
   cd control-app
   npm start
   ```
6. Open your browser and navigate to:
7. Projection App: `http://localhost:3000`
   Control App: `http://localhost:3001`
8. Scan the QR code in the control app to access the controller interface.
9. Use the language switcher to change the app's language.
10. Explore the map and interact with street art locations.
