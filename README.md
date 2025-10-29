# The Infinite Leap Grid

An interactive web app that visualizes all years—past and future—in an infinite vertical grid.

Each year is shown as a cell in a 2D grid, numbered sequentially. Leap years are colored red, and non-leap years are green, against a dark-themed background with white wireframe borders. The grid is designed to be infinite, allowing you to scroll endlessly in either direction to explore BCE and CE years.

## Core Features

*   **Infinite Scroll:** Smooth, performant infinite scroll in both upward (BCE) and downward (CE) directions.
*   **Virtualized Grid:** Built with performance in mind, the grid uses virtualization to render only the visible years, ensuring no memory bloat.
*   **Accurate Leap Year Calculation:**
    *   Uses the Gregorian calendar rules for leap years.
    *   Applies Julian leap year rules for years before 1582.
    *   Correctly skips Year 0, jumping from -1 to 1.
*   **Special Year Highlights:** Key historical years are marked with a distinct style and tooltip to provide context, including:
    *   **-45:** Julius Caesar introduces the Julian calendar.
    *   **1582:** The Gregorian reform is introduced.
    *   **1752:** The British Empire adopts the Gregorian calendar.
    *   **2000:** A century leap year.
    *   **2100:** An upcoming non-leap century year.
*   **Era Indicator:** A floating indicator displays the current era (BCE/CE) as you scroll.
*   **Jump to Current Year:** A button to instantly navigate to the current year.

## Tech Stack

*   **Framework:** React (Vite)
*   **Styling:** TailwindCSS
*   **Virtualization:** `react-window`

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18 or later)
*   npm

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/dhawal-pandya/leap-years.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Start the development server
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:5173`.
