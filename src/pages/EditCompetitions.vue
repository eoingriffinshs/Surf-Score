<template>
  <div class="container-fluid min-vh-100 d-flex flex-column">
    <div class="row flex-grow-1">
      <!-- Sidebar Navigation -->
      <div class="col-sm-auto bg-light sticky-top">
        <Navigation />
      </div>

      <!-- Main Content Area -->
      <div class="col p-3">
        <!-- Single Column in the First Row -->
        <div class="row">
          <div class="col">
            <h1>Edit Competitions</h1>
          </div>
        </div>

        <!-- Subsequent Row with Table for Competitions -->
        <div class="row mt-3">
          <div class="col">
            <h2>All Competitions</h2>
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
              <tr v-for="competition in competitions" :key="competition.id" @click="navigateToParticipantDetails(competition.id)">
                <td>{{ competition.competitionName }}</td>
                <td>{{ competition.dateTime.toLocaleDateString('en-GB') }}</td>
                <td>{{ competition.dateTime.toLocaleTimeString() }}</td>
                <td>{{ competition.numParticipants }}</td>
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
import Navigation from "@/components/Navigation.vue";
import { db } from '@/Firebase/config.js';
import { collection, getDocs } from 'firebase/firestore';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Ref for competitions data
const competitions = ref([]);
const router = useRouter();

// Fetch competitions from Firestore
const fetchCompetitions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'competitions'));
    competitions.value = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        dateTime: data.dateTime.toDate() // Convert Firestore Timestamp to Date
      };
    });
  } catch (error) {
    console.error("Error fetching competitions: ", error);
  }
};

// Navigate to participant details page
const navigateToParticipantDetails = (competitionId) => {
  router.push(`/participant-details/${competitionId}`);
};

// Fetch data on component mount
onMounted(() => {
  fetchCompetitions();
});
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.container-fluid {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.row {
  flex-grow: 1;
}

.bg-light {
  background-color: #f8f9fa;
}

h1, h2 {
  margin: 0;
  padding: 1rem 0;
}

table tbody tr {
  cursor: pointer;
}
</style>
