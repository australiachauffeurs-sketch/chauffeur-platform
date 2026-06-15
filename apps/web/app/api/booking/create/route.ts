import { NextRequest, NextResponse } from "next/server";

async function createRecurringInstances(supabase: any, parentBooking: any, rule: string) {
  const dates: Date[] = [];
  const base = new Date(parentBooking.scheduled_at);

  if (rule.startsWith("weekly:")) {
    const days = rule.replace("weekly:", "").split(",");
    const dayMap: Record<string, number | null> = {
      sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
      thursday: 4, friday: 5, saturday: 6, daily: null,
    };

    if (days.includes("daily")) {
      // Weekdays for 8 weeks
      for (let w = 1; w <= 8; w++) {
        for (let d = 1; d <= 5; d++) {
          const date = new Date(base);
          date.setDate(base.getDate() + w * 7 - (base.getDay() - d));
          dates.push(new Date(date));
        }
      }
    } else {
      for (let w = 1; w <= 8; w++) {
        for (const day of days) {
          const targetDay = dayMap[day];
          if (targetDay === null || targetDay === undefined) continue;
          const date = new Date(base);
          date.setDate(base.getDate() + w * 7 + (targetDay - base.getDay() + 7) % 7);
          dates.push(date);
        }
      }
    }
  } else if (rule === "monthly:1") {
    for (let m = 1; m <= 3; m++) {
      const date = new Date(base);
      date.setMonth(date.getMonth() + m);
      dates.push(date);
    }
  }

  const { id: parentId, created_at: _created, ...parentRest } = parentBooking;
  const instances = dates.slice(0, 12).map(d => ({
    ...parentRest,
    scheduled_at:      d.toISOString(),
    parent_booking_id: parentId,
    is_recurring:      true,
    status:            "confirmed",
    payment_status:    "pending",
  }));

  if (instances.length) {
    await supabase.from("bookings").insert(instances);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      pickup, dropoff, bookingType, vehicleCategory,
      scheduledAt, passengers, luggage, specialRequests,
      flightNumber, distanceKm, durationMinutes, pricing,
      paymentMethod, isRecurring, recurrenceRule, waypoints,
    } = body;

    // Validate required fields
    if (!pickup || !dropoff) {
      return NextResponse.json({ error: "Pickup and dropoff are required." }, { status: 400 });
    }

    // Extract customer_id from session cookie (web) or Bearer token (mobile)
    let customerId: string | null = null;
    const ecUserCookie = req.cookies.get("ec_user")?.value;
    if (ecUserCookie) {
      try { customerId = JSON.parse(ecUserCookie).id ?? null; } catch {}
    }
    if (!customerId) {
      const authHeader = req.headers.get("authorization");
      const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
      if (token) {
        try {
          const { createClient: createAnonClient } = await import("@supabase/supabase-js");
          const anonClient = createAnonClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!
          );
          const { data: { user } } = await anonClient.auth.getUser(token);
          customerId = user?.id ?? null;
        } catch {}
      }
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // â”€â”€ Demo mode (no Supabase) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if (!supabaseUrl || supabaseUrl.includes("your-project") || (!serviceKey?.startsWith("eyJ") && !serviceKey?.startsWith("sb_secret_"))) {
      const mockId = `BK${Date.now().toString().slice(-6)}`;
      return NextResponse.json({
        bookingId: mockId,
        status: "confirmed",
        demo: true,
        message: "Booking created in demo mode",
        booking: {
          id: mockId,
          pickup, dropoff, bookingType, vehicleCategory,
          scheduledAt, passengers, luggage,
          distanceKm, total: pricing?.total,
        },
      });
    }

    // â”€â”€ Real Supabase insert â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, serviceKey);

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        customer_id:       customerId,
        booking_type:      bookingType || "airport_transfer",
        vehicle_category:  vehicleCategory || "sedan",
        status:            "confirmed",
        payment_method:    paymentMethod || "cash",
        payment_status:    "pending",
        scheduled_at:      scheduledAt,
        passengers:        passengers || 1,
        luggage:           luggage || 0,
        special_requests:  specialRequests,
        flight_number:     flightNumber,
        distance_km:       distanceKm,
        duration_minutes:  durationMinutes,
        pickup_address:    pickup,
        dropoff_address:   dropoff,
        base_charge:       pricing?.baseCharge,
        booking_fee:       pricing?.bookingFee,
        airport_surcharge: pricing?.airportSurcharge,
        after_hours_surcharge: pricing?.afterHoursSurcharge,
        gst:               pricing?.gst,
        total_amount:      pricing?.total,
        currency:          "AUD",
        is_recurring:      isRecurring || false,
        recurrence_rule:   isRecurring ? recurrenceRule : null,
        waypoints:         Array.isArray(waypoints) && waypoints.length > 0 ? waypoints : [],
      })
      .select("id, pickup_address, dropoff_address, scheduled_at, total_amount, vehicle_category, is_recurring, recurrence_rule, waypoints, passengers, luggage, booking_type, vehicle_category, distance_km, duration_minutes, payment_method, payment_status, flight_number, special_requests, customer_id, base_charge, booking_fee, airport_surcharge, after_hours_surcharge, gst, currency")
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: "Failed to create booking." }, { status: 500 });
    }

    // Create recurring instances (fire-and-forget)
    if (data && isRecurring && recurrenceRule) {
      (async () => {
        try {
          await createRecurringInstances(supabase, data, recurrenceRule);
        } catch (recErr) {
          console.error("[Recurring] Failed to create recurring instances:", recErr);
        }
      })();
    }

    // Send booking confirmation email (best effort / fire-and-forget)
    if (data) {
      const customerEmail: string | null = body.customerEmail || body.email || null;
      if (customerEmail) {
        (async () => {
          try {
            const { sendEmail, bookingConfirmationHtml } = await import("@repo/utils/email");
            await sendEmail({
              to: customerEmail,
              subject: "Booking Confirmed — Elite Chauffeurs",
              html: bookingConfirmationHtml({
                id: data.id,
                pickup_address: data.pickup_address ?? pickup,
                dropoff_address: data.dropoff_address ?? dropoff,
                scheduled_at: data.scheduled_at ?? scheduledAt,
                total_amount: data.total_amount ?? pricing?.total ?? 0,
                vehicle_category: data.vehicle_category ?? vehicleCategory,
              }),
            });
          } catch (emailErr) {
            console.error("[Email] Confirmation email failed:", emailErr);
          }
        })();
      }
    }

    // Fire-and-forget: notify available online drivers of the new job
    (async () => {
      try {
        const { notifyDriverNewJob } = await import("@repo/utils/push");
        const { data: onlineDrivers } = await supabase
          .from("drivers")
          .select("id, push_token")
          .eq("is_online", true)
          .not("push_token", "is", null)
          .eq("vehicle_category", vehicleCategory ?? "sedan")
          .limit(5);

        if (onlineDrivers?.length) {
          await Promise.all(
            onlineDrivers.map((d: any) =>
              notifyDriverNewJob({
                pushToken: d.push_token,
                bookingId: data.id,
                pickup:    pickup,
                amount:    pricing?.total ?? 0,
              })
            )
          );
        }
      } catch (pushErr) {
        // Non-fatal â€” booking still created successfully
        console.error("[Push] Failed to notify drivers:", pushErr);
      }
    })();

    return NextResponse.json({ bookingId: data.id, status: "confirmed" });
  } catch (err) {
    console.error("Booking create error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
