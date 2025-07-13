export function getOrCreateSessionId() {
  let sessionId = sessionStorage.getItem('sessionId');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('sessionId', sessionId);
  }
  return sessionId;
}

export function getOrCreateUserId() {
  let userId = sessionStorage.getItem('userId');
  if (!userId) {
    userId = crypto.randomUUID();
    sessionStorage.setItem('userId', userId);
  }
  return userId;
}
