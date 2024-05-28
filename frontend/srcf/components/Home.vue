<template>
    <div class="home-container">
      <div class="welcome-message">
        <h1>Bienvenido al gestor de tareas</h1>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'HomePage'
  }
  </script>
  
  <style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh; /* Full viewport height */
  background-color: #fbf0f0; /* Match the drawer background color */
  padding: 20px;
  margin: 0;
}

.welcome-message {
  text-align: center;
  background: #fff; /* White background for the welcome message */
  padding: 40px;
  border-radius: 10px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.welcome-message h1 {
  font-size: 2.5em;
  color: #313131; /* Dark text color */
  margin: 0;
}

@media (max-width: 600px) {
  .welcome-message h1 {
    font-size: 2em; /* Adjust font size for smaller screens */
  }

  .home-container {
    padding: 10px;
  }
}
</style>