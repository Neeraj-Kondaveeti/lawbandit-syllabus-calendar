// src/utils/googleCalendar.ts

declare const gapi: any;
declare const google: any;

let isGapiLoaded = false;

export async function initGoogleCalendar() {
  return new Promise<void>((resolve, reject) => {
    if (isGapiLoaded) return resolve();

    gapi.load("client", async () => {
      try {
        await gapi.client.init({
          apiKey: import.meta.env.VITE_GOOGLE_API_KEY, // optional but helps
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

export async function signInToGoogle() {
  return new Promise<void>((resolve, reject) => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/calendar.events",
      callback: (resp: any) => {
        if (resp.error) {
          reject(resp);
        } else {
          gapi.client.setToken({ access_token: resp.access_token }); // ✅ fix
          console.log("Signed in, received token:", resp);
          resolve();
        }
      },
    });

    client.requestAccessToken();
  });
}

export async function addEventsToGoogleCalendar(events: any[]) {
  await initGoogleCalendar();
  await signInToGoogle();

  for (const ev of events) {
    const event = {
      summary: ev.title,
      description: ev.details,
      start: { date: ev.dateKey }, // all-day event
      end: { date: ev.dateKey },
    };

    await gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });
  }

  alert("✅ Events added to your Google Calendar!");
}
