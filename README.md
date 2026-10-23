# SKINSTRIC AI

### AI-Powered Facial Analysis Web Application

SKINSTRIC AI is a modern, responsive web application developed using React, Vite, and Tailwind CSS. The application allows users to capture or upload facial images and receive AI-generated demographic estimates through an interactive analysis dashboard.

Built as part of a frontend development internship, the project focuses on responsive design, API integration, dynamic user interfaces, custom animations, and an engaging user experience.

## Live Demo

**[View Live Website](https://jeremiah-skinstricai-internshipvercel-ckih3n8jt-bigboycode.vercel.app/)**

**[View GitHub Repository](https://github.com/overkill489/Jeremiah-SkinstricAi-Internship)**

## Features

### Responsive Design
- Fully responsive desktop, tablet, and mobile layouts
- Modern, minimalistic interface inspired by provided Figma designs
- Interactive diamond elements and hover effects
- Custom page entrance animations
- Smooth transitions and dynamic UI elements

### User Information Collection
- Interactive name and location input fields
- Automatic input focus for improved usability
- Form validation and submission handling
- Loading and confirmation states
- Integration with external backend services

### Camera Functionality
- Browser-based camera access
- Camera permission handling
- Live camera preview
- Photo capture and preview
- Retake photo functionality
- Camera cleanup when leaving the page
- Responsive camera experience

### Gallery Upload
- Upload images directly from a device
- Image file validation
- Support for common image formats
- Integration with the analysis workflow

### AI Analysis
- External AI service integration
- Image processing and submission
- Interactive loading animations
- Dynamic analysis results
- Error handling during API communication

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
| React | Building reusable UI components |
| Vite | Development environment and production builds |
| JavaScript | Application functionality |
| Tailwind CSS | Responsive layouts and styling |
| CSS | Custom animations and visual effects |
| React Router DOM | Client-side navigation |
| React Icons | User interface icons |
| Fetch API | Backend service communication |
| MediaDevices API | Camera access and photo capture |
| FileReader API | Image processing |
| Git & GitHub | Version control |
| Vercel | Application deployment |

## Application Workflow

### 1. Landing Page

The application begins with an animated landing experience featuring interactive diamond elements and smooth entrance animations.

Users can begin the analysis process by selecting **TAKE TEST** or **ENTER EXPERIENCE**.

### 2. Introduction

Users enter their name through an interactive input field.

The page includes animated diamond outlines, automatic input focus, and keyboard navigation.

### 3. Location

Users enter their location, which is submitted through the application's backend integration.

A confirmation screen appears after successful submission.

### 4. Image Selection

Users can choose between two methods of providing an image.

**Camera**
- Grant camera access
- View a live camera preview
- Capture a photo
- Review or retake the image
- Submit the selected photo for analysis

**Gallery**
- Choose an existing image
- Upload the selected image for analysis

### 5. Analysis Loading

The application prepares and submits the selected image to an external AI analysis service.

An animated loading interface provides feedback while the request is processed.

### 6. Analysis

The analysis interface displays four categories:

- Demographics
- Skin Type Details
- Cosmetic Concerns
- Weather

The Demographics section is currently functional. The remaining categories are included as part of the interface design.

### 7. Demographics

The Demographics dashboard displays AI-generated estimates and confidence scores.

Users can switch between demographic categories, inspect individual predictions, update selections, reset their choices, and confirm their results.

**Disclaimer:** AI-generated demographic predictions are estimates and should not be considered definitive information about an individual's identity or characteristics.

## Installation

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/overkill489/Jeremiah-SkinstricAi-Internship.git
```

### 2. Navigate to the Project

```bash
cd Jeremiah-SkinstricAi-Internship
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open the Application

Open the local development URL displayed in your terminal, typically:

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

## Design and Animations

The application incorporates custom animations to create an engaging user experience while maintaining the original design direction.

Key animations include:

- Cinematic Landing Page entrance
- Rotating dotted diamond elements
- Smooth input field reveals
- Camera and gallery entrance animations
- Staggered category animations
- Animated demographic confidence indicators
- Dashboard entrance effects
- Interactive hover transitions

Animations are implemented primarily through CSS and Tailwind CSS without relying on a dedicated animation library.

## Camera Requirements

Camera functionality requires:

- A compatible web browser
- A device with an available camera
- User permission to access the camera
- A secure HTTPS connection or localhost

Camera availability depends on browser and device permissions.

## Privacy Considerations

The application requests access to the camera only when users choose the camera option.

Users can review or retake captured photographs before submitting them for analysis.

Selected images and user-provided information are transmitted to external services as part of the analysis workflow.

Users should avoid submitting images or information they are not authorized to share.

## Deployment

The application is deployed using Vercel.

**Live Website:**  
https://jeremiah-skinstricai-internshipvercel-ckih3n8jt-bigboycode.vercel.app/

**GitHub Repository:**  
https://github.com/overkill489/Jeremiah-SkinstricAi-Internship

## Future Improvements

Potential future enhancements include:

- Implementation of additional analysis categories
- Expanded AI-powered analysis features
- Enhanced user feedback and accessibility
- Additional image validation
- Further performance optimizations

## Project Status

**Completed — Frontend Internship Project**

The implemented application supports the complete user journey from information collection through image capture or upload, AI analysis, and interactive demographic results.

## Author

**Jeremiah Austin**

Frontend Developer

Developed as part of a frontend development internship using React, Vite, JavaScript, and Tailwind CSS.