import api from "./axios";

export const hitApiItinerary = async (userId, sessionId, destinationVal, budgetVal, travelWithVal, arrInterest, arrFoodPreference, startDateVal, endDateVal) => {
  try {
    const res = await api.post(`/apps/maia/users/${userId}/sessions/${sessionId}`, {
      "user:user_profile": {
        language_preference: "English"
      },
      destination: `${destinationVal}, Indonesia`,
      budget: budgetVal,
      travel_with: travelWithVal,
      interest: arrInterest,
      food_preference: arrFoodPreference,
      start_date: startDateVal,
      end_date: endDateVal
    });
    return res.status;
  } catch (err) {
    console.error("Failed to fetch:", err);
    throw err;
  }
}