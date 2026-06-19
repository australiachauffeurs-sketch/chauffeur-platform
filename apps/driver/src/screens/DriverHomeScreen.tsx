import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View, Text, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, StatusBar, Switch, Alert, ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import { COLORS } from "../lib/theme";
import { useTheme } from "../lib/ThemeContext";
import { supabase } from "../lib/supabase";
import { getDriver, DriverProfile } from "../lib/driver";

const API = process.env.EXPO_PUBLIC_API_URL!;

// Normalize either a raw bookings row or an already-normalized job into one shape
const mapBookingToJob = (b: any) => ({
  id: b.id,
  pickup: b.pickup ?? b.pickup_address,
  dropoff: b.dropoff ?? b.dropoff_address,
  amount: b.amount ?? b.total_amount,
  scheduledAt: b.scheduledAt ?? b.scheduled_at,
  distanceKm: b.distanceKm ?? b.distance_km,
  durationMin: b.durationMin ?? b.duration_minutes ?? b.duration_min,
  passengers: b.passengers,
  luggage: b.luggage,
  flightNumber: b.flightNumber ?? b.flight_number,
  vehicle: b.vehicle ?? b.vehicle_category,
  customer: b.customer ?? b.customer_name ?? "Customer",
  customerId: b.customerId ?? b.customer_id ?? null,
  customerPhone: b.customerPhone ?? b.customer_phone ?? null,
  waypoints: b.waypoints ?? null,
  driverId: null,
});

const greetingFor = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

export default function DriverHomeScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const [driver,      setDriverState] = useState<DriverProfile | null>(null);
  const driverId = driver?.id ?? null;
  const [isOnline,    setIsOnline]    = useState(false);
  const [jobs,        setJobs]        = useState<any[]>([]);
  const [loading,     setLoading]     = useState(false);
  const [toggling,    setToggling]    = useState(false);
  const [accepting,   setAccepting]   = useState<string|null>(null);
  const [earnings,    setEarnings]    = useState({ today: 0, trips: 0 });
  const [liveActive,  setLiveActive]  = useState(false);
  const channelRef = useRef<ReturnType<typeof supabase.channel>|null>(null);

  // Load the signed-in driver's profile
  useEffect(() => { getDriver().then(setDriverState); }, []);

  // Load today's real earnings whenever the screen mounts / driver changes
  const loadEarnings = useCallback(async () => {
    if (!driverId) return;
    try {
      const res = await fetch(`${API}/api/driver/earnings?driverId=${driverId}&period=today`);
      const data = await res.json();
      setEarnings({ today: data.stats?.total || 0, trips: data.stats?.tripCount || 0 });
    } catch { /* keep existing */ }
  }, [driverId]);

  useEffect(() => { loadEarnings(); }, [loadEarnings]);

  // Refresh earnings each time the dashboard regains focus (e.g. after a trip)
  useEffect(() => {
    const unsub = navigation.addListener("focus", loadEarnings);
    return unsub;
  }, [navigation, loadEarnings]);

  // Push GPS location to Supabase every 30s when online
  useEffect(() => {
    if (!isOnline || !driverId) return;

    const pushLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        await supabase
          .from("drivers")
          .update({
            current_lat:         loc.coords.latitude,
            current_lng:         loc.coords.longitude,
            location_updated_at: new Date().toISOString(),
          })
          .eq("id", driverId);
      } catch { /* silently ignore — location is best-effort */ }
    };

    pushLocation(); // immediate first push
    const interval = setInterval(pushLocation, 30000);
    return () => clearInterval(interval);
  }, [isOnline, driverId]);

  // Fetch pending jobs
  const fetchJobs = useCallback(async () => {
    if (!isOnline) return;
    try {
      const res  = await fetch(`${API}/api/driver/pending-jobs`);
      const data = await res.json();
      setJobs((data.jobs || []).map(mapBookingToJob));
    } catch { /* keep existing */ }
  }, [isOnline]);

  // Subscribe / unsubscribe from Supabase Realtime
  useEffect(() => {
    if (isOnline) {
      // Initial fetch
      fetchJobs();

      // Subscribe to bookings table
      const channel = supabase
        .channel("pending-bookings")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "bookings", filter: "status=eq.pending" },
          (payload) => {
            const job = mapBookingToJob(payload.new);
            setJobs(prev => {
              if (prev.some(j => j.id === job.id)) return prev;
              return [job, ...prev];
            });
          }
        )
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "bookings" },
          (payload) => {
            if (payload.new.status !== "pending") {
              setJobs(prev => prev.filter(j => j.id !== payload.new.id));
            } else {
              // Status updated but still pending — refresh the job's data
              setJobs(prev => prev.map(j => j.id === payload.new.id ? mapBookingToJob(payload.new) : j));
            }
          }
        )
        .subscribe((status) => {
          setLiveActive(status === "SUBSCRIBED");
        });

      channelRef.current = channel;
    } else {
      setJobs([]);
      setLiveActive(false);
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    }

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
      setLiveActive(false);
    };
  }, [isOnline]); // eslint-disable-line react-hooks/exhaustive-deps

  // Polling fallback — guarantees new jobs surface even if RLS blocks realtime
  useEffect(() => {
    if (!isOnline) return;
    const interval = setInterval(fetchJobs, 15000);
    return () => clearInterval(interval);
  }, [isOnline, fetchJobs]);

  // Toggle online/offline
  const handleToggle = async (val: boolean) => {
    setToggling(true);
    try {
      await fetch(`${API}/api/driver/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ driverId, status: val ? "available" : "offline" }),
      });
      setIsOnline(val);
    } catch { setIsOnline(val); /* offline-tolerant */ }
    finally { setToggling(false); }
  };

  // Accept a job
  const handleAccept = async (job: any) => {
    setAccepting(job.id);
    const claimedJob = { ...job, driverId };
    try {
      const res  = await fetch(`${API}/api/driver/job/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId: job.id, driverId }),
      });
      const data = await res.json();
      if (data.success) {
        setJobs(prev => prev.filter(j => j.id !== job.id));
        navigation.navigate("ActiveTrip", { job: claimedJob });
      } else {
        Alert.alert("Couldn't accept", data.error || "This job may have already been taken.");
      }
    } catch {
      Alert.alert("Network error", "Could not accept the job. Please try again.");
    } finally { setAccepting(null); }
  };

  // Decline a job
  const handleDecline = (job: any) => {
    Alert.alert("Decline Job", `Decline booking ${job.id}?`, [
      { text: "Cancel" },
      { text: "Decline", style: "destructive", onPress: () => setJobs(prev => prev.filter(j => j.id !== job.id)) },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      <StatusBar barStyle={isDark ? "dark-content" : "dark-content"} backgroundColor={colors.black} />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.gray400 }]}>{greetingFor()}</Text>
            <Text style={[styles.driverName, { color: colors.white }]}>{driver?.name || "Driver"}</Text>
          </View>
          <TouchableOpacity style={[styles.profileBtn, { backgroundColor: colors.darkMuted, borderColor: colors.gold }]} onPress={() => navigation.navigate("Profile")}>
            <Text style={[styles.profileText, { color: colors.gold }]}>{(driver?.name || "D").charAt(0).toUpperCase()}</Text>
          </TouchableOpacity>
        </View>

        {/* Online toggle */}
        <View style={[styles.onlineCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }, isOnline && { borderColor: `${colors.green}50`, backgroundColor: `${colors.green}08` }]}>
          <View style={styles.onlineLeft}>
            <View style={[styles.statusDot, { backgroundColor: isOnline ? colors.green : colors.gray500 }]} />
            <View>
              <Text style={[styles.onlineTitle, { color: colors.white }]}>{isOnline ? "You are Online" : "You are Offline"}</Text>
              <Text style={[styles.onlineSub, { color: colors.gray500 }]}>
                {toggling ? "Updating status…" : isOnline ? "Receiving new job requests" : "Toggle to start accepting rides"}
              </Text>
            </View>
          </View>
          {toggling
            ? <ActivityIndicator color={colors.gold} />
            : <Switch value={isOnline} onValueChange={handleToggle}
                trackColor={{ false: colors.darkBorder, true: `${colors.green}60` }}
                thumbColor={isOnline ? colors.green : colors.gray500} />
          }
        </View>

        {/* Today's stats */}
        <View style={styles.statsRow}>
          {[
            { label:"Today's Earnings", value:`$${earnings.today.toFixed(2)}` },
            { label:"Trips Today",      value:`${earnings.trips}` },
            { label:"Rating",           value: driver?.rating ? `${driver.rating}★` : "New" },
          ].map(s => (
            <View key={s.label} style={[styles.statCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
              <Text style={[styles.statValue, { color: colors.gold }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: colors.gray500 }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Job requests */}
        {isOnline && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                {liveActive && <View style={[styles.liveDot, { backgroundColor: colors.green }]} />}
                <Text style={[styles.sectionTitle, { color: colors.white }]}>New Job Requests</Text>
              </View>
              <TouchableOpacity onPress={fetchJobs}>
                <Text style={{ color: colors.gold, fontSize:12 }}>Refresh ↻</Text>
              </TouchableOpacity>
            </View>

            {jobs.length === 0 ? (
              <View style={[styles.noJobs, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
                <Text style={{ fontSize:16, color: colors.gray500, marginBottom:12 }}>No jobs</Text>
                <Text style={[styles.noJobsText, { color: colors.white }]}>No pending jobs right now</Text>
                <Text style={[styles.noJobsSub, { color: colors.gray500 }]}>We'll notify you when a new booking comes in</Text>
              </View>
            ) : jobs.map(job => (
              <View key={job.id} style={[styles.jobCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
                <View style={styles.jobHeader}>
                  <View style={[styles.jobBadge, { backgroundColor: colors.darkMuted }]}><Text style={[styles.jobBadgeText, { color: colors.gray400 }]}>{job.id}</Text></View>
                  <Text style={[styles.jobAmount, { color: colors.gold }]}>${job.amount?.toFixed(2)}</Text>
                </View>

                <View style={styles.routeRow}>
                  <View style={styles.routeDots}>
                    <View style={[styles.dotGreen, { backgroundColor: colors.green }]} />
                    <View style={[styles.routeLine, { backgroundColor: colors.darkBorder }]} />
                    <View style={[styles.dotGold, { backgroundColor: colors.gold }]} />
                  </View>
                  <View style={styles.routeAddresses}>
                    <Text style={[styles.routeText, { color: colors.white }]}>{job.pickup}</Text>
                    <Text style={[styles.routeText, { color: colors.gray500, marginTop:10 }]}>{job.dropoff}</Text>
                  </View>
                </View>

                <View style={[styles.jobMeta, { borderTopColor: colors.darkBorder, borderBottomColor: colors.darkBorder }]}>
                  <Text style={[styles.metaItem, { color: colors.gray400 }]}>{job.scheduledAt ? new Date(job.scheduledAt).toLocaleString("en-AU",{dateStyle:"short",timeStyle:"short"}) : ""}</Text>
                  <Text style={[styles.metaItem, { color: colors.gray400 }]}>{job.distanceKm} km</Text>
                  <Text style={[styles.metaItem, { color: colors.gray400 }]}>{job.passengers} pax</Text>
                  <Text style={[styles.metaItem, { color: colors.gray400 }]}>{job.luggage} bags</Text>
                  {job.flightNumber ? <Text style={[styles.metaItem, { color: colors.gray400 }]}>Flight {job.flightNumber}</Text> : null}
                </View>

                <View style={styles.customerRow}>
                  <View style={[styles.customerAvatar, { backgroundColor: `${colors.gold}20` }]}><Text style={[styles.customerAvatarText, { color: colors.gold }]}>{job.customer?.[0]||"C"}</Text></View>
                  <Text style={[styles.customerName, { color: colors.white }]}>{job.customer}</Text>
                </View>

                <View style={styles.jobActions}>
                  <TouchableOpacity style={[styles.declineBtn, { borderColor: colors.red }]} onPress={() => handleDecline(job)}>
                    <Text style={[styles.declineBtnText, { color: colors.red }]}>✕ Decline</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.acceptBtn, { backgroundColor: colors.gold }, accepting===job.id && { opacity:0.7 }]}
                    onPress={() => handleAccept(job)}
                    disabled={accepting === job.id}>
                    {accepting===job.id
                      ? <ActivityIndicator color={colors.black} />
                      : <Text style={[styles.acceptBtnText, { color: colors.black }]}>✓ Accept</Text>
                    }
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {!isOnline && (
          <View style={styles.offlineMsg}>
            <Text style={{ fontSize:18, color: colors.gray500, marginBottom:14 }}>Offline</Text>
            <Text style={[styles.offlineMsgTitle, { color: colors.white }]}>You're offline</Text>
            <Text style={[styles.offlineMsgSub, { color: colors.gray500 }]}>Toggle the switch above to go online and start receiving ride requests.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:        { flex:1, backgroundColor:COLORS.black },
  header:           { flexDirection:"row", justifyContent:"space-between", alignItems:"center", padding:20, paddingBottom:12 },
  greeting:         { color:COLORS.gray400, fontSize:13, marginBottom:2 },
  driverName:       { color:COLORS.white, fontSize:22, fontWeight:"700" },
  profileBtn:       { width:44, height:44, borderRadius:22, backgroundColor:COLORS.darkMuted, borderWidth:2, borderColor:COLORS.gold, justifyContent:"center", alignItems:"center" },
  profileText:      { color:COLORS.gold, fontWeight:"700", fontSize:18 },
  onlineCard:       { marginHorizontal:16, backgroundColor:COLORS.darkSurface, borderRadius:16, padding:16, flexDirection:"row", alignItems:"center", justifyContent:"space-between", borderWidth:1.5, borderColor:COLORS.darkBorder, marginBottom:16 },
  onlineCardActive: { borderColor:`${COLORS.green}50`, backgroundColor:`${COLORS.green}08` },
  onlineLeft:       { flexDirection:"row", alignItems:"center", gap:12 },
  statusDot:        { width:10, height:10, borderRadius:5 },
  onlineTitle:      { fontSize:15, fontWeight:"700", marginBottom:2 },
  onlineSub:        { fontSize:12 },
  statsRow:         { flexDirection:"row", marginHorizontal:16, gap:8, marginBottom:20 },
  statCard:         { flex:1, backgroundColor:COLORS.darkSurface, borderRadius:14, padding:12, alignItems:"center", borderWidth:1, borderColor:COLORS.darkBorder },
  statValue:        { color:COLORS.gold, fontWeight:"700", fontSize:15, marginBottom:2 },
  statLabel:        { color:COLORS.gray500, fontSize:9, textAlign:"center" },
  section:          { paddingHorizontal:16, marginBottom:24 },
  sectionHeader:    { flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginBottom:12 },
  sectionTitleRow:  { flexDirection:"row", alignItems:"center", gap:8 },
  sectionTitle:     { color:COLORS.white, fontSize:18, fontWeight:"700" },
  liveDot:          { width:8, height:8, borderRadius:4, backgroundColor:COLORS.green },
  noJobs:           { alignItems:"center", paddingVertical:32, backgroundColor:COLORS.darkSurface, borderRadius:18, borderWidth:1, borderColor:COLORS.darkBorder },
  noJobsText:       { color:COLORS.white, fontWeight:"700", fontSize:16, marginBottom:6 },
  noJobsSub:        { color:COLORS.gray500, fontSize:12, textAlign:"center", paddingHorizontal:24 },
  jobCard:          { backgroundColor:COLORS.darkSurface, borderRadius:18, padding:18, marginBottom:14, borderWidth:1, borderColor:COLORS.darkBorder },
  jobHeader:        { flexDirection:"row", justifyContent:"space-between", alignItems:"center", marginBottom:14 },
  jobBadge:         { backgroundColor:COLORS.darkMuted, borderRadius:8, paddingHorizontal:10, paddingVertical:4 },
  jobBadgeText:     { color:COLORS.gray400, fontSize:11, fontFamily:"monospace" },
  jobAmount:        { color:COLORS.gold, fontSize:24, fontWeight:"700" },
  routeRow:         { flexDirection:"row", marginBottom:14 },
  routeDots:        { alignItems:"center", width:20, marginRight:12, paddingTop:2 },
  dotGreen:         { width:10, height:10, borderRadius:5, backgroundColor:COLORS.green },
  routeLine:        { width:2, flex:1, backgroundColor:COLORS.darkBorder, marginVertical:4 },
  dotGold:          { width:10, height:10, borderRadius:5, backgroundColor:COLORS.gold },
  routeAddresses:   { flex:1, justifyContent:"space-between" },
  routeText:        { color:COLORS.white, fontSize:14, fontWeight:"500" },
  jobMeta:          { flexDirection:"row", flexWrap:"wrap", gap:8, marginBottom:14, paddingVertical:12, borderTopWidth:1, borderBottomWidth:1, borderColor:COLORS.darkBorder },
  metaItem:         { color:COLORS.gray400, fontSize:12 },
  customerRow:      { flexDirection:"row", alignItems:"center", gap:10, marginBottom:16 },
  customerAvatar:   { width:36, height:36, borderRadius:18, backgroundColor:`${COLORS.gold}20`, justifyContent:"center", alignItems:"center" },
  customerAvatarText:{ color:COLORS.gold, fontWeight:"700" },
  customerName:     { color:COLORS.white, fontWeight:"600", fontSize:14 },
  jobActions:       { flexDirection:"row", gap:10 },
  declineBtn:       { flex:1, borderWidth:1, borderColor:COLORS.red, borderRadius:12, paddingVertical:13, alignItems:"center" },
  declineBtnText:   { color:COLORS.red, fontWeight:"700", fontSize:15 },
  acceptBtn:        { flex:2, backgroundColor:COLORS.gold, borderRadius:12, paddingVertical:13, alignItems:"center" },
  acceptBtnText:    { color:COLORS.black, fontWeight:"700", fontSize:15 },
  offlineMsg:       { alignItems:"center", padding:40, paddingTop:20 },
  offlineMsgTitle:  { color:COLORS.white, fontSize:20, fontWeight:"700", marginBottom:10 },
  offlineMsgSub:    { color:COLORS.gray500, fontSize:14, textAlign:"center", lineHeight:22 },
});
