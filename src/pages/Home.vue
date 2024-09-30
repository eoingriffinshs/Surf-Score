<template>
  <div class="container-fluid min-vh-100 d-flex flex-column">
    <!-- Top Ribbon for Small Screens -->
    <div class="top-nav d-sm-flex d-lg-none justify-content-between p-2 bg-light">
      <div class="icon-container" @click="navigateTo('/scoring')">
        <i class="bi-speedometer2 icon"></i>
        <p>Scoring</p>
      </div>
      <div class="icon-container" @click="navigateTo('/results')">
        <i class="bi-table icon"></i>
        <p>Results</p>
      </div>
      <div class="icon-container" @click="navigateTo('/new-competition')">
        <i class="bi-database-add icon"></i>
        <p>New Competition</p>
      </div>
      <div class="icon-container" @click="navigateTo('/edit-competitions')">
        <i class="bi-people icon"></i>
        <p>Edit Competitions</p>
      </div>
    </div>

    <div class="row flex-grow-1">
      <!-- Sidebar for Large Screens (removed in small view) -->
      

      <!-- Main Content Area (remains visible on all screen sizes) -->
      <main class="col p-3 min-vh-100">
        <h1>Welcome to the Competition Management System</h1>
        <p>This platform helps you manage competitions, participants, scoring, and results seamlessly. Here's what each section of the navigation menu is for:</p>

        <!-- Icons and Descriptions with Navigation -->
        <div class="row mb-4" @click="navigateTo('/scoring')" style="cursor: pointer;">
          <div class="col-auto">
            <i class="bi-speedometer2 icon"></i>
          </div>
          <div class="col">
            <h3>Scoring</h3>
            <p>The Scoring section allows you to input and track scores for participants in ongoing competitions.</p>
          </div>
        </div>

        <div class="row mb-4" @click="navigateTo('/results')" style="cursor: pointer;">
          <div class="col-auto">
            <i class="bi-table icon"></i>
          </div>
          <div class="col">
            <h3>Results</h3>
            <p>In the Results section, you can view the outcomes of past competitions, including detailed scores and rankings.</p>
          </div>
        </div>

        <div class="row mb-4" @click="navigateTo('/new-competition')" style="cursor: pointer;">
          <div class="col-auto">
            <i class="bi-database-add icon"></i>
          </div>
          <div class="col">
            <h3>New Competition</h3>
            <p>Use the New Competition section to create and set up a new competition, including specifying the number of participants and schedule.</p>
          </div>
        </div>

        <div class="row mb-4" @click="navigateTo('/edit-competitions')" style="cursor: pointer;">
          <div class="col-auto">
            <i class="bi-people icon"></i>
          </div>
          <div class="col">
            <h3>Edit Competitions</h3>
            <p>This section lets you edit details of existing competitions, such as participant information like their bib color and competition settings.</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>



<script setup>
import { useRouter } from 'vue-router'; // Import Vue Router

// Initialize Vue Router
const router = useRouter();

// Function to handle navigation to different routes
const navigateTo = (route) => {
  router.push(route);  // Push the route to Vue Router for navigation
};
</script>


<style scoped>
/* Full height layout for container and rows */
.container-fluid {
  display: flex;
  height: 100vh;
}

.row {
  flex-grow: 1;
}

main {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

/* Top navigation bar (ribbon) for small screens */
.top-nav {
  display: flex;
  justify-content: space-around;
  padding: 0.5rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
}

/* Icon container for navigation buttons */
.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.icon-container p {
  margin: 0;
  font-size: 0.75rem;
}

.icon {
  font-size: 2rem;
  color: #007bff;
}

/* Icons and Content for large screens */
.d-lg-flex {
  display: flex;
}

/* Styling for small screens */
@media (max-width: 992px) {
  .d-lg-none {
    display: none !important;
  }

  main {
    padding-top: 60px; /* Space for top ribbon */
  }
}

/* Hide the sidebar and use top navigation on small screens */
@media (min-width: 992px) {
  .top-nav {
    display: none;
  }
}
</style>
