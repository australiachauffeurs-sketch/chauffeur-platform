import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, RefreshControl, ActivityIndicator, StatusBar,
} from "react-native";
import { supabase } from "../lib/supabase";
import { API_BASE } from "../lib/config";

const GOLD   = "#C9A84C";
const BLACK  = "#09090B";
const CARD   = "#17171A";
const MUTED  = "#1E1E22";
const BORDER = "#2A2A30";
const WHITE  = "#FFFFFF";
const GRAY   = "#6B7280";

const STATUS: Record<string, { label: string; color: string; icon: string }> = {
  pending:         { label: "Pending",         color: "#FBBF24", icon: "⏳" },
  confirmed:       { label: "Confirmed",       color: "#60A5FA", icon: "✅" },
  driver_assigned: { label: "Driver Assigned", color: "#A78BFA", icon: "🚗" },
  in_progress:     { label: "In Progress",     color: GOLD,      icon: "🟡" },
  completed:       { label: "Completed",       color: "#4ADE80", icon: "✓"  },
  cancelled:       { label: "Cancelled",       color: "#F87171", icon: "✕"  },
};

const FILTERS = [
  { key: "all",       label: "All"       },
  { key: "upcoming",  label: "Upcoming"  },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export default function BookingsScreen({ navigation }: any) {
  const [bookings,   setBookings]   = useState<any[]>([]);
  const [filter,     setFilter]     = useState("all");
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error,      setError]      = useState("");
  const [liveActive, setLiveActive] = useState(false);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError("");
    try {
      const statusParam = filter === "upcoming"
        ? "pending,confirmed,driver_assigned,in_progress"
        : filter === "all" ? "" : filter;
      const res  = await fetch(`${API_BASE}/api/booking/list?status=${statusParam}&limit=30`);
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch {
      setError("Could not load bookings. Pull down to retry.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filter]);

  useEffect(() => {
    load();
    const channel = supabase.channel("bookings-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "bookings" }, payload => {
        if (payload.eventType === "INSERT") setBookings(p => [payload.new as any, ...p]);
        if (payload.eventType === "UPDATE") setBookings(p =>
          p.map(b => b.id === payload.new.id ? { ...b, ...payload.new } : b));
      })
      .subscribe(status => setLiveActive(status === "SUBSCRIBED"));
    channelRef.current = channel;
    return () => { if (channelRef.current) supabase.removeChannel(channelRef.current); };
  }, [load]);

  const formatDate = (d: string) => {
    if (!d) return "—";
    try {
      return new Date(d).toLocaleString("en-AU", { dateStyle: "medium", timeStyle: "short" });
    } catch { return d; }
  };

  const shortId = (id: string) => id ? `#${id.slice(0, 8).toUpperCase()}` : "—";

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BLACK} />

      {/* ── Header ─────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>My Bookings</Text>
          {liveActive && (
            <View style={styles.livePill}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Live</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.newBtn}
          onPress={() => navigation.navigate("Book")}
          activeOpacity={0.8}
        >
          <Text style={styles.newBtnText}>+ Book</Text>
        </TouchableOpacity>
      </View>

      {/* ── Filter Tabs ────────────────────────────────── */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        style={styles.filterBar}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
      >
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterBtn, filter === f.key && styles.filterBtnActive]}
            onPress={() => setFilter(f.key)}
          >
            <Text style={[styles.filterText, filter === f.key && styles.filterTextActive]}>
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ── Content ────────────────────────────────────── */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={GOLD} size="large" />
          <Text style={styles.loadingText}>Loading your rides…</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.emptyIcon}>⚠️</Text>
          <Text style={styles.emptyTitle}>Something went wrong</Text>
          <Text style={styles.emptySub}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => load()}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={() => load(true)} tintColor={GOLD} />
          }
          showsVerticalScrollIndicator={false}
        >
          {bookings.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>🚗</Text>
              <Text style={styles.emptyTitle}>
                {filter === "all" ? "No bookings yet" : `No ${filter} rides`}
              </Text>
              <Text style={styles.emptySub}>
                {filter === "all"
                  ? "Book your first premium ride and travel in style."
                  : `You have no ${filter} bookings.`}
              </Text>
              <TouchableOpacity style={styles.bookNowBtn} onPress={() => navigation.navigate("Book")}>
                <Text style={styles.bookNowText}>Book a Ride  →</Text>
              </TouchableOpacity>
            </View>
          ) : (
            bookings.map((b: any) => {
              const s = STATUS[b.status] ?? { label: b.status, color: GRAY, icon: "·" };
              return (
                <TouchableOpacity
                  key={b.id}
                  style={styles.card}
                  onPress={() => navigation.navigate("BookingDetail", { booking: b })}
                  activeOpacity={0.85}
                >
                  {/* Card header */}
                  <View style={styles.cardTop}>
                    <Text style={styles.bookingId}>{shortId(b.id)}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: `${s.color}18` }]}>
                      <Text style={styles.statusIcon}>{s.icon}</Text>
                      <Text style={[styles.statusText, { color: s.color }]}>{s.label}</Text>
                    </View>
                  </View>

                  {/* Route */}
                  <Text style={styles.route} numberOfLines={2}>
                    {b.pickup_address || b.pickup || "—"}
                    {"  →  "}
                    {b.dropoff_address || b.dropoff || "—"}
                  </Text>

                  {/* Meta */}
                  <Text style={styles.meta}>
                    {formatDate(b.scheduled_at || b.date)}
                    {b.vehicle_category || b.vehicle ? `  ·  ${b.vehicle_category || b.vehicle}` : ""}
                  </Text>

                  {/* Footer */}
                  <View style={styles.cardFooter}>
                    <Text style={styles.amount}>
                      ${(b.total_amount || b.amount || 0).toFixed(2)}
                    </Text>
                    <View style={styles.detailBtn}>
                      <Text style={styles.detailBtnText}>View Details  →</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BLACK },

  // Header
  header:     { flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                paddingHorizontal: 20, paddingVertical: 16 },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  title:      { color: WHITE, fontSize: 24, fontWeight: "900" },
  livePill:   { flexDirection: "row", alignItems: "center", gap: 5,
                backgroundColor: "rgba(74,222,128,0.1)", borderRadius: 20,
                paddingHorizontal: 8, paddingVertical: 4, borderWidth: 1,
                borderColor: "rgba(74,222,128,0.25)" },
  liveDot:    { width: 6, height: 6, borderRadius: 3, backgroundColor: "#4ADE80" },
  liveText:   { color: "#4ADE80", fontSize: 10, fontWeight: "700" },
  newBtn:     { backgroundColor: GOLD, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 9,
                shadowColor: GOLD, shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3, shadowRadius: 10, elevation: 6 },
  newBtnText: { color: BLACK, fontWeight: "800", fontSize: 14 },

  // Filters
  filterBar:      { maxHeight: 52, marginBottom: 6 },
  filterBtn:      { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20,
                    backgroundColor: MUTED, borderWidth: 1, borderColor: "transparent" },
  filterBtnActive:{ backgroundColor: "rgba(201,168,76,0.12)", borderColor: "rgba(201,168,76,0.4)" },
  filterText:     { color: GRAY, fontSize: 13, fontWeight: "600" },
  filterTextActive:{ color: GOLD },

  // Loading / Error / Empty
  center:      { flex: 1, alignItems: "center", justifyContent: "center", paddingBottom: 80 },
  loadingText: { color: GRAY, fontSize: 14, marginTop: 14 },
  emptyIcon:   { fontSize: 52, marginBottom: 16 },
  emptyTitle:  { color: WHITE, fontSize: 20, fontWeight: "800", marginBottom: 8 },
  emptySub:    { color: GRAY, fontSize: 14, textAlign: "center", marginBottom: 24, paddingHorizontal: 32 },
  retryBtn:    { backgroundColor: GOLD, borderRadius: 14, paddingHorizontal: 28, paddingVertical: 13 },
  retryText:   { color: BLACK, fontWeight: "800", fontSize: 15 },

  // Empty state
  empty:      { alignItems: "center", paddingTop: 60 },
  bookNowBtn: { backgroundColor: GOLD, borderRadius: 14, paddingHorizontal: 28, paddingVertical: 14,
                shadowColor: GOLD, shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3, shadowRadius: 10, elevation: 6 },
  bookNowText:{ color: BLACK, fontWeight: "900", fontSize: 15 },

  // Booking card
  card: { backgroundColor: CARD, borderRadius: 18, marginBottom: 12, borderWidth: 1,
          borderColor: BORDER, overflow: "hidden" },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center",
             paddingHorizontal: 16, paddingTop: 14, paddingBottom: 10,
             borderBottomWidth: 1, borderBottomColor: BORDER },
  bookingId:   { color: GRAY, fontSize: 11, fontWeight: "700", fontFamily: "monospace" },
  statusBadge: { flexDirection: "row", alignItems: "center", gap: 5,
                 borderRadius: 8, paddingHorizontal: 9, paddingVertical: 4 },
  statusIcon:  { fontSize: 11 },
  statusText:  { fontSize: 11, fontWeight: "700" },
  route:       { color: WHITE, fontWeight: "700", fontSize: 15, paddingHorizontal: 16,
                 paddingTop: 12, paddingBottom: 4 },
  meta:        { color: GRAY, fontSize: 12, paddingHorizontal: 16, paddingBottom: 12 },
  cardFooter:  { flexDirection: "row", justifyContent: "space-between", alignItems: "center",
                 paddingHorizontal: 16, paddingVertical: 12,
                 borderTopWidth: 1, borderTopColor: BORDER },
  amount:      { color: GOLD, fontWeight: "900", fontSize: 20 },
  detailBtn:   { backgroundColor: "rgba(201,168,76,0.1)", borderRadius: 10,
                 paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1,
                 borderColor: "rgba(201,168,76,0.25)" },
  detailBtnText:{ color: GOLD, fontSize: 12, fontWeight: "700" },
});
