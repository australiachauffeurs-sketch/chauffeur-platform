import React, { useEffect, useState } from "react";
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  SafeAreaView, Alert, ActivityIndicator, StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import { API_BASE } from "../lib/config";
import { useTheme } from "../lib/ThemeContext";

const GOLD   = "#C9A84C";
const BLACK  = "#09090B";
const CARD   = "#17171A";
const MUTED  = "#1E1E22";
const BORDER = "#2A2A30";
const WHITE  = "#FFFFFF";
const GRAY   = "#6B7280";
const GRAY2  = "#9CA3AF";
const GREEN  = "#4ADE80";

const MENU_ITEMS = [
  { icon: "📋", label: "My Bookings",       sub: "View all your trips",      screen: "Bookings"       },
  { icon: "💳", label: "Payment Methods",   sub: "Cards & invoicing",        screen: "PaymentMethods" },
  { icon: "⭐", label: "My Reviews",        sub: "Ratings & feedback",       screen: "Reviews"        },
  { icon: "📍", label: "Saved Addresses",   sub: "Home, work & favourites",  screen: "SavedAddresses" },
  { icon: "🔔", label: "Notifications",     sub: "Manage alerts",            screen: "Notifications"  },
  { icon: "🔒", label: "Privacy & Security",sub: "Account settings",         screen: "Settings"       },
  { icon: "🎁", label: "Refer a Friend",    sub: "Give $20, get $20",        screen: "Referral"       },
  { icon: "💬", label: "Support",           sub: "24/7 live assistance",     screen: "Support"        },
];

interface LoyaltyData {
  points: number;
  tier: string;
  nextTier: { next: string; needed: number } | null;
}

export default function ProfileScreen({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const GOLD = colors.gold, BLACK = colors.black, CARD = colors.darkSurface, MUTED = colors.darkMuted,
        BORDER = colors.darkBorder, WHITE = colors.white, GRAY = colors.gray500, GRAY2 = colors.gray400, GREEN = colors.green;
  const styles = makeStyles(colors);
  const [user,      setUser]      = useState<{ name: string; email: string; id?: string } | null>(null);
  const [loyalty,   setLoyalty]   = useState<LoyaltyData | null>(null);
  const [redeeming, setRedeeming] = useState(false);
  const [stats,     setStats]     = useState({ trips: 0, rating: "—", spent: "$0" });

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem("ec_user");
        if (!raw) return;
        const parsed = JSON.parse(raw);
        setUser(parsed);

        const userId = parsed.id || "demo";

        // Load loyalty points
        try {
          const r = await fetch(`${API_BASE}/api/loyalty?userId=${userId}`);
          const j = await r.json();
          setLoyalty(j);
        } catch {
          setLoyalty({ points: 0, tier: "Silver", nextTier: { next: "Gold", needed: 500 } });
        }

        // Load booking stats from Supabase
        if (parsed.id) {
          const { data } = await supabase
            .from("bookings")
            .select("total_amount, status")
            .eq("customer_id", parsed.id);
          if (data) {
            const completed = data.filter(b => b.status === "completed");
            const total = completed.reduce((s, b) => s + (b.total_amount || 0), 0);
            setStats({
              trips: data.length,
              rating: completed.length ? "5.0★" : "New",
              spent: `$${total.toFixed(0)}`,
            });
          }
        }
      } catch {}
    })();
  }, []);

  const handleRedeem = async () => {
    if (!loyalty || loyalty.points < 100) return;
    setRedeeming(true);
    try {
      const userId = user?.id || "demo";
      const res  = await fetch(`${API_BASE}/api/loyalty`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "redeem", userId, points: 100 }),
      });
      const json = await res.json();
      if (json.ok) {
        setLoyalty(prev => prev ? { ...prev, points: json.newPoints } : prev);
        Alert.alert("🎉 Redeemed!", `$${json.creditEarned?.toFixed(2) || "5.00"} credit added to your account.`);
      }
    } catch {}
    finally { setRedeeming(false); }
  };

  const tierColor = (tier: string) => {
    if (tier === "Platinum") return "#A855F7";
    if (tier === "Gold")     return GOLD;
    return "#9CA3AF";
  };

  const tierIcon = (tier: string) => {
    if (tier === "Platinum") return "💎";
    if (tier === "Gold")     return "🥇";
    return "🥈";
  };

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out", style: "destructive",
        onPress: async () => {
          await supabase.auth.signOut();
          await AsyncStorage.removeItem("ec_user");
          await AsyncStorage.removeItem("ec_pending_user");
          navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Login" }] }));
        },
      },
    ]);
  };

  const initials = (user?.name ?? "U")
    .split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={BLACK} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* ── Hero ───────────────────────────────────────────── */}
        <View style={styles.hero}>
          {/* Gold glow */}
          <View style={styles.heroGlow} />

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
            <View style={styles.avatarOnline} />
          </View>

          <Text style={styles.userName}>{user?.name ?? "Guest User"}</Text>
          <Text style={styles.userEmail}>{user?.email ?? "Not signed in"}</Text>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <Text style={styles.editBtnText}>✏️  Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* ── Stats Row ──────────────────────────────────────── */}
        <View style={styles.statsRow}>
          {[
            { icon: "🚗", val: String(stats.trips), lbl: "Trips" },
            { icon: "⭐", val: stats.rating,         lbl: "Rating" },
            { icon: "💰", val: stats.spent,          lbl: "Spent"  },
          ].map(s => (
            <View key={s.lbl} style={styles.statCard}>
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={styles.statVal}>{s.val}</Text>
              <Text style={styles.statLbl}>{s.lbl}</Text>
            </View>
          ))}
        </View>

        {/* ── Loyalty Card ───────────────────────────────────── */}
        {loyalty && (
          <View style={styles.loyaltyCard}>
            <View style={styles.loyaltyTopRow}>
              <View>
                <Text style={styles.loyaltyLabel}>Loyalty Points</Text>
                <Text style={styles.loyaltyPts}>{loyalty.points.toLocaleString()}</Text>
              </View>
              <View style={[styles.tierBadge, { borderColor: `${tierColor(loyalty.tier)}50`, backgroundColor: `${tierColor(loyalty.tier)}12` }]}>
                <Text style={styles.tierIcon}>{tierIcon(loyalty.tier)}</Text>
                <Text style={[styles.tierName, { color: tierColor(loyalty.tier) }]}>{loyalty.tier}</Text>
              </View>
            </View>

            {loyalty.nextTier && (
              <View style={styles.progressWrap}>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressFill, {
                    width: `${Math.min(100, loyalty.tier === "Silver"
                      ? (loyalty.points / 500) * 100
                      : ((loyalty.points - 500) / 1500) * 100)}%` as any,
                  }]} />
                </View>
                <Text style={styles.progressHint}>
                  {loyalty.nextTier.needed} pts to {loyalty.nextTier.next}
                </Text>
              </View>
            )}

            <View style={styles.loyaltyFooter}>
              <Text style={styles.ptsRate}>100 pts = $5 account credit</Text>
              <TouchableOpacity
                style={[styles.redeemBtn, loyalty.points < 100 && { opacity: 0.35 }]}
                onPress={handleRedeem}
                disabled={loyalty.points < 100 || redeeming}
              >
                {redeeming
                  ? <ActivityIndicator color={GOLD} size="small" />
                  : <Text style={styles.redeemText}>Redeem</Text>
                }
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ── Menu ───────────────────────────────────────────── */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuRow, i < MENU_ITEMS.length - 1 && styles.menuDivider]}
              onPress={() => navigation.navigate(item.screen)}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconWrap}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
              </View>
              <View style={styles.menuTextWrap}>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Text style={styles.menuSub}>{item.sub}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Sign Out ───────────────────────────────────────── */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Elite Chauffeurs v1.0.0 · Australia</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (c: any) => {
  const GOLD = c.gold, BLACK = c.black, CARD = c.darkSurface, MUTED = c.darkMuted,
        BORDER = c.darkBorder, WHITE = c.white, GRAY = c.gray500, GRAY2 = c.gray400, GREEN = c.green;
  return StyleSheet.create({
  root: { flex: 1, backgroundColor: BLACK },

  // Hero
  hero: { alignItems: "center", paddingTop: 32, paddingBottom: 28, paddingHorizontal: 24, position: "relative" },
  heroGlow: { position: "absolute", top: 0, inset: 0, height: 220,
    backgroundColor: "rgba(201,168,76,0.04)" },
  avatar: { width: 88, height: 88, borderRadius: 44, backgroundColor: "rgba(201,168,76,0.15)",
    borderWidth: 3, borderColor: GOLD, justifyContent: "center", alignItems: "center",
    marginBottom: 16, shadowColor: GOLD, shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 16, elevation: 8 },
  avatarText: { color: GOLD, fontSize: 30, fontWeight: "900" },
  avatarOnline: { position: "absolute", bottom: 4, right: 4, width: 14, height: 14,
    borderRadius: 7, backgroundColor: GREEN, borderWidth: 2.5, borderColor: BLACK },
  userName: { color: WHITE, fontSize: 22, fontWeight: "800", marginBottom: 4 },
  userEmail: { color: GRAY, fontSize: 13, marginBottom: 16 },
  editBtn: { flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: MUTED, borderRadius: 12, paddingHorizontal: 18, paddingVertical: 9,
    borderWidth: 1, borderColor: BORDER },
  editBtnText: { color: WHITE, fontSize: 13, fontWeight: "600" },

  // Stats
  statsRow: { flexDirection: "row", marginHorizontal: 16, marginBottom: 14, gap: 10 },
  statCard: { flex: 1, backgroundColor: CARD, borderRadius: 16, borderWidth: 1,
    borderColor: BORDER, alignItems: "center", paddingVertical: 14 },
  statIcon: { fontSize: 20, marginBottom: 6 },
  statVal:  { color: GOLD, fontSize: 17, fontWeight: "900", marginBottom: 2 },
  statLbl:  { color: GRAY, fontSize: 10, fontWeight: "600" },

  // Loyalty
  loyaltyCard: { marginHorizontal: 16, marginBottom: 14, backgroundColor: CARD,
    borderRadius: 20, borderWidth: 1, borderColor: "rgba(201,168,76,0.25)", padding: 18 },
  loyaltyTopRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  loyaltyLabel:  { color: GRAY2, fontSize: 11, fontWeight: "600", marginBottom: 4 },
  loyaltyPts:    { color: GOLD, fontSize: 36, fontWeight: "900" },
  tierBadge:     { flexDirection: "row", alignItems: "center", gap: 5,
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, borderWidth: 1 },
  tierIcon:  { fontSize: 14 },
  tierName:  { fontSize: 13, fontWeight: "700" },
  progressWrap:  { marginBottom: 14 },
  progressTrack: { height: 5, borderRadius: 3, backgroundColor: BORDER, marginBottom: 6, overflow: "hidden" },
  progressFill:  { height: "100%", backgroundColor: GOLD, borderRadius: 3 },
  progressHint:  { color: GRAY, fontSize: 10 },
  loyaltyFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  ptsRate:       { color: GRAY, fontSize: 11 },
  redeemBtn:     { borderRadius: 10, borderWidth: 1, borderColor: "rgba(201,168,76,0.5)",
    paddingHorizontal: 16, paddingVertical: 8 },
  redeemText:    { color: GOLD, fontSize: 13, fontWeight: "700" },

  // Menu
  menuCard: { marginHorizontal: 16, marginBottom: 14, backgroundColor: CARD,
    borderRadius: 20, borderWidth: 1, borderColor: BORDER, overflow: "hidden" },
  menuRow:     { flexDirection: "row", alignItems: "center", paddingVertical: 15, paddingHorizontal: 16 },
  menuDivider: { borderBottomWidth: 1, borderBottomColor: BORDER },
  menuIconWrap:{ width: 40, height: 40, borderRadius: 12, backgroundColor: "rgba(201,168,76,0.08)",
    borderWidth: 1, borderColor: "rgba(201,168,76,0.18)", justifyContent: "center",
    alignItems: "center", marginRight: 14 },
  menuIcon:     { fontSize: 18 },
  menuTextWrap: { flex: 1 },
  menuLabel:    { color: WHITE, fontSize: 15, fontWeight: "600", marginBottom: 2 },
  menuSub:      { color: GRAY, fontSize: 11 },
  chevron:      { color: GRAY, fontSize: 24, fontWeight: "300" },

  // Logout
  logoutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
    marginHorizontal: 16, borderRadius: 14, borderWidth: 1, borderColor: "rgba(248,113,113,0.3)",
    backgroundColor: "rgba(248,113,113,0.05)", paddingVertical: 15, marginBottom: 14 },
  logoutIcon: { fontSize: 18 },
  logoutText: { color: "#F87171", fontWeight: "700", fontSize: 16 },
  version:    { color: "#374151", fontSize: 11, textAlign: "center" },
  });
};
