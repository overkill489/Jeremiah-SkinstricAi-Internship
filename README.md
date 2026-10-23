# SKINSTRIC AI

### AI-Powered Skin Analysis Web Application

SKINSTRIC AI is a responsive web application built with React, Vite, and Tailwind CSS. It allows users to upload an image or capture a photo using their device's camera and receive AI-generated demographic predictions.

The application features a modern interface based on Figma designs, interactive animations, real API integration, and a detailed demographics dashboard.

## Live Demo

**[View Live Website](https://jeremiah-skinstricai-internshipvercel-ckih3n8jt-bigboycode.vercel.app/)**

**[View GitHub Repository](https://github.com/overkill489/Jeremiah-SkinstricAi-Internship)**

## Features

### Responsive User Interface
- Responsive layouts for desktop, tablet, and mobile devices
- Interactive diamond elements and custom CSS animations
- Smooth page entrance effects and hover interactions
- Design implementation based on Figma references

### User Information Collection
- Name and location input forms
- Automatic input focus
- Form validation
- Integration with the SKINSTRIC Phase One API
- Loading and submission confirmation screens

### Camera Integration
- Browser camera permission handling
- Live camera preview
- Photo capture functionality
- Photo retake and preview options
- Camera cleanup when navigating away
- Support for compatible desktop and mobile cameras

### Gallery Upload
- Upload images directly from a device
- Image file validation
- Base64 image conversion
- Integration with the AI analysis workflow

### AI Analysis
- Integration with the SKINSTRIC Phase Two API
- Real-time image submission
- Loading animations during analysis
- API response handling
- Navigation to analysis results

### Demographics Dashboard
- AI-generated race, age, and gender estimates
- Dynamic confidence percentages
- Animated circular confidence chart
- Interactive demographic category selection
- Individual confidence score selection
- Reset and confirmation functionality
- Responsive dashboard layout

## Technologies Used

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Development server and production builds |
| JavaScript | Application functionality |
| Tailwind CSS | Responsive layouts and styling |
| CSS Animations | Page transitions and visual effects |
| React Router DOM | Client-side routing |
| React Icons | Interface icons |
| Fetch API | Backend API communication |
| MediaDevices API | Browser camera access |
| FileReader API | Image-to-Base64 conversion |
| Vercel | Hosting and deployment |
| Git & GitHub | Version control and source code management |

## Application Workflow

### 1. Landing Page

Users are welcomed with an animated interface featuring the SKINSTRIC design and interactive navigation.

Selecting **TAKE TEST** or **ENTER EXPERIENCE** begins the analysis process.

### 2. Introduction

Users enter their name through an animated input interface.

The field automatically receives focus, and pressing Enter advances to the next page.

### 3. Location

Users enter their city or location.

The information is submitted to the Phase One API. After successful submission, a confirmation screen allows the user to continue.

### 4. Image Selection

Users choose between:

**Camera**
- Grant camera permission
- View the live camera feed
- Capture a photo
- Preview or retake the photo
- Submit the selected photo for analysis

**Gallery**
- Select an existing image from their device
- Upload the image for analysis

### 5. Analysis Loading

The selected image is converted into Base64 and submitted to the Phase Two API.

A loading interface is displayed while the application processes the request.

### 6. Analysis

The application displays four categories:

- Demographics
- Skin Type Details
- Cosmetic Concerns
- Weather

The Demographics section is functional. The remaining categories are displayed as part of the interface but are not currently implemented.

### 7. Demographics

Users can review the API-generated demographic predictions for race, age, and gender.

The page includes an animated confidence chart, confidence scores, category switching, RESET and CONFIRM controls, and navigation back to the analysis page.

**Note:** AI-generated demographic predictions are estimates and should not be treated as definitive information about an individual.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/overkill489/Jeremiah-SkinstricAi-Internship.git
```

**2. Navigate to the project directory**

```bash
cd Jeremiah-SkinstricAi-Internship
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the local development URL**

The terminal will display the address, typically:

```text
http://localhost:5173/
```

## Production Build

To generate an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

The application is deployed using Vercel.

## API Integration

SKINSTRIC AI uses two external API endpoints.

### Phase One — User Information

**Endpoint:**

```text
https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne
```

**Method:** POST

**Purpose:** Submit the user's name and location.

Example request:

```json
{
  "name": "Test User",
  "location": "Dallas"
}
```

### Phase Two — Image Analysis

**Endpoint:**

```text
https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo
```

**Method:** POST

**Purpose:** Submit an uploaded or captured image for AI analysis.

The image is converted into a Base64 string before submission.

Example request structure:

```json
{
  "image": "BASE64_IMAGE_DATA"
}
```

The API returns demographic prediction data, including age, gender, and race confidence scores.

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── DiamondButton.jsx
│   └── Navbar.jsx
├── pages/
│   ├── Landing.jsx
│   ├── Introduction.jsx
│   ├── Location.jsx
│   ├── ImageSelection.jsx
│   ├── Camera.jsx
│   ├── AnalysisLoading.jsx
│   ├── Analysis.jsx
│   └── Demographics.jsx
├── services/
│   └── skinstricApi.js
├── utils/
│   └── imageToBase64.js
├── App.jsx
├── index.css
└── main.jsx
```

## Camera Requirements

The camera feature uses the browser's MediaDevices API.

For camera functionality, users need:

- A compatible browser
- A working webcam or mobile camera
- Camera permissions enabled
- A secure HTTPS connection or localhost development environment

Camera functionality depends on the user's device and browser permissions.

Images selected for analysis are submitted to the external SKINSTRIC API.

## Design and Animations

The application recreates the provided Figma interface using React, Tailwind CSS, and custom CSS animations.

Animations include:

- Cinematic Landing Page entrance
- Animated dotted diamonds
- Smooth input and content reveals
- Camera and gallery entrance transitions
- Staggered Analysis category animations
- Demographics dashboard entrance effects
- Animated confidence percentages and circular charts

## Deployment

The application is hosted on Vercel.

**Live Application:**

https://jeremiah-skinstricai-internshipvercel-ckih3n8jt-bigboycode.vercel.app/

**Source Code:**

https://github.com/overkill489/Jeremiah-SkinstricAi-Internship

## Project Status

**Completed — Frontend Internship Project**

The application includes the full experience from information collection through image capture or upload, API analysis, and interactive demographic results.

Potential future improvements include implementing the remaining analysis categories and expanding the available AI analysis features.

## Author

**Jeremiah Austin**

Frontend Developer

Built as part of a frontend development internship project using React, Vite, Tailwind CSS, JavaScript, and external AI APIs.