import React, { useState, useCallback } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, RefreshControl, Animated,
} from "react-native";
import { COLORS, SHADOWS } from "../lib/theme";

type Notification = {
  id: string;
  type: "booking" | "promo" | "driver" | "system" | "payment";
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const ICON_MAP: Record<string, string> = {
  booking: "B",
  promo:   "P",
  driver:  "D",
  system:  "S",
  payment: "$",
};

const SAMPLE: Notification[] = [
  { id: "1", type: "booking",  title: "Booking Confirmed",       message: "Your ride to Sydney Airport on Jul 12 at 6:30 AM has been confirmed.",                    time: "2 min ago",  read: false },
  { id: "2", type: "driver",   title: "Driver Assigned",         message: "Marcus T. has been assigned to your upcoming trip. 4.9 rating.",                       time: "15 min ago", read: false },
  { id: "3", type: "payment",  title: "Payment Received",        message: "Payment of $142.50 for booking #EC8F2A processed successfully.",                          time: "1 hr ago",   read: false },
  { id: "4", type: "promo",    title: "Weekend Special",      message: "Get 20% off all weekend bookings. Use code WEEKEND20 at checkout.",                       time: "3 hrs ago",  read: true  },
  { id: "5", type: "booking",  title: "Trip Completed",          message: "Your trip from CBD to Melbourne Airport has been completed. Rate your experience!",        time: "Yesterday",  read: true  },
  { id: "6", type: "system",   title: "App Update Available",    message: "A new version of Elite Chauffeurs is available with improved tracking features.",          time: "2 days ago", read: true  },
  { id: "7", type: "promo",    title: "Refer & Earn",            message: "Share your referral code ELITE2026 and earn $25 credit for each friend who books.",        time: "3 days ago", read: true  },
  { id: "8", type: "driver",   title: "Driver En Route",         message: "Your chauffeur is on the way. Estimated arrival in 8 minutes.",                           time: "5 days ago", read: true  },
];

export default function NotificationsScreen({ navigation }: any) {
  const [notifications, setNotifications] = useState<Notification[]>(SAMPLE);
  const [refreshing, setRefreshing]       = useState(false);
  const [filter, setFilter]               = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered    = filter === "unread" ? notifications.filter(n => !n.read) : notifications;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity onPress={markAllRead}>
          <Text style={styles.markAll}>Read All</Text>
        </TouchableOpacity>
      </View>

      {/* Filter tabs */}
      <View style={styles.filterRow}>
        {(["all", "unread"] as const).map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, filter === f && styles.filterTabActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === "all" ? "All" : `Unread (${unreadCount})`}
            </Text>
          </TouchableOpacity>
        ))}
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={clearAll}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.gold} />}
      >
        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={{ fontSize: 16, marginBottom: 12, color: COLORS.gray500 }}>No notifications</Text>
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptySub}>No {filter === "unread" ? "unread " : ""}notifications right now.</Text>
          </View>
        ) : (
          filtered.map((n, i) => (
            <TouchableOpacity
              key={n.id}
              style={[styles.card, !n.read && styles.cardUnread]}
              onPress={() => markRead(n.id)}
              activeOpacity={0.85}
            >
              {!n.read && <View style={styles.unreadDot} />}
              <View style={[styles.iconBox, { backgroundColor: n.type === "promo" ? `${COLORS.gold}15` : n.type === "payment" ? "#4ADE8015" : `${COLORS.gold}10` }]}>
                <Text style={{ fontSize: 16, color: COLORS.gold, fontWeight: "700" }}>{ICON_MAP[n.type]}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.cardHeader}>
                  <Text style={[styles.cardTitle, !n.read && { fontWeight: "800" }]} numberOfLines={1}>{n.title}</Text>
                  <Text style={styles.cardTime}>{n.time}</Text>
                </View>
                <Text style={styles.cardMessage} numberOfLines={2}>{n.message}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: COLORS.black },
  header:          { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.darkBorder },
  back:            { color: COLORS.gold, fontSize: 16 },
  title:           { color: COLORS.white, fontWeight: "700", fontSize: 17 },
  markAll:         { color: COLORS.gold, fontSize: 13, fontWeight: "600" },
  filterRow:       { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  filterTab:       { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20, backgroundColor: COLORS.darkMuted },
  filterTabActive: { backgroundColor: `${COLORS.gold}20`, borderWidth: 1, borderColor: `${COLORS.gold}40` },
  filterText:      { color: COLORS.gray500, fontSize: 13, fontWeight: "500" },
  filterTextActive:{ color: COLORS.gold, fontWeight: "600" },
  clearText:       { color: COLORS.gray500, fontSize: 12 },
  empty:           { alignItems: "center", paddingTop: 60 },
  emptyTitle:      { color: COLORS.white, fontSize: 20, fontWeight: "700", marginBottom: 6 },
  emptySub:        { color: COLORS.gray500, fontSize: 14 },
  card:            { flexDirection: "row", alignItems: "flex-start", backgroundColor: COLORS.darkSurface, borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: COLORS.darkBorder, gap: 12 },
  cardUnread:      { borderColor: `${COLORS.gold}30`, backgroundColor: `${COLORS.gold}05` },
  unreadDot:       { position: "absolute", top: 14, left: 14, width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.gold, zIndex: 10 },
  iconBox:         { width: 44, height: 44, borderRadius: 14, justifyContent: "center", alignItems: "center" },
  cardHeader:      { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  cardTitle:       { color: COLORS.white, fontSize: 14, fontWeight: "600", flex: 1, marginRight: 8 },
  cardTime:        { color: COLORS.gray500, fontSize: 11 },
  cardMessage:     { color: COLORS.gray400, fontSize: 13, lineHeight: 18 },
});
