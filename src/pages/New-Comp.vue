<script setup>
import { ref } from 'vue';  // Import Vue's reactive reference
import Navigation from "@/components/Navigation.vue";  // Import the Navigation component
import { db } from '/src/Firebase/config.js';  // Import the Firestore configuration
import { collection, addDoc } from 'firebase/firestore';  // Import Firestore methods for adding data

// Reactive variables for input fields
// These will store the input values entered by the user
const competitionName = ref('');  // To store the competition name
const numParticipants = ref('');  // To store the number of participants
const selectedDateTime = ref('');  // To store the selected date and time

// Function to handle form submission
const addCompetition = async () => {
  try {
    // Creating a competition object with the input field values
    const competitionData = {
      competitionName: competitionName.value,  // Name of the competition
      numParticipants: numParticipants.value,  // Number of participants
      dateTime: new Date(selectedDateTime.value)  // Convert selected date-time to a Date object
    };

    // Adding the competition data to the 'competitions' collection in Firestore
    await addDoc(collection(db, 'competitions'), competitionData);
    alert('Competition added successfully!');  // Alert on successful addition
  } catch (e) {
    console.error("Error adding competition: ", e);  // Log error if any occurs during submission
    alert('Error adding competition');  // Alert the user about the error
  }
};
</script>

<template>
  <!-- Main container with full viewport height -->
  <div class="container-fluid min-vh-100 d-flex flex-column">
    <div class="row flex-grow-1">
      <!-- Sidebar Navigation -->
      <div class="col-sm-auto bg-light sticky-top">
        <Navigation />  <!-- Renders the sidebar navigation component -->
      </div>

      <!-- Main Content Section -->
      <main class="col-sm p-3 min-vh-100 d-flex justify-content-center align-items-center">
        <!-- Form container with a shadow effect -->
        <div class="shadow-box">
          <h1>Competition Setup</h1>

          <!-- Competition Name Input Field -->
          <div class="input-group mb-3">
            <!-- Label for the input field -->
            <div class="input-group-prepend">
              <span class="input-group-text" id="medium">Competition Name</span>
            </div>
            <!-- Text input field for competition name -->
            <input type="text" v-model="competitionName" class="form-control">
          </div>

          <!-- Number of Participants Dropdown -->
          <div class="input-group mb-3">
            <select class="custom-select" v-model="numParticipants" id="select02">
              <!-- Placeholder option -->
              <option selected disabled>Choose...</option>
              <!-- Number of participants options -->
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="4">Four</option>
            </select>
            <!-- Label for the dropdown -->
            <div class="input-group-append">
              <label class="input-group-text" for="select02">Num Participants</label>
            </div>
          </div>

          <!-- Date and Time Input Field -->
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text">Date and Time</span>
            </div>
            <!-- Date-time picker input -->
            <input type="datetime-local" v-model="selectedDateTime" class="form-control">
          </div>

          <!-- Submit Button -->
          <div>
            <!-- Button to submit the form, preventing default behavior of anchor tag -->
            <a class="btn btn-primary" href="#" role="button" @click.prevent="addCompetition">
              <i class="bi bi-database-add"></i> Submit  <!-- Bootstrap icon for the button -->
            </a>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<!-- Scoped styling for the component -->
<style scoped>
/* Ensure the html and body take up full height */
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

/* Flexbox layout to ensure the container fills the height */
.container-fluid {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.row {
  flex-grow: 1;  /* Allows the row to expand and fill the remaining space */
}

main {
  display: flex;
  justify-content: center;  /* Center content horizontally */
  align-items: center;  /* Center content vertically */
}

/* Style the input group prepend */
.input-group-prepend {
  display: flex;
  align-items: center;  /* Vertically align the text inside the group */
}

/* Style the form container with shadow and background transparency */
.shadow-box {
  background-color: rgba(255, 255, 255, 0.6);  /* Transparent white background */
  padding: 2rem;  /* Padding inside the box */
  border-radius: 0.5rem;  /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  /* Subtle shadow for depth */
  border: 1px solid #ddd;  /* Light border around the box */
}
</style>
