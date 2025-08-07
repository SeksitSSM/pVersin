# Firebase Authentication Project (CDN-based)

This is a simple, single-page web application that demonstrates user authentication and profile management using Firebase. It is built with plain JavaScript and uses CDNs for all major dependencies, including Tailwind CSS, Font Awesome, and Firebase itself.

## Features

- **User Registration:** Sign up with first name, last name, email, username, date of birth, password, and user level.
- **User Login:** Sign in using either email or username.
- **Profile Management:** View and edit your user profile information (name, DOB).
- **Dark/Light Mode:** Toggle between a light and dark theme. The preference is saved in local storage.
- **Bilingual Support (EN/TH):** Switch between English and Thai languages. The preference is saved in local storage.
- **No Build Step Required:** Runs directly in the browser without any installation or build process.

## How to Set Up and Run

1.  **Configure Firebase:**
    - Open the `script.js` file.
    - Find the `firebaseConfig` object at the top of the file.
    - Replace the placeholder values with your own Firebase project configuration. You can find this in your Firebase project settings.

2.  **Run the Application:**
    - Simply open the `index.html` file in any modern web browser.

That's it! The application should now be running and connected to your Firebase backend.
