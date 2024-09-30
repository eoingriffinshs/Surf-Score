<template>
  <div class="container-fluid min-vh-100 d-flex flex-column">
    <div class="row flex-grow-1">
      <!-- Sidebar Navigation -->
      <div class="col-sm-auto bg-light sticky-top">
        <Navigation /> <!-- Component for sidebar navigation -->
      </div>

      <!-- Main Content Area -->
      <main class="col p-3 d-flex flex-column">
        <div class="row flex-grow-1">
          <div class="col">
            <H1>Results Section</H1> <!-- Section header -->

            <!-- Show the competition name when data is loaded -->
            <h2 v-if="competition">Results for {{ competition?.competitionName }}</h2>
            <div v-else>Loading...</div> <!-- Display loading when data is being fetched -->

            <!-- Display results table when competition data is available -->
            <div v-if="competition">
              <table class="table table-striped">
                <thead>
                <tr>
                  <th scope="col">Participant</th>
                  <th scope="col" class="highlight-orange">Total of Top 3 Scores</th> <!-- Highlight top 3 scores total -->
                  <th scope="col" class="highlight-red">Total Negative Points</th> <!-- Highlight negative points -->
                  <th scope="col" class="highlight-green">Adjusted Total</th> <!-- Highlight adjusted total -->
                  <!-- Display headers for each score -->
                  <th v-for="n in maxScores" :key="'score-header-' + n" scope="col">Score {{ n }}</th>
                </tr>
                </thead>
                <tbody>
                <!-- Loop through participants and display their scores -->
                <tr v-for="participant in competition.participants" :key="participant.name">
                  <td>{{ participant.name }}</td> <!-- Participant's name -->
                  <td class="highlight-orange">{{ topScoresTotal(participant.scores) }}</td> <!-- Top 3 scores total -->
                  <td class="highlight-red">{{ totalNegativePoints(participant.scores) }}</td> <!-- Negative points total -->
                  <td class="highlight-green">{{ adjustedTotal(participant.scores) }}</td> <!-- Adjusted total -->

                  <!-- Loop through participant scores and display them, highlighting top scores -->
                  <td
                      v-for="(score, index) in participant.scores.slice(0, maxScores)"
                      :key="'score-' + index"
                      :class="{'table-success': topScores(participant.scores).includes(score)}"
                  >
                    {{ score || '' }} <!-- Display score or empty if not available -->
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/Firebase/config.js'; // Import Firebase Firestore
import { doc, getDoc } from 'firebase/firestore'; // Firestore methods for getting documents
import { useRoute } from 'vue-router'; // Router methods for fetching route params
import Navigation from "@/components/Navigation.vue"; // Navigation component

// Reactive references
const competition = ref(null); // Store competition data
const maxScores = ref(0); // Store the maximum number of scores found in participants

// Fetch competition data from Firestore
const route = useRoute(); // Get route params
const fetchCompetition = async (id) => {
  try {
    const docRef = doc(db, 'competitions', id); // Reference to Firestore document
    const docSnap = await getDoc(docRef); // Fetch document snapshot

    if (docSnap.exists()) {
      const competitionData = docSnap.data(); // Extract competition data

      // Ensure participants array is available and has scores
      if (competitionData.participants) {
        competitionData.participants = competitionData.participants.map((participant) => {
          if (!participant.scores) {
            participant.scores = []; // Initialize scores if not available
          }
          maxScores.value = Math.max(maxScores.value, participant.scores.length); // Track the max number of scores
          return participant;
        });
      } else {
        competitionData.participants = [];
      }

      competition.value = competitionData; // Set competition data
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error fetching competition: ', error); // Log any errors
  }
};

// Function to get the top 3 scores of a participant
const topScores = (scores) => {
  return [...scores].sort((a, b) => b - a).slice(0, 3); // Sort scores and return the top 3
};

// Function to calculate the total of top 3 scores
const topScoresTotal = (scores) => {
  return topScores(scores).reduce((sum, score) => sum + score, 0); // Sum top 3 scores
};

// Function to calculate total negative points
const totalNegativePoints = (scores) => {
  const negativePoints = scores.filter(score => score < 0).reduce((sum, score) => sum + score, 0); // Sum negative scores
  return Math.abs(negativePoints); // Return absolute value
};

// Function to calculate adjusted total (top 3 scores - negative points)
const adjustedTotal = (scores) => {
  const topTotal = topScoresTotal(scores); // Get top 3 scores total
  const negativePoints = totalNegativePoints(scores); // Get negative points
  return topTotal - negativePoints; // Calculate adjusted total
};

// Fetch competition data on component mount
onMounted(() => {
  const competitionId = route.params.id; // Get competition ID from route
  fetchCompetition(competitionId); // Fetch competition data
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
  background-color: #f8f9fa; /* Light background color */
}

h2 {
  margin: 0;
  padding: 1rem 0; /* Padding for section headers */
}

.table-success {
  background-color: #ddea04 !important; /* Highlight for top scores */
}

.highlight-orange {
  background-color: #f5a623 !important; /* Orange highlight */
}

.highlight-red {
  background-color: #f50418 !important; /* Red highlight */
}

.highlight-green {
  background-color: rgba(44, 255, 0, 0.47) !important; /* Green highlight */
}

.col.p-3 {
  padding-top: 0;
}

table {
  width: 100%;
}

td {
  vertical-align: middle; /* Align text to middle in table cells */
}
</style>
