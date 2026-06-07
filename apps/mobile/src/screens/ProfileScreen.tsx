import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView, Alert, Switch } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import { useTheme } from "../lib/ThemeContext";
import { API_BASE } from "../lib/config";

interface LoyaltyData {
  points: number;
  tier: string;
  nextTier: { next: string; needed: number } | null;
}

const MENU_ITEMS = [
  { abbr:"BK", label:"My Bookings",        sub:"View all trips",        screen:"Bookings"       },
  { abbr:"PM", label:"Payment Methods",    sub:"Cards & invoicing",     screen:"PaymentMethods" },
  { abbr:"RV", label:"My Reviews",         sub:"Ratings & feedback",    screen:"Reviews"        },
  { abbr:"AD", label:"Saved Addresses",    sub:"Home, work & more",     screen:"SavedAddresses" },
  { abbr:"NT", label:"Notifications",      sub:"Manage alerts",         screen:"Notifications"  },
  { abbr:"PS", label:"Privacy & Security", sub:"Account settings",      screen:"Settings"       },
  { abbr:"RF", label:"Refer a Friend",      sub:"Give $20, get $20",     screen:"Referral"       },
  { abbr:"SP", label:"Support",            sub:"24/7 assistance",       screen:"Support"        },
];

export default function ProfileScreen({ navigation }: any) {
  const { colors, isDark, toggleTheme } = useTheme();
  const [user, setUser] = useState<{ name: string; email: string; id?: string } | null>(null);
  const [loyalty, setLoyalty] = useState<LoyaltyData | null>(null);
  const [redeeming, setRedeeming] = useState(false);

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem("ec_user");
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          setUser(parsed);
          // Load loyalty
          const userId = parsed.id || "demo-user";
          const res = await fetch(`${API_BASE}/api/loyalty?userId=${userId}`);
          const json = await res.json();
          setLoyalty(json);
        } catch {
          setLoyalty({ points: 350, tier: "Silver", nextTier: { next: "Gold", needed: 150 } });
        }
      }
    })();
  }, []);

  const handleRedeem = async () => {
    if (!loyalty || loyalty.points < 100) return;
    setRedeeming(true);
    try {
      const userId = user?.id || "demo-user";
      const res = await fetch(`${API_BASE}/api/loyalty`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "redeem", userId, points: 100 }),
      });
      const json = await res.json();
      if (json.ok) {
        setLoyalty(prev => prev ? { ...prev, points: json.newPoints } : prev);
        Alert.alert("Redeemed!", `$${json.creditEarned?.toFixed(2) || "5.00"} credit added to your account.`);
      }
    } catch { /* swallow */ }
    finally { setRedeeming(false); }
  };

  const tierColor = (tier: string) => {
    if (tier === "Platinum") return "#A855F7";
    if (tier === "Gold")     return colors.gold;
    return "#9CA3AF";
  };

  const handleLogout = () => {
    Alert.alert(
      "Sign out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out", style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("ec_user");
            await AsyncStorage.removeItem("ec_pending_user");
            navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: "Login" }] }));
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      <ScrollView>
        {/* Profile hero */}
        <View style={styles.hero}>
          <View style={[styles.avatar, { backgroundColor: colors.darkMuted, borderColor: colors.gold }]}>
            <Text style={[styles.avatarText, { color: colors.gold }]}>{(user?.name ?? "U").charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={[styles.name, { color: colors.white }]}>{user?.name ?? "Guest User"}</Text>
          <Text style={[styles.email, { color: colors.gray500 }]}>{user?.email ?? "Not signed in"}</Text>
          <View style={[styles.badge, { backgroundColor: `${colors.gold}15`, borderColor: `${colors.gold}30` }]}>
            <Text style={[styles.badgeText, { color: colors.gold }]}>Corporate Account</Text>
          </View>
          <TouchableOpacity style={[styles.editProfileBtn, { backgroundColor: colors.darkMuted, borderColor: colors.darkBorder }]} onPress={() => navigation.navigate("EditProfile")}>
            <Text style={[styles.editProfileText, { color: colors.white }]}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {[
            { value:"12",    label:"Trips"       },
            { value:"4.9★",  label:"Rating"      },
            { value:"$1,840",label:"Total Spent" },
          ].map(s => (
            <View key={s.label} style={[styles.statBox, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
              <Text style={[styles.statValue, { color: colors.gold }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: colors.gray500 }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Loyalty Card */}
        {loyalty && (
          <View style={[styles.loyaltyCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
            <View style={styles.loyaltyTop}>
              <View>
                <Text style={[styles.loyaltyLabel, { color: colors.gray400 }]}>Loyalty Points</Text>
                <Text style={[styles.loyaltyPoints, { color: colors.gold }]}>{loyalty.points.toLocaleString()}</Text>
              </View>
              <View style={[styles.tierBadge, { backgroundColor: `${tierColor(loyalty.tier)}20`, borderColor: `${tierColor(loyalty.tier)}40` }]}>
                <Text style={[styles.tierText, { color: tierColor(loyalty.tier) }]}>{loyalty.tier}</Text>
              </View>
            </View>

            {/* Progress bar */}
            {loyalty.nextTier && (
              <View style={styles.progressWrap}>
                <View style={[styles.progressTrack, { backgroundColor: colors.darkBorder }]}>
                  <View style={[
                    styles.progressFill,
                    {
                      backgroundColor: colors.gold,
                      width: `${Math.min(100, loyalty.tier === "Silver" ? (loyalty.points / 500) * 100 : ((loyalty.points - 500) / 1500) * 100)}%` as any,
                    }
                  ]} />
                </View>
                <Text style={[styles.progressLabel, { color: colors.gray500 }]}>
                  {loyalty.nextTier.needed} pts to {loyalty.nextTier.next}
                </Text>
              </View>
            )}

            <View style={styles.loyaltyFooter}>
              <Text style={[styles.loyaltyHint, { color: colors.gray500 }]}>100 pts = $5 credit</Text>
              <TouchableOpacity
                style={[
                  styles.redeemBtn,
                  { borderColor: colors.gold },
                  loyalty.points < 100 && { opacity: 0.4 },
                ]}
                onPress={handleRedeem}
                disabled={loyalty.points < 100 || redeeming}
              >
                <Text style={[styles.redeemBtnText, { color: colors.gold }]}>
                  {redeeming ? "…" : "Redeem"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Menu */}
        <View style={[styles.menu, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuItem,
                { borderBottomColor: colors.darkBorder },
                i === MENU_ITEMS.length - 1 && { borderBottomWidth: 0 },
              ]}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={[styles.menuIconBox, { backgroundColor: `${colors.gold}12`, borderColor: `${colors.gold}25` }]}>
                <Text style={[styles.menuIconText, { color: colors.gold }]}>{item.abbr}</Text>
              </View>
              <View style={{ flex:1 }}>
                <Text style={[styles.menuLabel, { color: colors.white }]}>{item.label}</Text>
                <Text style={[styles.menuSub, { color: colors.gray500 }]}>{item.sub}</Text>
              </View>
              <Text style={[styles.chevron, { color: colors.gray500 }]}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Theme Toggle */}
        <View style={[styles.themeRow, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
          <View style={styles.themeLeft}>
            <View style={[styles.menuIconBox, { backgroundColor: `${colors.gold}12`, borderColor: `${colors.gold}25` }]}>
              <Text style={[styles.menuIconText, { color: colors.gold }]}>{isDark ? "DK" : "LT"}</Text>
            </View>
            <View>
              <Text style={[styles.menuLabel, { color: colors.white }]}>
                {isDark ? "Dark Mode" : "Light Mode"}
              </Text>
              <Text style={[styles.menuSub, { color: colors.gray500 }]}>Tap to switch theme</Text>
            </View>
          </View>
          <Switch
            value={!isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: colors.darkBorder, true: `${colors.gold}60` }}
            thumbColor={isDark ? colors.gray400 : colors.gold}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={[styles.version, { color: colors.gray500 }]}>Elite Chauffeurs v1.0.0 · Australia</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex:1 },
  hero:           { alignItems:"center", padding:28, paddingBottom:24 },
  avatar:         { width:80, height:80, borderRadius:40, borderWidth:3, justifyContent:"center", alignItems:"center", marginBottom:14 },
  avatarText:     { fontSize:32, fontWeight:"700" },
  name:           { fontSize:22, fontWeight:"700", marginBottom:4 },
  email:          { fontSize:13, marginBottom:12 },
  badge:          { borderRadius:20, paddingHorizontal:14, paddingVertical:5, borderWidth:1 },
  badgeText:      { fontSize:12, fontWeight:"600" },
  editProfileBtn: { marginTop:12, borderRadius:12, paddingHorizontal:20, paddingVertical:8, borderWidth:1 },
  editProfileText:{ fontSize:13, fontWeight:"600" },
  statsRow:       { flexDirection:"row", marginHorizontal:16, marginBottom:20, gap:10 },
  statBox:        { flex:1, borderRadius:14, padding:14, alignItems:"center", borderWidth:1 },
  statValue:      { fontSize:18, fontWeight:"700", marginBottom:2 },
  statLabel:      { fontSize:10 },
  menu:           { marginHorizontal:16, borderRadius:18, overflow:"hidden", borderWidth:1, marginBottom:16 },
  menuItem:       { flexDirection:"row", alignItems:"center", paddingVertical:14, paddingHorizontal:16, borderBottomWidth:1 },
  menuIconBox:    { width:36, height:36, borderRadius:10, borderWidth:1, justifyContent:"center", alignItems:"center", marginRight:14 },
  menuIconText:   { fontSize:9, fontWeight:"800", letterSpacing:0.5 },
  menuLabel:      { fontSize:15, fontWeight:"500", marginBottom:2 },
  menuSub:        { fontSize:11 },
  chevron:        { fontSize:22 },
  themeRow:       { flexDirection:"row", alignItems:"center", justifyContent:"space-between", padding:16, borderRadius:16, borderWidth:1, marginBottom:10, marginHorizontal:16 },
  themeLeft:      { flexDirection:"row", alignItems:"center", gap:14 },
  logoutBtn:      { marginHorizontal:16, borderRadius:14, borderWidth:1, borderColor:"#F87171", paddingVertical:14, alignItems:"center", marginBottom:12 },
  logoutText:     { color:"#F87171", fontWeight:"700", fontSize:16 },
  version:        { fontSize:11, textAlign:"center", paddingBottom:24 },
  loyaltyCard:    { marginHorizontal:16, borderRadius:18, borderWidth:1, padding:18, marginBottom:16 },
  loyaltyTop:     { flexDirection:"row", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 },
  loyaltyLabel:   { fontSize:11, marginBottom:4 },
  loyaltyPoints:  { fontSize:32, fontWeight:"900" },
  tierBadge:      { borderRadius:20, paddingHorizontal:12, paddingVertical:5, borderWidth:1 },
  tierText:       { fontSize:12, fontWeight:"700" },
  progressWrap:   { marginBottom:14 },
  progressTrack:  { height:6, borderRadius:3, overflow:"hidden", marginBottom:6 },
  progressFill:   { height:6, borderRadius:3 },
  progressLabel:  { fontSize:10 },
  loyaltyFooter:  { flexDirection:"row", justifyContent:"space-between", alignItems:"center" },
  loyaltyHint:    { fontSize:11 },
  redeemBtn:      { borderRadius:10, borderWidth:1, paddingHorizontal:14, paddingVertical:7 },
  redeemBtnText:  { fontSize:12, fontWeight:"700" },
});
