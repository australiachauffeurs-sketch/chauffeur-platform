import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, RefreshControl, ActivityIndicator } from "react-native";
import { useTheme } from "../lib/ThemeContext";
import { COLORS } from "../lib/theme";
import { supabase } from "../lib/supabase";

import { API_BASE as API } from "../lib/config";

const STATUS_COLOR: Record<string, string> = {
  pending:        "#FBBF24",
  confirmed:      "#60A5FA",
  driver_assigned:"#A78BFA",
  in_progress:    COLORS.goldLight,
  completed:      COLORS.green,
  cancelled:      COLORS.red,
};

const FILTERS = ["all","upcoming","completed","cancelled"];

export default function BookingsScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [bookings,   setBookings]   = useState<any[]>([]);
  const [filter,     setFilter]     = useState("all");
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error,      setError]      = useState("");
  const [liveActive, setLiveActive] = useState(false);
  const channelRef = useRef<ReturnType<typeof supabase.channel>|null>(null);

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError("");
    try {
      const statusParam = filter === "all" ? "" : filter === "upcoming"
        ? "pending,confirmed,driver_assigned,in_progress" : filter;
      const res  = await fetch(`${API}/api/booking/list?status=${statusParam}&limit=20`);
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch {
      setError("Could not load bookings. Check your connection.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filter]);

  useEffect(() => {
    load();

    // Subscribe to realtime bookings updates
    const channel = supabase
      .channel("bookings-screen")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookings" },
        (payload) => {
          setBookings(prev => [payload.new as any, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "bookings" },
        (payload) => {
          setBookings(prev =>
            prev.map(b => b.id === payload.new.id ? { ...b, ...payload.new } : b)
          );
        }
      )
      .subscribe((status) => {
        setLiveActive(status === "SUBSCRIBED");
      });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
      setLiveActive(false);
    };
  }, [load]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {liveActive && <View style={[styles.liveDot, { backgroundColor: colors.green }]} />}
          <Text style={[styles.title, { color: colors.white }]}>My Bookings</Text>
        </View>
        <TouchableOpacity style={[styles.newBtn, { backgroundColor: colors.gold }]} onPress={() => navigation.navigate("Book")}>
          <Text style={[styles.newBtnText, { color: colors.black }]}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersRow} contentContainerStyle={{ paddingHorizontal:16, gap:8 }}>
        {FILTERS.map(f => (
          <TouchableOpacity
            key={f}
            style={[
              styles.filterBtn,
              { backgroundColor: colors.darkMuted },
              filter === f && { backgroundColor: `${colors.gold}25`, borderWidth: 1, borderColor: `${colors.gold}50` },
            ]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, { color: colors.gray500 }, filter === f && { color: colors.gold }]}>
              {f.charAt(0).toUpperCase()+f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator color={colors.gold} size="large" />
          <Text style={[styles.loadingText, { color: colors.gray500 }]}>Loading bookings…</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={{ fontSize:16, marginBottom:12, color: colors.gray400 }}>Warning</Text>
          <Text style={[styles.errorText, { color: colors.gray400 }]}>{error}</Text>
          <TouchableOpacity style={[styles.retryBtn, { backgroundColor: colors.gold }]} onPress={() => load()}>
            <Text style={[styles.retryText, { color: colors.black }]}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ padding:16, paddingBottom:30 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => load(true)} tintColor={colors.gold} />}
        >
          {bookings.length === 0 ? (
            <View style={styles.empty}>
              <Text style={{ fontSize:16, marginBottom:12, color: colors.gray500 }}>No rides yet</Text>
              <Text style={[styles.emptyText, { color: colors.white }]}>No bookings found</Text>
              <Text style={[styles.emptySub, { color: colors.gray500 }]}>{filter!=="all" ? `No ${filter} bookings yet.` : "Book your first luxury ride!"}</Text>
              <TouchableOpacity style={[styles.emptyBtn, { backgroundColor: colors.gold }]} onPress={() => navigation.navigate("Book")}>
                <Text style={[styles.emptyBtnText, { color: colors.black }]}>Book a Ride →</Text>
              </TouchableOpacity>
            </View>
          ) : bookings.map((b: any) => (
            <TouchableOpacity
              key={b.id}
              style={[styles.card, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}
              onPress={() => navigation.navigate("BookingDetail", { booking: b })}
              activeOpacity={0.85}
            >
              <View style={styles.cardHeader}>
                <Text style={[styles.bookingId, { color: colors.gray500 }]}>{b.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor:`${STATUS_COLOR[b.status]||"#9CA3AF"}20` }]}>
                  <Text style={[styles.statusText, { color:STATUS_COLOR[b.status]||"#9CA3AF" }]}>
                    {b.status?.replace("_"," ")}
                  </Text>
                </View>
              </View>
              <Text style={[styles.route, { color: colors.white }]}>{b.pickup_address||b.pickup} → {b.dropoff_address||b.dropoff}</Text>
              <Text style={[styles.sub, { color: colors.gray500 }]}>
                {b.scheduled_at ? new Date(b.scheduled_at).toLocaleString("en-AU",{dateStyle:"medium",timeStyle:"short"}) : b.date}
                {" · "}{b.vehicle_category||b.vehicle}
              </Text>
              <View style={[styles.cardFooter, { borderTopColor: colors.darkBorder }]}>
                <Text style={[styles.amount, { color: colors.white }]}>${(b.total_amount||b.amount||0).toFixed(2)}</Text>
                <Text style={[styles.viewBtn, { color: colors.gold }]}>View Details →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex:1 },
  header:          { flexDirection:"row", justifyContent:"space-between", alignItems:"center", padding:20, paddingBottom:12 },
  headerLeft:      { flexDirection:"row", alignItems:"center", gap:8 },
  title:           { fontSize:24, fontWeight:"700" },
  liveDot:         { width:8, height:8, borderRadius:4 },
  newBtn:          { borderRadius:10, paddingHorizontal:14, paddingVertical:8 },
  newBtnText:      { fontWeight:"700", fontSize:14 },
  filtersRow:      { marginBottom:8, maxHeight:52 },
  filterBtn:       { paddingHorizontal:16, paddingVertical:8, borderRadius:20 },
  filterText:      { fontSize:13, fontWeight:"500" },
  center:          { flex:1, alignItems:"center", justifyContent:"center", paddingBottom:80 },
  loadingText:     { marginTop:12, fontSize:14 },
  errorText:       { fontSize:15, textAlign:"center", marginBottom:16 },
  retryBtn:        { borderRadius:12, paddingHorizontal:24, paddingVertical:12 },
  retryText:       { fontWeight:"700", fontSize:14 },
  empty:           { alignItems:"center", paddingTop:40 },
  emptyText:       { fontSize:18, fontWeight:"700", marginBottom:6 },
  emptySub:        { fontSize:14, marginBottom:20 },
  emptyBtn:        { borderRadius:14, paddingHorizontal:24, paddingVertical:12 },
  emptyBtnText:    { fontWeight:"700", fontSize:15 },
  card:            { borderRadius:16, padding:16, marginBottom:12, borderWidth:1 },
  cardHeader:      { flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginBottom:8 },
  bookingId:       { fontSize:11, fontFamily:"monospace" },
  statusBadge:     { borderRadius:8, paddingHorizontal:8, paddingVertical:3 },
  statusText:      { fontSize:11, fontWeight:"700", textTransform:"capitalize" },
  route:           { fontWeight:"600", fontSize:15, marginBottom:4 },
  sub:             { fontSize:12, marginBottom:12 },
  cardFooter:      { flexDirection:"row", justifyContent:"space-between", alignItems:"center", borderTopWidth:1, paddingTop:12 },
  amount:          { fontWeight:"700", fontSize:18 },
  viewBtn:         { fontSize:13, fontWeight:"600" },
});
