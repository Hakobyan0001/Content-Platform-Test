# Content Platform

## Overview

This project is a Single Page Application (SPA) that showcases a **virtualized masonry grid layout** for displaying photos fetched from the Pexels API. It includes a **detailed photo view** with additional information about each image, such as the photographer's name, description, and date taken. The application is built using **React** and **TypeScript**, with optimizations for performance and responsiveness.

## Features

- **Virtualized Masonry Grid**: Dynamically displays a large number of photos fetched from the Pexels API, ensuring smooth performance by rendering only the visible items.
- **Detailed Photo View**: Clicking on any photo opens a detailed view displaying a larger version of the image, along with additional metadata.
- **Search Functionality**: Search for photos by keywords, fetching data from the **Unsplash API**.
- **Responsive Design**: The application adapts to different screen sizes to provide a consistent experience across devices.
- **Performance Optimizations**: Implemented techniques such as `useMemo`, `useCallback`, and image optimization for faster load times and better web vitals.

## Technologies Used

- **React** (with hooks)
- **TypeScript**
- **Material UI**
- **Pexels API** (for photo data)
- **Unsplash API** (for search functionality)
- **Vitest** (for testing)
- **Vite** (for bundling)
- **ESLint** (for code linting)
- **Styled-components / Emotion** (for CSS-in-JS styling)

## Prerequisites

- **Node.js** version 22.3 (or later)

## Installation and Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Hakobyan0001/Content-Platform-Test
   cd content-platform

   ```

2. **Install dependencies**:

   ```bash
   npm install

   ```

3. **Create a .env file**:

   Copy the contents of the .env.example file and rename it to .env in the root directory of the project.

   ```bash
   cp .env.example .env
   ```

4. **Set your API keys**:

   Open the .env file and add your Pexels and Unsplash API keys:

   ```bash
   VITE_PEXELS_API_KEY=your-pexels-api-key
   VITE_UNSPLASH_ACCESS_KEY=your-unsplash-api-key
   ```

   Make sure to replace your-pexels-api-key and your-unsplash-api-key with your actual API keys.

5. **Run the development server**:

   This will start the development server, and you can view the application at http://localhost:3000.

   ```bash
   npm run dev
   ```

6. **Running Tests**:

   The project uses Vitest for unit testing. To run the tests, use the following command:

   ```bash
   npm run test
   ```
