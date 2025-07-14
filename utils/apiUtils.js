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

export const getItinerary = async (userId, sessionId) => {
  try {
    const response = await api.get(`/apps/maia/users/${userId}/sessions/${sessionId}`)
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('GET request failed:', error)
    throw error
  }
}

export const createItinerary = async (
  userId,
  sessionId) => {
  try {
    console.log("utils")
    console.log(`userid ${userId}`)
    console.log(`sessionid ${sessionId}`)
    console.log("end utils")
    const res = await api.post(`/run_sse`, {
      "appName": "maia",
      "userId": userId,
      "sessionId": sessionId,
      "newMessage": {
        "parts": [
          {
            "thought": false,
            "text": "create me itinerary"
          }
        ],
        "role": "user"
      },
      "streaming": false
    });

    return res;
  } catch (err) {
    console.error("Failed to fetch itinerary with prompt:", err);
    throw err;
  }
};

// pake ini kalo content type nya text stream
export async function fetchItinerarySSE(userId, sessionId) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2 * 60 * 1000); // 2 menit timeout

  try {
    const res = await fetch("https://mot-maia-engine-v2-928113580262.asia-southeast2.run.app/run_sse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "appName": "maia",
        "userId": userId,
        "sessionId": sessionId,
        "newMessage": {
          "parts": [
            {
              "thought": false,
              "text": "create me itinerary"
            }
          ],
          "role": "user"
        },
        "streaming": false
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // return res.status;

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";
    let myDatas = [];

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      const lines = buffer.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith("data:")) {
          const jsonString = line.slice(5).trim();
          if (jsonString === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonString);
            console.log("SSE Parsed:", parsed);
            myDatas.push(parsed);
          } catch (e) {
            console.log("Gagal parse JSON SSE:", e, jsonString);
          }
        }
      }
    }

    return myDatas;

  } catch (error) {
    clearTimeout(timeout);
    console.error("Fetch failed:", error);
    throw error;
  }
}

// export async function sendText(userId, sessionId, text) {
//   const controller = new AbortController();
//   const timeout = setTimeout(() => controller.abort(), 2 * 60 * 1000); // 2 menit timeout

//   try {
//     const res = await fetch("https://mot-maia-engine-v2-928113580262.asia-southeast2.run.app/run_sse", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         "appName": "maia",
//         "userId": userId,
//         "sessionId": sessionId,
//         "newMessage": {
//           "parts": [
//             {
//               "thought": false,
//               "text": text
//             }
//           ],
//           "role": "user"
//         },
//         "streaming": false
//       }),
//       signal: controller.signal,
//     });

//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }

//     const reader = res.body.getReader();
//     const decoder = new TextDecoder("utf-8");
//     let buffer = "";

//     while (true) {
//       const { done, value } = await reader.read();
//       if (done) break;

//       buffer += decoder.decode(value, { stream: true });

//       const lines = buffer.split("\n");
//       for (let i = 0; i < lines.length; i++) {
//         const line = lines[i].trim();
//         if (line.startsWith("data:")) {
//           const jsonString = line.slice(5).trim();
//           console.log(jsonString)
//           if (jsonString === "[DONE]") break;

//           try {
//             const parsed = JSON.parse(jsonString);
//             console.log(parsed)
//             // return parsed.content.parts[0].text;3
//           } catch (e) {
//             console.log("Gagal parse JSON SSE:", e, jsonString);
//           }
//         }
//       }
//     }

//   } catch (error) {
//     clearTimeout(timeout);
//     console.error("Fetch failed:", error);
//     throw error;
//   }
// }