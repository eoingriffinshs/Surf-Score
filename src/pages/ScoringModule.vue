<template>
  <div>
    <!-- Display the competition name if it exists, otherwise show a loading message -->
    <h2 v-if="competition">Scoring for {{ competition.competitionName }}</h2>
    <div v-else>Loading...</div>

    <!-- Render the participant icons and the score submission button when the competition data is loaded -->
    <div v-if="competition">
      <div class="icon-container">

        <!-- Loop through each participant and display their icon -->
        <div v-for="(participant, index) in competition.participants" :key="index" class="participant-icon">
          <!-- Open the popup to score the participant when clicked -->
          <i
              class="bi-person-square icon"
              :style="{ color: participant.color }"
              @click="openScorePopup(index)"
          ></i>
        </div>
        <button class="btn btn-primary mt-3" @click="submitScores">Submit Scores</button>
      </div>

      <div v-if="showPopup" class="popup">
        <div class="popup-content">
          <h4 >
            Participant {{ selectedParticipantIndex + 1 }}
          </h4>
          <div v-for="(score, scoreIndex) in selectedParticipant.scores" :key="scoreIndex" class="mb-1">
            <label :for="'score' + selectedParticipantIndex + '-' + scoreIndex">Score {{ scoreIndex + 1 }}</label>
            <input
                type="number"
                v-model.number="selectedParticipant.scores[scoreIndex]"
                :id="'score' + selectedParticipantIndex + '-' + scoreIndex"
                class="form-control"
                :min="-10"
                :max="10"
                @input="validateScore(selectedParticipantIndex, scoreIndex)"
            />
          </div>
          <!-- Button to add a new score to the participant -->
          <button class="btn btn-secondary mt-2" @click="addScore(selectedParticipantIndex)">Add Score</button>
          <!-- Button to close the popup -->
          <button class="btn btn-danger mt-3" @click="closePopup">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>




<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/Firebase/config.js'; // Import the Firestore database config
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Firestore methods for getting and updating documents
import { useRoute, useRouter } from 'vue-router'; // Import route and router for navigation

// Reactive variables
const competition = ref(null); // Store the competition data
const route = useRoute(); // Get the current route
const router = useRouter(); // Router instance for navigation
const showPopup = ref(false); // Show/hide the popup
const selectedParticipantIndex = ref(null); // Index of the selected participant
const selectedParticipant = ref(null); // Data of the selected participant

// Fetch the competition data from Firestore based on the competition ID
const fetchCompetition = async (id) => {
  console.log(`Fetching competition with ID: ${id}`);
  try {
    const docRef = doc(db, 'competitions', id); // Reference to the competition document
    const docSnap = await getDoc(docRef); // Fetch the document data
    if (docSnap.exists()) {
      const competitionData = docSnap.data(); // Get competition data
      competitionData.participants = competitionData.participants.map((participant) => {
        if (!participant.scores) {
          participant.scores = []; // Initialize scores array if not present
        }
        return participant;
      });
      competition.value = competitionData; // Store competition data in reactive variable
    } else {
      console.log('No such document!');
    }
  } catch (error) {
    console.error('Error fetching competition: ', error);
  }
};

// Add a new score input for the selected participant
const addScore = (participantIndex) => {
  competition.value.participants[participantIndex].scores.push(0); // Push a new score with value 0
};

// Open the popup to input scores for the selected participant
const openScorePopup = (index) => {
  selectedParticipantIndex.value = index; // Store the index of the selected participant
  selectedParticipant.value = { ...competition.value.participants[index] }; // Clone the participant data
  showPopup.value = true; // Show the popup
};

// Close the popup without saving changes
const closePopup = () => {
  showPopup.value = false; // Hide the popup
};

// Validate the score input to ensure it's between -10 and 10
const validateScore = (participantIndex, scoreIndex) => {
  const score = selectedParticipant.value.scores[scoreIndex]; // Get the score
  if (score < -10) {
    selectedParticipant.value.scores[scoreIndex] = -10; // Set minimum score to -10
  } else if (score > 10) {
    selectedParticipant.value.scores[scoreIndex] = 10; // Set maximum score to 10
  }
};

// Submit the updated scores to Firestore and navigate to the scoring page
const submitScores = async () => {
  try {
    competition.value.participants[selectedParticipantIndex.value] = selectedParticipant.value; // Update the participant's scores in the competition data
    const docRef = doc(db, 'competitions', route.params.id); // Reference to the competition document
    await updateDoc(docRef, { participants: competition.value.participants }); // Update the document in Firestore
    alert('Scores submitted successfully!'); // Notify the user
    closePopup(); // Close the popup
    router.push('/scoring'); // Navigate to the scoring page
  } catch (error) {
    console.error('Error submitting scores: ', error);
  }
};

// Fetch the competition data when the component is mounted
onMounted(() => {
  console.log('Component mounted. Fetching competition...');
  fetchCompetition(route.params.id);
});
</script>

<style scoped>
.icon-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 20px 0;
}

.participant-icon {
  cursor: pointer;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: rgba(68, 137, 201, 0.62); /* Popup background color */
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
</style>