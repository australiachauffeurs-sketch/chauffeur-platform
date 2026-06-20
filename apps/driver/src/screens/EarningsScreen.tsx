import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, ActivityIndicator, RefreshControl } from "react-native";
import { useTheme } from "../lib/ThemeContext";
import { getDriver } from "../lib/driver";

const API = process.env.EXPO_PUBLIC_API_URL!;

export default function EarningsScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [stats,      setStats]      = useState<any>(null);
  const [trips,      setTrips]      = useState<any[]>([]);
  const [loading,    setLoading]    = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [fetchError, setFetchError] = useState(false);
  const [period,     setPeriod]     = useState<"today" | "week" | "month" | "all">("week");
  const [driverId,   setDriverId]   = useState<string | null>(null);

  useEffect(() => { getDriver().then(d => setDriverId(d?.id ?? null)); }, []);

  const fetchEarnings = useCallback(async (isRefresh = false) => {
    if (!driverId) return;
    if (isRefresh) setRefreshing(true); else setLoading(true);
    try {
      const res  = await fetch(`${API}/api/driver/earnings?driverId=${driverId}&period=${period}`);
      const data = await res.json();
      setFetchError(false);
      setStats(data.stats);
      setTrips(data.trips || []);
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [driverId, period]);

  // Fetch when driverId or period changes
  useEffect(() => { fetchEarnings(); }, [fetchEarnings]);

  // Re-fetch every time this screen comes into focus (e.g. after completing a trip)
  useEffect(() => {
    const unsub = navigation.addListener("focus", () => fetchEarnings());
    return unsub;
  }, [navigation, fetchEarnings]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      <View style={[styles.header, { borderBottomColor: colors.darkBorder }]}>
        <TouchableOpacity onPress={() => navigation?.goBack?.()}>
          <Text style={{ color: colors.gold, fontSize: 16 }}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.white }]}>My Earnings</Text>
        <TouchableOpacity onPress={() => fetchEarnings(true)}>
          <Text style={{ color: colors.gold, fontSize: 14 }}>↻ Refresh</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchEarnings(true)}
            tintColor={colors.gold}
            colors={[colors.gold]}
          />
        }
      >
        {/* Period selector */}
        <View style={styles.periodRow}>
          {(["today", "week", "month", "all"] as const).map(p => (
            <TouchableOpacity key={p} onPress={() => setPeriod(p)}
              style={[styles.periodBtn, { borderColor: colors.darkBorder }, period === p && { backgroundColor: colors.gold, borderColor: colors.gold }]}>
              <Text style={[styles.periodText, period === p ? { color: "#000" } : { color: colors.gray400 }]}>
                {p === "today" ? "Today" : p === "week" ? "Week" : p === "month" ? "Month" : "All Time"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
          <ActivityIndicator color={colors.gold} style={{ marginTop: 40 }} />
        ) : fetchError ? (
          <View style={{ alignItems: "center", marginTop: 60, paddingHorizontal: 20 }}>
            <Text style={{ fontSize: 32, marginBottom: 12 }}>⚠️</Text>
            <Text style={{ color: colors.white, fontSize: 17, fontWeight: "700", marginBottom: 8, textAlign: "center" }}>Could Not Load Earnings</Text>
            <Text style={{ color: colors.gray500, fontSize: 14, textAlign: "center", lineHeight: 20, marginBottom: 20 }}>
              Unable to connect to the server. Please check your internet connection.
            </Text>
            <TouchableOpacity
              style={{ backgroundColor: colors.gold, borderRadius: 12, paddingVertical: 12, paddingHorizontal: 28 }}
              onPress={() => fetchEarnings()}>
              <Text style={{ color: "#000", fontWeight: "700" }}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Total earnings card */}
            <View style={[styles.bigCard, { backgroundColor: colors.darkSurface, borderColor: `${colors.gold}30` }]}>
              <Text style={[styles.bigLabel, { color: colors.gray400 }]}>TOTAL EARNED</Text>
              <Text style={[styles.bigAmount, { color: colors.gold }]}>${(stats?.total || 0).toFixed(2)}</Text>
              <Text style={[styles.bigSub, { color: colors.gray500 }]}>{stats?.tripCount || 0} completed trip{stats?.tripCount !== 1 ? "s" : ""}</Text>
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
              <View style={{ alignItems: "center", paddingVertical: 32 }}>
                <Text style={{ fontSize: 24, marginBottom: 10 }}>🚗</Text>
                <Text style={{ color: colors.gray500, fontSize: 14, textAlign: "center" }}>No completed trips in this period</Text>
                <TouchableOpacity onPress={() => setPeriod("all")} style={{ marginTop: 12 }}>
                  <Text style={{ color: colors.gold, fontSize: 13 }}>View all time →</Text>
                </TouchableOpacity>
              </View>
            ) : trips.map(t => (
              <View key={t.id} style={[styles.tripCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
                <View style={{ flex: 1, marginRight: 10 }}>
                  <Text style={[styles.tripPickup, { color: colors.white }]} numberOfLines={1}>{t.pickup_address || "—"}</Text>
                  {t.dropoff_address ? (
                    <Text style={{ color: colors.gray500, fontSize: 12, marginTop: 2 }} numberOfLines={1}>→ {t.dropoff_address}</Text>
                  ) : null}
                  <Text style={[styles.tripDate, { color: colors.gray500, marginTop: 4 }]}>
                    {new Date(t.scheduled_at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
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
  periodBtn:    { flex: 1, paddingVertical: 9, borderRadius: 10, alignItems: "center", borderWidth: 1 },
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
  tripPickup:   { fontSize: 14, fontWeight: "600", marginBottom: 2 },
  tripDate:     { fontSize: 12 },
  tripAmount:   { fontSize: 18, fontWeight: "700", flexShrink: 0 },
});
