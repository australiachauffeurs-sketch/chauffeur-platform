/**
 * Sends an Expo push notification to a device token.
 * This is a server-side utility only (Node.js / Next.js API routes).
 *
 * Docs: https://docs.expo.dev/push-notifications/sending-notifications/
 */

export interface PushPayload {
  token:    string;
  title:    string;
  body:     string;
  data?:    Record<string, unknown>;
  sound?:   "default" | null;
  badge?:   number;
}

const EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

export async function sendPushNotification(payload: PushPayload): Promise<void> {
  const { token, title, body, data, sound = "default", badge } = payload;

  if (!token.startsWith("ExponentPushToken[")) {
    console.warn("[Push] Not a valid Expo push token:", token);
    return;
  }

  try {
    const res = await fetch(EXPO_PUSH_URL, {
      method:  "POST",
      headers: {
        "Accept":       "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to: token, title, body, data, sound, badge }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[Push] Expo push API error:", res.status, text);
    } else {
      const json = await res.json();
      if (json?.data?.status === "error") {
        console.error("[Push] Delivery error:", json.data.message);
      }
    }
  } catch (err) {
    console.error("[Push] Network error:", err);
  }
}

/** Sends a "new job" push to a driver. */
export async function notifyDriverNewJob(opts: {
  pushToken: string;
  bookingId: string;
  pickup:    string;
  amount:    number;
}) {
  await sendPushNotification({
    token: opts.pushToken,
    title: "🚗 New Job Available",
    body:  `Pickup: ${opts.pickup} · $${opts.amount.toFixed(2)}`,
    data:  { type: "new_job", bookingId: opts.bookingId },
    sound: "default",
  });
}
