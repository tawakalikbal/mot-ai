// export function getOrCreateSessionId() {
//   let sessionId = sessionStorage.getItem('sessionId');
//   if (!sessionId) {
//     sessionId = crypto.randomUUID();
//     sessionStorage.setItem('sessionId', sessionId);
//   }
//   return sessionId;
// }

// export function getOrCreateUserId() {
//   let userId = sessionStorage.getItem('userId');
//   if (!userId) {
//     userId = crypto.randomUUID();
//     sessionStorage.setItem('userId', userId);
//   }
//   return userId;
// }

import { v4 as uuidv4 } from 'uuid';

export function getOrCreateSessionId() {
  if (typeof window === 'undefined') return ''; // Prevent errors during SSR

  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

export function getOrCreateUserId() {
  if (typeof window === 'undefined') return ''; // Prevent errors during SSR

  let userId = sessionStorage.getItem('userId');
  if (!userId) {
    userId = uuidv4();
    sessionStorage.setItem('userId', userId);
  }
  return userId;
}
