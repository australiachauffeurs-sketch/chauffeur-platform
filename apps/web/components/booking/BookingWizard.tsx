"use client";

import { useState } from "react";
import Step1Location from "./Step1Location";
import Step2Vehicle  from "./Step2Vehicle";
import Step3Details  from "./Step3Details";
import Step4Confirm  from "./Step4Confirm";
import Step5Payment  from "./Step5Payment";

export type BookingData = {
  pickup:          string;
  pickupLat:       number;
  pickupLng:       number;
  dropoff:         string;
  dropoffLat:      number;
  dropoffLng:      number;
  bookingType:     string;
  vehicleCategory: string;
  scheduledAt:     string;
  passengers:      number;
  luggage:         number;
  specialRequests: string;
  flightNumber:    string;
  distanceKm:      number;
  durationMinutes: number;
  waypoints:       string[];
  isRecurring:     boolean;
  recurrenceRule:  string;
  pricing: {
    baseCharge:         number;
    bookingFee:         number;
    airportSurcharge:   number;
    afterHoursSurcharge:number;
    gst:                number;
    total:              number;
  } | null;
};

const STEPS = ["Location", "Vehicle", "Details", "Confirm", "Payment"];

const initialData: BookingData = {
  pickup:          "",
  pickupLat:       0,
  pickupLng:       0,
  dropoff:         "",
  dropoffLat:      0,
  dropoffLng:      0,
  bookingType:     "airport_transfer",
  vehicleCategory: "sedan",
  scheduledAt:     "",
  passengers:      1,
  luggage:         1,
  specialRequests: "",
  flightNumber:    "",
  distanceKm:      0,
  durationMinutes: 0,
  waypoints:       [],
  isRecurring:     false,
  recurrenceRule:  "weekly:monday",
  pricing:         null,
};

export default function BookingWizard() {
  const [step,      setStep]      = useState(0);
  const [data,      setData]      = useState<BookingData>(initialData);
  const [bookingId, setBookingId] = useState<string>("");   // set when booking is created in Step4

  const update = (fields: Partial<BookingData>) =>
    setData((prev) => ({ ...prev, ...fields }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-10 overflow-x-auto pb-1">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  i < step
                    ? "bg-[#C9A84C] text-[#1C1611]"
                    : i === step
                    ? "bg-[#C9A84C] text-[#1C1611] shadow-[0_0_0_4px_rgba(201,168,76,0.2)]"
                    : "bg-[#E8E0D0] text-[#B0A898]"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span
                className={`text-xs mt-1.5 font-medium whitespace-nowrap ${
                  i <= step ? "text-[#C9A84C]" : "text-[#B0A898]"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-12 sm:w-20 h-0.5 mx-2 mb-4 transition-all duration-300 ${
                  i < step ? "bg-[#C9A84C]" : "bg-[#E8E0D0]"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E8E0D0] p-6 sm:p-10">
        {step === 0 && <Step1Location data={data} update={update} onNext={next} />}
        {step === 1 && <Step2Vehicle  data={data} update={update} onNext={next} onBack={back} />}
        {step === 2 && <Step3Details  data={data} update={update} onNext={next} onBack={back} />}
        {step === 3 && (
          <Step4Confirm
            data={data}
            onBack={back}
            onBookingCreated={(id) => { setBookingId(id); next(); }}
          />
        )}
        {step === 4 && bookingId && (
          <Step5Payment data={data} bookingId={bookingId} onBack={back} />
        )}
      </div>
    </div>
  );
}
