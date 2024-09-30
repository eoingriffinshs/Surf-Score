<template>
  <div class="container-fluid min-vh-100 d-flex flex-column">
    <div class="row flex-grow-1">
      <!-- Sidebar Navigation -->
      <div class="col-sm-auto bg-light sticky-top">
        <Navigation /> <!-- Sidebar navigation component -->
      </div>

      <!-- Main Content Area -->
      <div class="col p-3">
        <!-- First Row with the Section Title -->
        <div class="row">
          <div class="col">
            <h1>Scoring Section</h1> <!-- Main header for the scoring section -->
          </div>
        </div>

        <!-- Second Row for displaying Future Competitions in a table -->
        <div class="row mt-3">
          <div class="col">
            <h2>Future Competitions</h2> <!-- Subheader for the future competitions -->
            <table class="table table-striped">
              <thead>
              <tr>
                <th scope="col">Competition Name</th> <!-- Column header for competition name -->
                <th scope="col">Date</th> <!-- Column header for competition date -->
                <th scope="col">Time</th> <!-- Column header for competition time -->
                <th scope="col">Number of Participants</th> <!-- Column header for number of participants -->
              </tr>
              </thead>
              <tbody>
              <!-- Loop through competitions and display each competition's details -->
              <tr v-for="competition in competitions" :key="competition.id" @click="navigateToScoring(competition.id)">
                <td>{{ competition.competitionName }}</td> <!-- Display competition name -->
                <td>{{ competition.dateTime.toLocaleDateString('en-GB') }}</td> <!-- Display formatted competition date -->
                <td>{{ competition.dateTime.toLocaleTimeString() }}</td> <!-- Display formatted competition time -->
                <td>{{ competition.numParticipants }}</td> <!-- Display number of participants -->
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navigation from "@/components/Navigation.vue"; // Import the Navigation component
import { db } from '@/Firebase/config.js'; // Import Firebase Firestore database config
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore functions for querying data
import { ref, onMounted } from 'vue'; // Vue.js reactive reference and lifecycle hook
import { useRouter } from 'vue-router'; // Vue router for navigation

// Reactive reference to store future competitions data
const competitions = ref([]);
const router = useRouter(); // Vue router instance for navigation

// Fetch future competitions from Firestore
const fetchCompetitions = async () => {
  try {
    // Query competitions where the competition date is greater than the current date (i.e., future competitions)
    const q = query(collection(db, 'competitions'), where('dateTime', '>', new Date()));
    const querySnapshot = await getDocs(q); // Get documents based on the query

    // Map each Firestore document into a competition object
    competitions.value = querySnapshot.docs.map(doc => {
      const data = doc.data(); // Extract data from each document
      return {
        id: doc.id, // Get document ID for referencing
        ...data, // Spread the remaining competition data
        dateTime: data.dateTime.toDate() // Convert Firestore Timestamp to JavaScript Date object
      };
    });
  } catch (error) {
    console.error("Error fetching competitions: ", error); // Log any errors that occur during fetching
  }
};

// Navigate to the scoring page for the selected competition
const navigateToScoring = (competitionId) => {
  router.push(`/scoring/${competitionId}`); // Push route to the scoring page with the competition ID
};

// Lifecycle hook: Fetch competitions when the component is mounted
onMounted(() => {
  fetchCompetitions(); // Call the function to fetch future competitions
});
</script>

<style scoped>
html, body {
  height: 100%; /* Ensure full height for the layout */
  margin: 0;
  padding: 0;
}

.container-fluid {
  display: flex;
  flex-direction: column; /* Column layout for the container */
  height: 100%; /* Full height layout */
}

.row {
  flex-grow: 1; /* Allow rows to grow and fill space */
}

.bg-light {
  background-color: #f8f9fa; /* Light background color for the sidebar */
}

h1, h2 {
  margin: 0; /* Remove default margins */
  padding: 1rem 0; /* Add padding for section titles */
}

table tbody tr {
  cursor: pointer; /* Change cursor to pointer for clickable table rows */
}
</style>
