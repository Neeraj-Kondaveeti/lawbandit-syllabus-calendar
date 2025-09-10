// src/utils/googleCalendar.ts

declare const gapi: any;
declare const google: any;

let isGapiLoaded = false;

/**
 * Initialize Google Calendar API client
 */
export async function initGoogleCalendar() {
  return new Promise<void>((resolve, reject) => {
    if (isGapiLoaded) return resolve();

    gapi.load("client", async () => {
      try {
        await gapi.client.init({
          apiKey: import.meta.env.VITE_GOOGLE_API_KEY, // optional but useful
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
        });
        isGapiLoaded = true;
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
}

/**
 * Sign in and get an access token using OAuth 2.0
 */
export async function signInToGoogle() {
  return new Promise<void>((resolve, reject) => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/calendar.events",
      callback: (resp: any) => {
        if (resp.error) {
          reject(resp);
        } else {
          gapi.client.setToken({ access_token: resp.access_token });
          console.log("✅ Signed in, received token:", resp);
          resolve();
        }
      },
    });

    client.requestAccessToken();
  });
}

/**
 * Add multiple events to Google Calendar
 */
export async function addEventsToGoogleCalendar(events: any[]) {
  if (!Array.isArray(events)) {
    console.error("❌ addEventsToGoogleCalendar expected an array, got:", events);
    throw new Error("Events must be an array");
  }

  await initGoogleCalendar();
  await signInToGoogle();

  for (const ev of events) {
    const event = {
      summary: ev.title,
      description: ev.details,
      start: { date: ev.dateKey }, // all-day event
      end: { date: ev.dateKey },
    };

    try {
      const response = await gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
      });
      console.log("📅 Event added:", response);
    } catch (err) {
      console.error("❌ Failed to insert event:", ev, err);
    }
  }

  alert("✅ Events added to your Google Calendar!");
}
