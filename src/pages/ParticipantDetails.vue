<template>
  <!-- Main container with full viewport height -->
  <div class="container-fluid min-vh-100 d-flex flex-column">
    <div class="row flex-grow-1">
      <!-- Sidebar Navigation -->
      <div class="col-sm-auto bg-light sticky-top">
        <!-- Sidebar navigation component -->
        <Navigation />
      </div>

      <!-- Main Content Area -->
      <main class="col p-3 min-vh-100">
        <!-- Conditional rendering: If competition data exists, show the competition title -->
        <h1 v-if="competition">Enter Participant Details for {{ competition.competitionName }}</h1>
        <!-- If competition data is still loading, show a loading message -->
        <div v-else>Loading...</div>

        <!-- If competition data exists, show participant input forms -->
        <div v-if="competition">
          <!-- Loop through participants and create a form for each one -->
          <div v-for="(participant, index) in participants" :key="index" class="row mb-3 align-items-center">
            <!-- Display contestant number -->
            <div class="col-auto">
              <h3 class="mb-0">Contestant {{ index + 1 }}</h3>
            </div>
            <!-- Input field for participant's name -->
            <div class="col-auto">
              <label :for="'name' + index" class="form-label">Name</label>
              <input type="text" v-model="participant.name" :id="'name' + index" class="form-control form-control-sm" />
            </div>
            <!-- Input field for participant's bib color -->
            <div class="col-auto">
              <label :for="'color' + index" class="form-label">Bib Color</label>
              <input type="color" v-model="participant.color" :id="'color' + index" class="form-control form-control-sm" />
            </div>
          </div>
          <!-- Button to submit the participant details -->
          <button class="btn btn-primary mt-3" @click="submitParticipantDetails">Submit Participant Details</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Navigation from "@/components/Navigation.vue";  // Importing the sidebar navigation component
import { ref, onMounted } from 'vue';  // Importing Vue's ref for reactive variables and onMounted for lifecycle hook
import { db } from '@/Firebase/config.js';  // Import Firebase Firestore configuration
import { doc, getDoc, updateDoc } from 'firebase/firestore';  // Import Firestore methods for document retrieval and updating
import { useRoute, useRouter } from 'vue-router';  // Importing Vue Router for route handling

// Reactive variables
const competition = ref(null);  // Stores the competition data
const participants = ref([]);  // Stores the participants data
const route = useRoute();  // Accessing the current route
const router = useRouter();  // Router instance for programmatic navigation

// Function to fetch the competition details based on the route's ID
const fetchCompetition = async (id) => {
  try {
    const docRef = doc(db, 'competitions', id);  // Reference to the competition document
    const docSnap = await getDoc(docRef);  // Fetching the competition document
    if (docSnap.exists()) {
      const competitionData = docSnap.data();  // Extracting the competition data
      competition.value = competitionData;  // Setting the competition data

      // Initialize participants if they do not exist yet
      if (!competitionData.participants) {
        participants.value = Array.from({length: parseInt(competitionData.numParticipants)}, () => ({
          name: "",  // Default name is an empty string
          color: "#ffffff",  // Default color is white
          scores: []  // Empty array for scores
        }));
      } else {
        // If participants exist, set the participant data, ensuring a default color if not present
        participants.value = competitionData.participants.map(participant => ({
          ...participant,
          color: participant.color || "#ffffff"  // Default to white if no color is set
        }));
      }
    } else {
      console.log('No such document!');  // Log message if no document is found
    }
  } catch (error) {
    console.error('Error fetching competition: ', error);  // Log error if document fetching fails
  }
};

// Function to submit the participant details to Firestore
const submitParticipantDetails = async () => {
  try {
    const docRef = doc(db, 'competitions', route.params.id);  // Reference to the competition document
    await updateDoc(docRef, {participants: participants.value});  // Update the document with the participants data
    router.push(`/scoring/${route.params.id}`);  // Navigate to the scoring page after submission
  } catch (error) {
    console.error('Error submitting participant details: ', error);  // Log error if updating the document fails
  }
};

// Fetch the competition details when the component is mounted
onMounted(() => {
  fetchCompetition(route.params.id);
});
</script>

<style scoped>
/* Scoped styles specific to this component */
</style>
