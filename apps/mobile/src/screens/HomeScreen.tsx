import React, { useState, useRef, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, StatusBar, Dimensions,
  Image, Animated, Platform, FlatList,
} from "react-native";

const { width, height } = Dimensions.get("window");

const GOLD    = "#C9A84C";
const GOLD_DIM = "rgba(201,168,76,0.15)";
const GOLD_BRD = "rgba(201,168,76,0.3)";
const BLACK   = "#09090B";
const SURFACE = "#111113";
const CARD    = "#17171A";
const MUTED   = "#1E1E22";
const BORDER  = "#2A2A30";
const WHITE   = "#FFFFFF";
const GRAY    = "#6B7280";
const GRAY2   = "#9CA3AF";
const GREEN   = "#4ADE80";

const CAR_SLIDES = [
  {
    id: "1",
    uri: "https://images.unsplash.com/photo-1617814076668-8dfc6fe159ed?w=900&q=85",
    category: "EXECUTIVE CLASS",
    label: "Executive Sedan",
    model: "Mercedes-Benz E-Class",
    price: "From $65",
  },
  {
    id: "2",
    uri: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&q=85",
    category: "LUXURY CLASS",
    label: "Luxury Sedan",
    model: "Mercedes-Benz S-Class",
    price: "From $130",
  },
  {
    id: "3",
    uri: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=900&q=85",
    category: "PREMIUM SUV",
    label: "Premium SUV",
    model: "Mercedes-Benz GLE",
    price: "From $85",
  },
  {
    id: "4",
    uri: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
    category: "GROUP CLASS",
    label: "Executive Van",
    model: "Mercedes-Benz Viano",
    price: "From $100",
  },
];

const SERVICES = [
  { icon: "✈", abbr: "AIR", label: "Airport",   type: "airport_transfer" },
  { icon: "💼", abbr: "BIZ", label: "Corporate", type: "corporate"        },
  { icon: "💍", abbr: "WED", label: "Wedding",   type: "wedding"          },
  { icon: "🎉", abbr: "EVT", label: "Events",    type: "special_event"    },
  { icon: "⏱",  abbr: "HRS", label: "Hourly",   type: "hourly"           },
];

export default function HomeScreen({ navigation }: any) {
  const [pickup,      setPickup]      = useState("");
  const [dropoff,     setDropoff]     = useState("");
  const [service,     setService]     = useState("airport_transfer");
  const [activeSlide, setActiveSlide] = useState(0);

  const flatRef    = useRef<FlatList>(null);
  const scrollX    = useRef(new Animated.Value(0)).current;
  const slideTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeAnim   = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    slideTimer.current = setInterval(() => {
      setActiveSlide(prev => {
        const next = (prev + 1) % CAR_SLIDES.length;
        flatRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 4000);
    return () => { if (slideTimer.current) clearInterval(slideTimer.current); };
  }, []);

  const restartTimer = () => {
    if (slideTimer.current) clearInterval(slideTimer.current);
    slideTimer.current = setInterval(() => {
      setActiveSlide(prev => {
        const next = (prev + 1) % CAR_SLIDES.length;
        flatRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 4000);
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BLACK} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >

        {/* ════════════════════════════════════════════
            HERO CAROUSEL
        ════════════════════════════════════════════ */}
        <View style={styles.hero}>

          <Animated.FlatList
            ref={flatRef}
            data={CAR_SLIDES}
            keyExtractor={item => item.id}
            horizontal pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onMomentumScrollEnd={e => {
              const idx = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveSlide(idx);
              restartTimer();
            }}
            renderItem={({ item }) => (
              <View style={styles.slide}>
                <Image source={{ uri: item.uri }} style={styles.carImg} resizeMode="cover" />
                <View style={styles.overlayFull} />
                <View style={styles.overlayTop} />
                <View style={styles.overlayBottom} />
              </View>
            )}
          />

          {/* Gold top stripe */}
          <View style={styles.goldStripe} />

          {/* ── Navbar ── */}
          <View style={styles.nav}>
            <View>
              <Text style={styles.navGreeting}>Good morning</Text>
              <Text style={styles.navBrand}>Elite Chauffeurs</Text>
            </View>
            <TouchableOpacity
              style={styles.avatar}
              onPress={() => navigation.navigate("Profile")}
            >
              <Text style={styles.avatarLetter}>J</Text>
              <View style={styles.onlineBadge} />
            </TouchableOpacity>
          </View>

          {/* ── Slide info ── */}
          <View style={styles.slideInfo}>
            <View style={styles.categoryPill}>
              <View style={styles.pillDot} />
              <Text style={styles.categoryText}>{CAR_SLIDES[activeSlide].category} · AUSTRALIA</Text>
            </View>
            <Text style={styles.carLabel}>{CAR_SLIDES[activeSlide].label}</Text>
            <Text style={styles.carModel}>{CAR_SLIDES[activeSlide].model}</Text>
            <View style={styles.carActions}>
              <View style={styles.pricePill}>
                <Text style={styles.priceText}>{CAR_SLIDES[activeSlide].price}</Text>
              </View>
              <TouchableOpacity
                style={styles.bookHeroBtn}
                onPress={() => navigation.navigate("Book")}
                activeOpacity={0.85}
              >
                <Text style={styles.bookHeroBtnText}>Book This  →</Text>
              </TouchableOpacity>
            </View>

            {/* Dots */}
            <View style={styles.dots}>
              {CAR_SLIDES.map((_, i) => (
                <TouchableOpacity key={i} onPress={() => {
                  setActiveSlide(i);
                  flatRef.current?.scrollToIndex({ index: i, animated: true });
                  restartTimer();
                }}>
                  <View style={[styles.dot, i === activeSlide && styles.dotActive]} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ── Stats bar ── */}
          <View style={styles.statsBar}>
            {[["15K+","Rides"],["4.9★","Rating"],["6","Cities"],["24/7","Support"]].map(([v, l]) => (
              <View key={l} style={styles.statCol}>
                <Text style={styles.statVal}>{v}</Text>
                <Text style={styles.statLbl}>{l}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ════════════════════════════════════════════
            BOOKING CARD
        ════════════════════════════════════════════ */}
        <View style={styles.bookCard}>
          {/* Gold glow line */}
          <View style={styles.cardGlow} />

          {/* Section header */}
          <Text style={styles.cardTitle}>Book a Ride</Text>
          <Text style={styles.cardSub}>Enter your route to get an instant price</Text>

          {/* Service tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
            {SERVICES.map(s => {
              const active = service === s.type;
              return (
                <TouchableOpacity
                  key={s.type}
                  onPress={() => setService(s.type)}
                  style={[styles.tab, active && styles.tabActive]}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.tabIcon, active && { opacity: 1 }]}>{s.icon}</Text>
                  <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{s.label}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Route input box */}
          <View style={styles.routeBox}>
            <View style={styles.inputRow}>
              <View style={[styles.dot2, { backgroundColor: GREEN }]} />
              <TextInput
                style={styles.routeInput}
                placeholder="Pickup location"
                placeholderTextColor="#4A4A55"
                value={pickup}
                onChangeText={setPickup}
                selectionColor={GOLD}
              />
            </View>
            <View style={styles.divRow}>
              <View style={styles.divLine} />
              <TouchableOpacity style={styles.swapBtn}>
                <Text style={{ color: GOLD, fontSize: 18 }}>⇅</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputRow}>
              <View style={[styles.dot2, { backgroundColor: GOLD }]} />
              <TextInput
                style={styles.routeInput}
                placeholder="Drop-off location"
                placeholderTextColor="#4A4A55"
                value={dropoff}
                onChangeText={setDropoff}
                selectionColor={GOLD}
              />
            </View>
          </View>

          {/* CTA */}
          <TouchableOpacity
            style={styles.searchBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Book", { pickup, dropoff, service })}
          >
            <Text style={styles.searchBtnText}>Search & Get Instant Quote</Text>
            <View style={styles.searchArrow}>
              <Text style={{ color: BLACK, fontSize: 16, fontWeight: "900" }}>→</Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.guarantee}>✓ Fixed price  ·  ✓ No surge  ·  ✓ Free cancellation</Text>
        </View>

        {/* ════════════════════════════════════════════
            UPCOMING RIDE (demo)
        ════════════════════════════════════════════ */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Ride</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Bookings")}>
              <Text style={styles.seeAll}>See all →</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.upcomingCard}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("Bookings")}
          >
            <View style={styles.upcomingTop}>
              <View style={styles.confirmedBadge}>
                <View style={styles.confirmedDot} />
                <Text style={styles.confirmedText}>Confirmed</Text>
              </View>
              <Text style={styles.upcomingAmt}>$142</Text>
            </View>
            <Text style={styles.upcomingRoute}>Sydney Airport → CBD</Text>
            <Text style={styles.upcomingMeta}>Today · 06:30 AM  ·  Driver: Marcus T.</Text>
            <View style={styles.progBar}>
              <View style={styles.progFill} />
            </View>
            <View style={styles.upcomingBottom}>
              <Text style={styles.upcomingEta}>Driver en route  ·  ~12 min</Text>
              <TouchableOpacity onPress={() => navigation.navigate("RideTracking")}>
                <Text style={styles.trackLink}>Track Live →</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>

        {/* ════════════════════════════════════════════
            QUICK BOOK GRID
        ════════════════════════════════════════════ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Book</Text>
          <View style={styles.quickGrid}>
            {[
              { icon:"✈", label:"Airport",  sub:"All terminals",        type:"airport_transfer" },
              { icon:"💼", label:"Corporate",sub:"Executive & discreet", type:"corporate"        },
              { icon:"💍", label:"Wedding",  sub:"Special packages",     type:"wedding"          },
              { icon:"⏱", label:"Hourly",   sub:"From 3 hours",         type:"hourly"           },
            ].map(s => (
              <TouchableOpacity
                key={s.label}
                style={styles.quickCard}
                onPress={() => navigation.navigate("Book", { service: s.type })}
                activeOpacity={0.8}
              >
                <Text style={styles.quickIcon}>{s.icon}</Text>
                <Text style={styles.quickLabel}>{s.label}</Text>
                <Text style={styles.quickSub}>{s.sub}</Text>
                <Text style={styles.quickArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ════════════════════════════════════════════
            PROMO BANNER
        ════════════════════════════════════════════ */}
        <View style={[styles.section, { marginBottom: 8 }]}>
          <TouchableOpacity
            style={styles.promoBanner}
            activeOpacity={0.9}
            onPress={() => navigation.navigate("Book")}
          >
            <View style={styles.promoCircle1} />
            <View style={styles.promoCircle2} />
            <View style={{ flex: 1 }}>
              <Text style={styles.promoTag}>LIMITED OFFER</Text>
              <Text style={styles.promoTitle}>First ride 15% off</Text>
              <Text style={styles.promoCode}>Use code ELITE15 at checkout</Text>
            </View>
            <View style={styles.promoBtn}>
              <Text style={styles.promoBtnText}>Book{"\n"}Now</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const HERO_H = height * 0.58;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BLACK },

  // ── HERO ─────────────────────────────────────────────────────────
  hero: { height: HERO_H, position: "relative", backgroundColor: BLACK },
  slide: { width, height: HERO_H },
  carImg: { width: "100%", height: "100%" },
  overlayFull: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(6,5,3,0.48)" },
  overlayTop: { position: "absolute", top: 0, left: 0, right: 0, height: 140, backgroundColor: "rgba(6,5,3,0.65)" },
  overlayBottom: { position: "absolute", bottom: 0, left: 0, right: 0, height: 220, backgroundColor: "rgba(6,5,3,0.88)" },
  goldStripe: { position: "absolute", top: 0, left: 0, right: 0, height: 2.5, backgroundColor: GOLD, opacity: 0.85, zIndex: 10 },

  nav: { position: "absolute", top: Platform.OS === "android" ? 44 : 16, left: 20, right: 20,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center", zIndex: 20 },
  navGreeting: { color: "rgba(201,168,76,0.75)", fontSize: 11, fontWeight: "700", letterSpacing: 0.8 },
  navBrand: { color: WHITE, fontSize: 22, fontWeight: "900", letterSpacing: 0.2, marginTop: 1 },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: "rgba(201,168,76,0.12)",
    borderWidth: 2, borderColor: GOLD, justifyContent: "center", alignItems: "center" },
  avatarLetter: { color: GOLD, fontWeight: "900", fontSize: 18 },
  onlineBadge: { position: "absolute", bottom: 2, right: 2, width: 11, height: 11,
    borderRadius: 6, backgroundColor: GREEN, borderWidth: 2, borderColor: BLACK },

  slideInfo: { position: "absolute", bottom: 60, left: 20, right: 20, zIndex: 20 },
  categoryPill: { flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: "rgba(201,168,76,0.1)", borderWidth: 1, borderColor: GOLD_BRD,
    borderRadius: 20, paddingHorizontal: 11, paddingVertical: 5, alignSelf: "flex-start", marginBottom: 10 },
  pillDot: { width: 5, height: 5, borderRadius: 3, backgroundColor: GOLD },
  categoryText: { color: GOLD, fontSize: 9, fontWeight: "900", letterSpacing: 1.4 },
  carLabel: { color: WHITE, fontSize: 30, fontWeight: "900", letterSpacing: -0.3, marginBottom: 2 },
  carModel: { color: "rgba(201,168,76,0.65)", fontSize: 13, fontWeight: "600", marginBottom: 16 },
  carActions: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 16 },
  pricePill: { backgroundColor: "rgba(201,168,76,0.12)", borderWidth: 1, borderColor: GOLD_BRD,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 7 },
  priceText: { color: GOLD, fontWeight: "900", fontSize: 16 },
  bookHeroBtn: { backgroundColor: GOLD, borderRadius: 12, paddingHorizontal: 18, paddingVertical: 9 },
  bookHeroBtnText: { color: BLACK, fontWeight: "900", fontSize: 13 },

  dots: { flexDirection: "row", gap: 6 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.25)" },
  dotActive: { width: 24, backgroundColor: GOLD, borderRadius: 3 },

  statsBar: { position: "absolute", bottom: 0, left: 0, right: 0,
    flexDirection: "row", backgroundColor: "rgba(8,8,8,0.9)",
    borderTopWidth: 1, borderTopColor: "rgba(201,168,76,0.12)", paddingVertical: 10, zIndex: 20 },
  statCol: { flex: 1, alignItems: "center" },
  statVal: { color: GOLD, fontSize: 15, fontWeight: "900" },
  statLbl: { color: GRAY, fontSize: 9, fontWeight: "600", marginTop: 1, letterSpacing: 0.3 },

  // ── BOOKING CARD ─────────────────────────────────────────────────
  bookCard: { marginHorizontal: 14, marginTop: -22, borderRadius: 24,
    backgroundColor: CARD, borderWidth: 1, borderColor: "rgba(201,168,76,0.18)",
    padding: 20, elevation: 18,
    shadowColor: "#C9A84C", shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18, shadowRadius: 24 },
  cardGlow: { position: "absolute", top: 0, left: 24, right: 24, height: 1.5,
    backgroundColor: "rgba(201,168,76,0.55)", borderRadius: 999 },
  cardTitle: { color: WHITE, fontSize: 17, fontWeight: "800", marginBottom: 2 },
  cardSub: { color: GRAY, fontSize: 12, marginBottom: 16 },

  tabScroll: { marginBottom: 16 },
  tab: { alignItems: "center", paddingHorizontal: 14, paddingVertical: 9,
    borderRadius: 14, marginRight: 8, backgroundColor: MUTED,
    borderWidth: 1, borderColor: "transparent", minWidth: 68 },
  tabActive: { backgroundColor: "rgba(201,168,76,0.1)", borderColor: "rgba(201,168,76,0.35)" },
  tabIcon: { fontSize: 18, marginBottom: 4, opacity: 0.6 },
  tabLabel: { color: GRAY, fontSize: 10, fontWeight: "700" },
  tabLabelActive: { color: GOLD },

  routeBox: { backgroundColor: MUTED, borderRadius: 16, borderWidth: 1,
    borderColor: BORDER, paddingHorizontal: 14, paddingVertical: 2, marginBottom: 14 },
  inputRow: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  dot2: { width: 10, height: 10, borderRadius: 5, marginRight: 12 },
  routeInput: { flex: 1, color: WHITE, fontSize: 14, fontWeight: "500" },
  divRow: { flexDirection: "row", alignItems: "center", marginVertical: -4, paddingLeft: 4 },
  divLine: { flex: 1, height: 1, borderWidth: 1, borderStyle: "dashed", borderColor: BORDER },
  swapBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: CARD,
    borderWidth: 1, borderColor: "rgba(201,168,76,0.3)", justifyContent: "center",
    alignItems: "center", marginLeft: 10 },

  searchBtn: { backgroundColor: GOLD, borderRadius: 16, flexDirection: "row",
    alignItems: "center", justifyContent: "space-between", paddingVertical: 17,
    paddingHorizontal: 20, marginBottom: 12 },
  searchBtnText: { color: BLACK, fontWeight: "900", fontSize: 14 },
  searchArrow: { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "center", alignItems: "center" },

  guarantee: { color: "#4A4A55", textAlign: "center", fontSize: 11, fontWeight: "600" },

  // ── SECTION ──────────────────────────────────────────────────────
  section: { paddingHorizontal: 16, marginTop: 26 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  sectionTitle: { color: WHITE, fontSize: 18, fontWeight: "900" },
  seeAll: { color: GOLD, fontSize: 12, fontWeight: "700" },

  // ── UPCOMING ─────────────────────────────────────────────────────
  upcomingCard: { backgroundColor: CARD, borderRadius: 20, padding: 18,
    borderWidth: 1, borderColor: "rgba(201,168,76,0.2)" },
  upcomingTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  confirmedBadge: { flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: "rgba(74,222,128,0.08)", borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: "rgba(74,222,128,0.25)" },
  confirmedDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: GREEN },
  confirmedText: { color: GREEN, fontSize: 11, fontWeight: "700" },
  upcomingAmt: { color: GOLD, fontSize: 22, fontWeight: "900" },
  upcomingRoute: { color: WHITE, fontWeight: "800", fontSize: 16, marginBottom: 4 },
  upcomingMeta: { color: GRAY, fontSize: 12, marginBottom: 14 },
  progBar: { height: 3, borderRadius: 2, backgroundColor: BORDER, marginBottom: 12, overflow: "hidden" },
  progFill: { width: "40%", height: "100%", backgroundColor: GOLD, borderRadius: 2 },
  upcomingBottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  upcomingEta: { color: GRAY, fontSize: 12 },
  trackLink: { color: GOLD, fontSize: 13, fontWeight: "700" },

  // ── QUICK GRID ───────────────────────────────────────────────────
  quickGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  quickCard: { backgroundColor: CARD, borderRadius: 18, padding: 16, borderWidth: 1,
    borderColor: BORDER, width: (width - 42) / 2 },
  quickIcon: { fontSize: 26, marginBottom: 10 },
  quickLabel: { color: WHITE, fontWeight: "800", fontSize: 14, marginBottom: 3 },
  quickSub: { color: GRAY, fontSize: 11, marginBottom: 10 },
  quickArrow: { color: GOLD, fontWeight: "800", fontSize: 14 },

  // ── PROMO ────────────────────────────────────────────────────────
  promoBanner: { backgroundColor: GOLD, borderRadius: 22, padding: 22,
    flexDirection: "row", alignItems: "center", overflow: "hidden" },
  promoCircle1: { position: "absolute", right: -25, top: -35, width: 120, height: 120,
    borderRadius: 60, backgroundColor: "rgba(255,255,255,0.1)" },
  promoCircle2: { position: "absolute", right: 45, bottom: -45, width: 90, height: 90,
    borderRadius: 45, backgroundColor: "rgba(255,255,255,0.07)" },
  promoTag: { color: "rgba(0,0,0,0.5)", fontSize: 9, fontWeight: "900", letterSpacing: 1.8, marginBottom: 5 },
  promoTitle: { color: BLACK, fontSize: 21, fontWeight: "900", marginBottom: 3 },
  promoCode: { color: "rgba(0,0,0,0.55)", fontSize: 12 },
  promoBtn: { backgroundColor: BLACK, borderRadius: 14, paddingHorizontal: 18, paddingVertical: 12, flexShrink: 0 },
  promoBtnText: { color: GOLD, fontWeight: "900", fontSize: 13, textAlign: "center" },
});
