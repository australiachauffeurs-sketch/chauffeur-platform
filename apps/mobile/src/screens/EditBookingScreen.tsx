import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Alert, ActivityIndicator,
} from "react-native";
import { useTheme } from "../lib/ThemeContext";
import { API_BASE } from "../lib/config";

function Stepper({
  label, value, onDecrement, onIncrement, min = 0,
}: {
  label: string; value: number;
  onDecrement: () => void; onIncrement: () => void; min?: number;
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.stepperRow}>
      <Text style={[styles.stepperLabel, { color: colors.white }]}>{label}</Text>
      <View style={styles.stepperControls}>
        <TouchableOpacity
          onPress={onDecrement}
          disabled={value <= min}
          style={[styles.stepperBtn, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder, opacity: value <= min ? 0.4 : 1 }]}
        >
          <Text style={[styles.stepperBtnText, { color: colors.white }]}>−</Text>
        </TouchableOpacity>
        <Text style={[styles.stepperValue, { color: colors.gold }]}>{value}</Text>
        <TouchableOpacity
          onPress={onIncrement}
          style={[styles.stepperBtn, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}
        >
          <Text style={[styles.stepperBtnText, { color: colors.white }]}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function EditBookingScreen({ route, navigation }: any) {
  const { colors } = useTheme();
  const { booking: b } = route.params || {};

  // Format initial scheduled_at as DD/MM/YYYY HH:MM
  const formatDateForInput = (iso: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    const day   = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year  = d.getFullYear();
    const hour  = String(d.getHours()).padStart(2, "0");
    const min   = String(d.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hour}:${min}`;
  };

  const [scheduledAt,  setScheduledAt]  = useState(formatDateForInput(b?.scheduled_at || ""));
  const [passengers,   setPassengers]   = useState<number>(b?.passengers ?? 1);
  const [luggage,      setLuggage]      = useState<number>(b?.luggage ?? 0);
  const [notes,        setNotes]        = useState<string>(b?.special_instructions || b?.special_requests || "");
  const [saving,       setSaving]       = useState(false);
  const [dateError,    setDateError]    = useState("");

  const parseInputDate = (val: string): string | null => {
    // Expects DD/MM/YYYY HH:MM
    const match = val.match(/^(\d{2})\/(\d{2})\/(\d{4})\s+(\d{2}):(\d{2})$/);
    if (!match) return null;
    const [, day, month, year, hour, min] = match;
    const d = new Date(`${year}-${month}-${day}T${hour}:${min}:00`);
    if (isNaN(d.getTime())) return null;
    return d.toISOString();
  };

  const save = async () => {
    setDateError("");
    let isoDate: string | null = null;
    if (scheduledAt.trim()) {
      isoDate = parseInputDate(scheduledAt.trim());
      if (!isoDate) {
        setDateError("Please enter date as DD/MM/YYYY HH:MM");
        return;
      }
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/booking/${b.id}/modify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scheduledAt:  isoDate,
          passengers,
          luggage,
          notes: notes.trim() || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        Alert.alert("Error", json.error || "Failed to update booking.");
      } else {
        Alert.alert("Success", "Booking updated successfully.", [
          { text: "OK", onPress: () => navigation.goBack() },
        ]);
      }
    } catch {
      Alert.alert("Error", "Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!b) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
        <Text style={{ color: colors.white, textAlign: "center", margin: 20 }}>Booking not found.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: colors.gold, textAlign: "center" }}>← Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.darkBorder }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.back, { color: colors.gold }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.white }]}>Edit Booking</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Booking ID */}
        <Text style={[styles.bookingId, { color: colors.gray500 }]}>Booking: {b.id}</Text>

        {/* Date / Time */}
        <View style={[styles.field, { borderColor: colors.darkBorder, backgroundColor: colors.darkSurface }]}>
          <Text style={[styles.fieldLabel, { color: colors.gray400 }]}>Date & Time (DD/MM/YYYY HH:MM)</Text>
          <TextInput
            value={scheduledAt}
            onChangeText={setScheduledAt}
            placeholder="e.g. 25/12/2026 09:00"
            placeholderTextColor={colors.gray500}
            style={[styles.fieldInput, { color: colors.white }]}
            keyboardType="numbers-and-punctuation"
          />
          {dateError ? <Text style={{ color: "#f87171", fontSize: 12, marginTop: 4 }}>{dateError}</Text> : null}
        </View>

        {/* Passengers stepper */}
        <View style={[styles.card, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
          <Stepper
            label="Passengers"
            value={passengers}
            min={1}
            onDecrement={() => setPassengers(v => Math.max(1, v - 1))}
            onIncrement={() => setPassengers(v => Math.min(10, v + 1))}
          />
          <View style={[styles.divider, { backgroundColor: colors.darkBorder }]} />
          <Stepper
            label="Luggage (bags)"
            value={luggage}
            min={0}
            onDecrement={() => setLuggage(v => Math.max(0, v - 1))}
            onIncrement={() => setLuggage(v => Math.min(10, v + 1))}
          />
        </View>

        {/* Special instructions */}
        <View style={[styles.field, { borderColor: colors.darkBorder, backgroundColor: colors.darkSurface }]}>
          <Text style={[styles.fieldLabel, { color: colors.gray400 }]}>Special Instructions</Text>
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Any special requests…"
            placeholderTextColor={colors.gray500}
            style={[styles.fieldInput, styles.notesInput, { color: colors.white }]}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Save button */}
        <TouchableOpacity
          style={[styles.saveBtn, { backgroundColor: colors.gold }, saving && { opacity: 0.6 }]}
          onPress={save}
          disabled={saving}
        >
          {saving
            ? <ActivityIndicator color="#000" />
            : <Text style={styles.saveBtnText}>Save Changes</Text>
          }
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1 },
  header:         { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
  back:           { fontSize: 16 },
  headerTitle:    { fontWeight: "700", fontSize: 17 },
  bookingId:      { fontSize: 12, fontFamily: "monospace", marginBottom: 16 },
  field:          { borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 14 },
  fieldLabel:     { fontSize: 11, letterSpacing: 1, textTransform: "uppercase", fontWeight: "700", marginBottom: 8 },
  fieldInput:     { fontSize: 15 },
  notesInput:     { minHeight: 70 },
  card:           { borderRadius: 14, borderWidth: 1, paddingHorizontal: 16, paddingVertical: 8, marginBottom: 14 },
  stepperRow:     { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 12 },
  stepperLabel:   { fontSize: 15, fontWeight: "600" },
  stepperControls:{ flexDirection: "row", alignItems: "center", gap: 12 },
  stepperBtn:     { width: 36, height: 36, borderRadius: 18, borderWidth: 1, justifyContent: "center", alignItems: "center" },
  stepperBtnText: { fontSize: 20, fontWeight: "600", lineHeight: 22 },
  stepperValue:   { fontSize: 20, fontWeight: "700", minWidth: 28, textAlign: "center" },
  divider:        { height: 1, marginHorizontal: -16 },
  saveBtn:        { borderRadius: 14, paddingVertical: 16, alignItems: "center", marginTop: 8 },
  saveBtnText:    { fontWeight: "700", fontSize: 16, color: "#000" },
});
