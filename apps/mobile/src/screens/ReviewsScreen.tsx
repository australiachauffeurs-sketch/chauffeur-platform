import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, TextInput, Alert,
} from "react-native";
import { useTheme } from "../lib/ThemeContext";

type Review = {
  id: string;
  driver: string;
  driverInitial: string;
  route: string;
  date: string;
  rating: number;
  comment: string;
};

function StarRating({ rating, onRate, size = 24 }: { rating: number; onRate?: (r: number) => void; size?: number }) {
  return (
    <View style={{ flexDirection: "row", gap: 4 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <TouchableOpacity key={i} onPress={() => onRate?.(i)} disabled={!onRate}>
          <Text style={{ fontSize: size, opacity: i <= rating ? 1 : 0.2, color: "#C9A84C" }}>★</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default function ReviewsScreen({ navigation }: any) {
  const { colors } = useTheme();
  const COLORS = colors;
  const styles = makeStyles(colors);
  const [reviews]            = useState<Review[]>([]);

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : "0";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Reviews</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {reviews.length === 0 ? (
          <View style={styles.emptyWrap}>
            <Text style={styles.emptyStar}>★</Text>
            <Text style={styles.emptyTitle}>No reviews yet</Text>
            <Text style={styles.emptySub}>
              After your first ride, you can rate your chauffeur and your reviews will appear here.
            </Text>
            <TouchableOpacity style={styles.emptyBtn} onPress={() => navigation.navigate("Book")}>
              <Text style={styles.emptyBtnText}>Book Your First Ride →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Stats Overview */}
            <View style={styles.statsCard}>
              <View style={styles.ratingBig}>
                <Text style={styles.ratingNum}>{avgRating}</Text>
                <StarRating rating={Math.round(Number(avgRating))} size={20} />
                <Text style={styles.ratingCount}>{reviews.length} reviews</Text>
              </View>
              <View style={styles.ratingBars}>
                {[5, 4, 3, 2, 1].map(star => {
                  const count = reviews.filter(r => r.rating === star).length;
                  const pct   = reviews.length ? (count / reviews.length) * 100 : 0;
                  return (
                    <View key={star} style={styles.barRow}>
                      <Text style={styles.barLabel}>{star}★</Text>
                      <View style={styles.barTrack}>
                        <View style={[styles.barFill, { width: `${pct}%` }]} />
                      </View>
                      <Text style={styles.barCount}>{count}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Review List */}
            <Text style={styles.sectionTitle}>Past Reviews</Text>
            {reviews.map(r => (
              <View key={r.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.driverAvatar}>
                    <Text style={styles.driverAvatarText}>{r.driverInitial}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.driverName}>{r.driver}</Text>
                    <Text style={styles.reviewRoute}>{r.route}</Text>
                  </View>
                  <Text style={styles.reviewDate}>{r.date}</Text>
                </View>
                <View style={styles.reviewStars}>
                  <StarRating rating={r.rating} size={16} />
                </View>
                <Text style={styles.reviewComment}>{r.comment}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS: any) => StyleSheet.create({
  container:       { flex: 1, backgroundColor: COLORS.black },
  header:          { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.darkBorder },
  back:            { color: COLORS.gold, fontSize: 16 },
  title:           { color: COLORS.white, fontWeight: "700", fontSize: 17 },
  statsCard:       { backgroundColor: COLORS.darkSurface, borderRadius: 20, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: `${COLORS.gold}25`, flexDirection: "row", gap: 20 },
  ratingBig:       { alignItems: "center", justifyContent: "center", paddingRight: 20, borderRightWidth: 1, borderRightColor: COLORS.darkBorder },
  ratingNum:       { color: COLORS.gold, fontSize: 42, fontWeight: "800", marginBottom: 4 },
  ratingCount:     { color: COLORS.gray500, fontSize: 12, marginTop: 4 },
  ratingBars:      { flex: 1, justifyContent: "center", gap: 6 },
  barRow:          { flexDirection: "row", alignItems: "center", gap: 6 },
  barLabel:        { color: COLORS.gray500, fontSize: 11, width: 28 },
  barTrack:        { flex: 1, height: 6, backgroundColor: COLORS.darkMuted, borderRadius: 3, overflow: "hidden" },
  barFill:         { height: "100%", backgroundColor: COLORS.gold, borderRadius: 3 },
  barCount:        { color: COLORS.gray500, fontSize: 11, width: 16, textAlign: "right" },
  pendingBanner:   { backgroundColor: `${COLORS.gold}10`, borderRadius: 16, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: `${COLORS.gold}30`, flexDirection: "row", alignItems: "center", gap: 12 },
  pendingTitle:    { color: COLORS.white, fontWeight: "700", fontSize: 15, marginBottom: 4 },
  pendingSub:      { color: COLORS.gray400, fontSize: 12 },
  rateNowBtn:      { backgroundColor: COLORS.gold, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 10 },
  rateNowText:     { color: COLORS.black, fontWeight: "700", fontSize: 13 },
  sectionTitle:    { color: COLORS.gray400, fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 },
  reviewCard:      { backgroundColor: COLORS.darkSurface, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.darkBorder },
  reviewHeader:    { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 10 },
  emptyWrap:       { alignItems: "center", paddingTop: 70, paddingHorizontal: 20 },
  emptyStar:       { fontSize: 52, color: `${COLORS.gold}40`, marginBottom: 14 },
  emptyTitle:      { color: COLORS.white, fontSize: 20, fontWeight: "800", marginBottom: 8 },
  emptySub:        { color: COLORS.gray500, fontSize: 14, textAlign: "center", lineHeight: 21, marginBottom: 24 },
  emptyBtn:        { backgroundColor: COLORS.gold, borderRadius: 14, paddingHorizontal: 26, paddingVertical: 13 },
  emptyBtnText:    { color: COLORS.black, fontWeight: "800", fontSize: 14 },
  driverAvatar:    { width: 40, height: 40, borderRadius: 20, backgroundColor: `${COLORS.gold}15`, justifyContent: "center", alignItems: "center", borderWidth: 1.5, borderColor: `${COLORS.gold}30` },
  driverAvatarText:{ color: COLORS.gold, fontWeight: "700", fontSize: 16 },
  driverName:      { color: COLORS.white, fontWeight: "700", fontSize: 15 },
  reviewRoute:     { color: COLORS.gray500, fontSize: 12 },
  reviewDate:      { color: COLORS.gray500, fontSize: 11 },
  reviewStars:     { marginBottom: 8 },
  reviewComment:   { color: COLORS.gray400, fontSize: 13, lineHeight: 20 },
});
