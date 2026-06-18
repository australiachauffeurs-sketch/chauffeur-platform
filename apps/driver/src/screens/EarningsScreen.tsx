import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useTheme } from "../lib/ThemeContext";
import { getDriver } from "../lib/driver";

const API = process.env.EXPO_PUBLIC_API_URL!;

export default function EarningsScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const [stats, setStats] = useState<any>(null);
  const [trips, setTrips] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [period, setPeriod] = useState<"today" | "week" | "month" | "all">("week");
  const [driverId, setDriverId] = useState<string | null>(null);

  useEffect(() => { getDriver().then(d => setDriverId(d?.id ?? null)); }, []);

  useEffect(() => {
    if (!driverId) return;
    setLoading(true);
    fetch(`${API}/api/driver/earnings?driverId=${driverId}&period=${period}`)
      .then(r => r.json())
      .then(data => { setFetchError(false); setStats(data.stats); setTrips(data.trips || []); setLoading(false); })
      .catch(() => {
        setFetchError(true);
        setLoading(false);
      });
  }, [period, driverId]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      <View style={[styles.header, { borderBottomColor: colors.darkBorder }]}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Text style={{ color: colors.gold, fontSize: 16 }}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.white }]}>My Earnings</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Period selector */}
        <View style={styles.periodRow}>
          {(["today", "week", "month", "all"] as const).map(p => (
            <TouchableOpacity key={p} onPress={() => setPeriod(p)}
              style={[styles.periodBtn, period === p && { backgroundColor: colors.gold }]}>
              <Text style={[styles.periodText, period === p ? { color: "#000" } : { color: colors.gray400 }]}>
                {p === "today" ? "Today" : p === "week" ? "Week" : p === "month" ? "Month" : "All Time"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? <ActivityIndicator color={colors.gold} style={{ marginTop: 40 }} /> : fetchError ? (
          <View style={{ alignItems: "center", marginTop: 60, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 32, marginBottom: 12 }}>⚠️</Text>
            <Text style={{ color: colors.white, fontSize: 17, fontWeight: "700", marginBottom: 8, textAlign: "center" }}>Could Not Load Earnings</Text>
            <Text style={{ color: colors.gray500, fontSize: 14, textAlign: "center", lineHeight: 20 }}>
              Unable to connect to the server. Please check your internet connection and try again.
            </Text>
          </View>
        ) : (
          <>
            {/* Stats cards */}
            <View style={[styles.bigCard, { backgroundColor: colors.darkSurface, borderColor: `${colors.gold}30` }]}>
              <Text style={[styles.bigLabel, { color: colors.gray400 }]}>TOTAL EARNED</Text>
              <Text style={[styles.bigAmount, { color: colors.gold }]}>${(stats?.total || 0).toFixed(2)}</Text>
              <Text style={[styles.bigSub, { color: colors.gray500 }]}>{stats?.tripCount || 0} completed trips</Text>
            </View>

            <View style={styles.statsRow}>
              {[
                { label: "Avg per Trip", value: `$${(stats?.avgPerTrip || 0).toFixed(2)}` },
                { label: "Longest Trip", value: `${stats?.longestKm || 0} km` },
              ].map(s => (
                <View key={s.label} style={[styles.statCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
                  <Text style={[styles.statVal, { color: colors.white }]}>{s.value}</Text>
                  <Text style={[styles.statLabel, { color: colors.gray500 }]}>{s.label}</Text>
                </View>
              ))}
            </View>

            {/* Trip list */}
            <Text style={[styles.sectionTitle, { color: colors.gray400 }]}>COMPLETED TRIPS</Text>
            {trips.length === 0 ? (
              <Text style={{ color: colors.gray500, textAlign: "center", marginTop: 20 }}>No trips in this period</Text>
            ) : trips.map(t => (
              <View key={t.id} style={[styles.tripCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.tripPickup, { color: colors.white }]} numberOfLines={1}>{t.pickup_address}</Text>
                  <Text style={[styles.tripDate, { color: colors.gray500 }]}>
                    {new Date(t.completed_at || t.scheduled_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
                  </Text>
                </View>
                <Text style={[styles.tripAmount, { color: colors.gold }]}>${(t.total_amount || 0).toFixed(2)}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1 },
  header:       { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
  title:        { fontWeight: "700", fontSize: 17 },
  periodRow:    { flexDirection: "row", gap: 8, marginBottom: 20 },
  periodBtn:    { flex: 1, paddingVertical: 9, borderRadius: 10, alignItems: "center", backgroundColor: "transparent", borderWidth: 1, borderColor: "#333" },
  periodText:   { fontSize: 12, fontWeight: "700" },
  bigCard:      { borderRadius: 20, padding: 24, alignItems: "center", marginBottom: 14, borderWidth: 1 },
  bigLabel:     { fontSize: 10, letterSpacing: 1.5, fontWeight: "700", marginBottom: 8 },
  bigAmount:    { fontSize: 48, fontWeight: "800", marginBottom: 4 },
  bigSub:       { fontSize: 13 },
  statsRow:     { flexDirection: "row", gap: 12, marginBottom: 20 },
  statCard:     { flex: 1, borderRadius: 16, padding: 16, alignItems: "center", borderWidth: 1 },
  statVal:      { fontSize: 22, fontWeight: "700", marginBottom: 4 },
  statLabel:    { fontSize: 11, textAlign: "center" },
  sectionTitle: { fontSize: 10, letterSpacing: 1.5, fontWeight: "700", marginBottom: 10 },
  tripCard:     { flexDirection: "row", alignItems: "center", borderRadius: 14, padding: 14, marginBottom: 8, borderWidth: 1 },
  tripPickup:   { fontSize: 14, fontWeight: "600", marginBottom: 3 },
  tripDate:     { fontSize: 12 },
  tripAmount:   { fontSize: 18, fontWeight: "700" },
});
