@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: "Poppins", sans-serif;
  }
  body {
    @apply bg-[#fdfeff] flex justify-center items-center min-h-screen;
    overflow-x: hidden;
  }
}

@layer components {
  .page-container {
    @apply flex justify-center items-center w-full min-h-screen;
  }

  .card {
    @apply flex flex-col md:flex-row-reverse bg-white rounded-lg shadow-lg w-full max-w-6xl;
    margin: 16px; /* Added margin for spacing */
    min-height: 70vh; /* Ensure the card has a minimum height */
  }

  .right-section {
    @apply hidden md:flex flex-1 bg-cover bg-center relative;
    background-image: url("https://via.placeholder.com/500x500.png"); /* Replace with your image */
  }

  .overlay {
    @apply absolute text-white bottom-10 left-10;
  }

  .title {
    @apply text-2xl font-bold;
  }

  .subtitle {
    @apply mt-2 text-sm;
  }

  .left-section {
    @apply flex flex-col justify-center items-center p-8 flex-1 bg-white;
  }

  .login-title {
    @apply text-lg font-semibold mb-4;
  }

  .form {
    @apply w-full max-w-sm flex flex-col;
  }

  .input {
    @apply w-full p-3 mb-4 border border-gray-300 rounded-md;
  }

  .password-container {
    @apply relative flex items-center;
  }

  .login-button {
    @apply w-full p-3 bg-[#00a1b3] text-white font-bold rounded-md cursor-pointer;
  }

  .or-text {
    @apply my-4 text-gray-500;
  }

  .create-account-button {
    @apply w-full p-3 bg-[#e3f5f5] text-[#00a1b3] font-bold rounded-md cursor-pointer;
  }

  .error-text {
    @apply text-sm text-red-500 mt-2;
  }
}
