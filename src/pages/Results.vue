<template>
  <div class="container-fluid min-vh-100 d-flex flex-column">
    <div class="row flex-grow-1">
      <!-- Sidebar Navigation -->
      <div class="col-sm-auto bg-light sticky-top">
        <Navigation /> <!-- Navigation component for the sidebar -->
      </div>

      <!-- Main Content Area -->
      <div class="col p-3">
        <!-- Single Column in the First Row for Section Title -->
        <div class="row">
          <div class="col">
            <h1>Results Section</h1> <!-- Main section header -->
          </div>
        </div>

        <!-- Second Row for displaying a table of past competitions -->
        <div class="row mt-3">
          <div class="col">
            <h2>Past Competitions</h2> <!-- Subheader for the table -->
            <table class="table table-striped">
              <thead>
              <tr>
                <th scope="col">Competition Name</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Number of Participants</th>
              </tr>
              </thead>
              <tbody>
              <!-- Loop through competitions and display details in each row -->
              <tr v-for="competition in competitions" :key="competition.id" @click="navigateToResults(competition.id)">
                <td>{{ competition.competitionName }}</td> <!-- Competition name -->
                <td>{{ competition.dateTime.toLocaleDateString('en-GB') }}</td> <!-- Competition date (formatted) -->
                <td>{{ competition.dateTime.toLocaleTimeString() }}</td> <!-- Competition time (formatted) -->
                <td>{{ competition.numParticipants }}</td> <!-- Number of participants -->
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
import Navigation from "@/components/Navigation.vue"; // Importing the navigation component
import { db } from '@/Firebase/config.js'; // Firebase Firestore database import
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore query and document fetching
import { ref, onMounted } from 'vue'; // Vue.js reactive reference and lifecycle hook
import { useRouter } from 'vue-router'; // Vue router for navigation

const competitions = ref([]); // Reactive reference to store competition data
const router = useRouter(); // Vue router instance for navigation

// Function to fetch past competitions from Firestore
const fetchCompetitions = async () => {
  try {
    // Query competitions that have already occurred (dateTime is less than or equal to current date)
    const q = query(collection(db, 'competitions'), where('dateTime', '<=', new Date()));
    const querySnapshot = await getDocs(q); // Fetch the documents based on the query

    // Map each document into a competition object
    competitions.value = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id, // Include the document ID
        ...data, // Spread competition data
        dateTime: data.dateTime.toDate() // Convert Firestore Timestamp to JavaScript Date object
      };
    });
  } catch (error) {
    console.error("Error fetching competitions: ", error); // Log any errors
  }
};

// Function to navigate to the competition results page
const navigateToResults = (competitionId) => {
  router.push(`/results/${competitionId}`); // Redirect to the results page for the selected competition
};

// Lifecycle hook: Fetch competitions when the component is mounted
onMounted(() => {
  fetchCompetitions(); // Call the function to fetch competition data
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
  cursor: pointer; /* Change cursor to pointer for clickable rows */
}
</style>
