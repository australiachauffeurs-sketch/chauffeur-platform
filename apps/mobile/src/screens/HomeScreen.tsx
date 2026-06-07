import React, { useState, useRef, useEffect } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  StyleSheet, SafeAreaView, StatusBar, Dimensions,
  Image, Animated, Platform, FlatList,
} from "react-native";
import { useTheme } from "../lib/ThemeContext";

const { width, height } = Dimensions.get("window");

// Car images carousel
const CAR_SLIDES = [
  {
    id: "1",
    uri: "https://images.unsplash.com/photo-1617814076668-8dfc6fe159ed?w=800&q=85",
    label: "Executive Sedan",
    model: "Mercedes-Benz E-Class",
    price: "From $65",
  },
  {
    id: "2",
    uri: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=85",
    label: "Luxury Sedan",
    model: "Mercedes-Benz S-Class",
    price: "From $130",
  },
  {
    id: "3",
    uri: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800&q=85",
    label: "Premium SUV",
    model: "Mercedes-Benz GLE",
    price: "From $85",
  },
  {
    id: "4",
    uri: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85",
    label: "Executive Van",
    model: "Mercedes-Benz Viano",
    price: "From $100",
  },
];

const SERVICES = [
  { abbr: "AIR", label: "Airport",   type: "airport_transfer", color: "#1E3A5F" },
  { abbr: "BIZ", label: "Corporate", type: "corporate",        color: "#1A2E1A" },
  { abbr: "WED", label: "Wedding",   type: "wedding",          color: "#3D1A2E" },
  { abbr: "EVT", label: "Events",    type: "special_event",    color: "#2E2A0A" },
  { abbr: "HRS", label: "Hourly",    type: "hourly",           color: "#1A1A3D" },
];

const UPCOMING = {
  route: "Sydney Airport → CBD",
  date: "Today · 06:30 AM",
  driver: "Marcus T.",
  amount: "$142",
};

export default function HomeScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [pickup,      setPickup]     = useState("");
  const [dropoff,     setDropoff]    = useState("");
  const [service,     setService]    = useState("airport_transfer");
  const [activeSlide, setActiveSlide] = useState(0);

  const flatRef    = useRef<FlatList>(null);
  const scrollX    = useRef(new Animated.Value(0)).current;
  const slideTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-scroll carousel
  useEffect(() => {
    slideTimer.current = setInterval(() => {
      setActiveSlide(prev => {
        const next = (prev + 1) % CAR_SLIDES.length;
        flatRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 3500);
    return () => { if (slideTimer.current) clearInterval(slideTimer.current); };
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── HERO WITH CAR CAROUSEL ─────────────────────────── */}
        <View style={styles.hero}>

          {/* Car image carousel */}
          <Animated.FlatList
            ref={flatRef}
            data={CAR_SLIDES}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onMomentumScrollEnd={e => {
              const idx = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveSlide(idx);
              if (slideTimer.current) clearInterval(slideTimer.current);
              slideTimer.current = setInterval(() => {
                setActiveSlide(prev => {
                  const next = (prev + 1) % CAR_SLIDES.length;
                  flatRef.current?.scrollToIndex({ index: next, animated: true });
                  return next;
                });
              }, 3500);
            }}
            renderItem={({ item }) => (
              <View style={styles.slide}>
                <Image
                  source={{ uri: item.uri }}
                  style={styles.carImage}
                  resizeMode="cover"
                />
                {/* Dark gradient overlay */}
                <View style={styles.slideOverlay} />
                {/* Top fade */}
                <View style={styles.slideTopFade} />
                {/* Bottom fade */}
                <View style={styles.slideBottomFade} />
              </View>
            )}
          />

          {/* Gold top border */}
          <View style={styles.goldTopBorder} />

          {/* Navbar overlay */}
          <View style={styles.navOverlay}>
            <View>
              <Text style={styles.greeting}>Good morning</Text>
              <Text style={styles.brandName}>Elite Chauffeurs</Text>
            </View>
            <TouchableOpacity style={styles.avatarBtn} onPress={() => navigation.navigate("Profile")}>
              <Text style={styles.avatarText}>J</Text>
              <View style={[styles.onlineDot, { borderColor: colors.black }]} />
            </TouchableOpacity>
          </View>

          {/* Slide info overlay */}
          <View style={styles.slideInfoOverlay}>
            {/* Badge */}
            <View style={styles.heroBadge}>
              <View style={styles.heroBadgeDot} />
              <Text style={styles.heroBadgeText}>PREMIUM FLEET · AUSTRALIA</Text>
            </View>

            {/* Car info */}
            <Text style={styles.carLabel}>{CAR_SLIDES[activeSlide].label}</Text>
            <Text style={styles.carModel}>{CAR_SLIDES[activeSlide].model}</Text>

            <View style={styles.carPriceRow}>
              <View style={styles.carPriceBadge}>
                <Text style={styles.carPriceText}>{CAR_SLIDES[activeSlide].price}</Text>
              </View>
              <TouchableOpacity
                style={styles.carBookBtn}
                onPress={() => navigation.navigate("Book")}
              >
                <Text style={styles.carBookBtnText}>Book This →</Text>
              </TouchableOpacity>
            </View>

            {/* Dot indicators */}
            <View style={styles.dotsRow}>
              {CAR_SLIDES.map((_, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    setActiveSlide(i);
                    flatRef.current?.scrollToIndex({ index: i, animated: true });
                  }}
                >
                  <View style={[styles.dot, i === activeSlide && styles.dotActive]} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Stats strip */}
          <View style={styles.statsStrip}>
            {[["15K+","Rides"],["4.9★","Rating"],["6","Cities"],["24/7","Support"]].map(([v,l]) => (
              <View key={l} style={styles.statItem}>
                <Text style={styles.statValue}>{v}</Text>
                <Text style={styles.statLabel}>{l}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── BOOKING CARD ───────────────────────────────────── */}
        <View style={[styles.bookingCard, { backgroundColor: colors.darkSurface }]}>
          <View style={styles.cardTopGlow} />

          {/* Service tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
            {SERVICES.map(s => (
              <TouchableOpacity
                key={s.type}
                onPress={() => setService(s.type)}
                style={[
                  styles.serviceTab,
                  { backgroundColor: colors.darkMuted },
                  service === s.type && { backgroundColor: s.color, borderColor: `${colors.gold}50` },
                ]}
              >
                <View style={[styles.serviceIconBox, service === s.type && { borderColor: `${colors.gold}60` }]}>
                  <Text style={[styles.serviceAbbr, { color: colors.gray400 }, service === s.type && { color: colors.gold }]}>{s.abbr}</Text>
                </View>
                <Text style={[styles.serviceLabel, { color: colors.gray500 }, service === s.type && { color: colors.goldLight }]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Route inputs */}
          <View style={[styles.routeBox, { backgroundColor: colors.darkMuted, borderColor: colors.darkBorder }]}>
            <View style={styles.inputRow}>
              <View style={[styles.routeDot, { backgroundColor: colors.green }]} />
              <TextInput
                style={[styles.routeInput, { color: colors.white }]}
                placeholder="Pickup location"
                placeholderTextColor={colors.gray500}
                value={pickup}
                onChangeText={setPickup}
              />
            </View>
            <View style={styles.routeDividerRow}>
              <View style={[styles.routeDividerLine, { borderColor: colors.darkBorder }]} />
              <TouchableOpacity style={[styles.swapBtn, { backgroundColor: colors.darkSurface, borderColor: `${colors.gold}40` }]}>
                <Text style={{ color: colors.gold, fontSize: 16 }}>⇅</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputRow}>
              <View style={[styles.routeDot, { backgroundColor: colors.gold }]} />
              <TextInput
                style={[styles.routeInput, { color: colors.white }]}
                placeholder="Drop-off location"
                placeholderTextColor={colors.gray500}
                value={dropoff}
                onChangeText={setDropoff}
              />
            </View>
          </View>

          {/* Book button */}
          <TouchableOpacity
            style={styles.bookBtn}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Book", { pickup, dropoff, service })}
          >
            <Text style={[styles.bookBtnText, { color: colors.black }]}>Search & Get Instant Quote</Text>
            <View style={styles.bookBtnArrow}>
              <Text style={{ color: colors.black, fontSize: 16, fontWeight: "800" }}>→</Text>
            </View>
          </TouchableOpacity>
          <Text style={[styles.bookNote, { color: colors.gray500 }]}>✓ Fixed price · ✓ No surge · ✓ Free cancellation</Text>
        </View>

        {/* ── UPCOMING RIDE ──────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.white }]}>Upcoming Ride</Text>
          <TouchableOpacity style={[styles.upcomingCard, { backgroundColor: colors.darkSurface, borderColor: `${colors.gold}25` }]} activeOpacity={0.9}>
            <View style={styles.upcomingHeader}>
              <View style={styles.confirmedBadge}>
                <View style={styles.confirmedDot} />
                <Text style={styles.confirmedText}>Confirmed</Text>
              </View>
              <Text style={[styles.upcomingAmount, { color: colors.gold }]}>{UPCOMING.amount}</Text>
            </View>
            <Text style={[styles.upcomingRoute, { color: colors.white }]}>{UPCOMING.route}</Text>
            <Text style={[styles.upcomingMeta, { color: colors.gray500 }]}>{UPCOMING.date} · Driver: {UPCOMING.driver}</Text>
            <View style={[styles.progressBar, { backgroundColor: colors.darkBorder }]}>
              <View style={[styles.progressFill, { backgroundColor: colors.gold }]} />
            </View>
            <View style={styles.upcomingFooter}>
              <Text style={[styles.upcomingFooterSub, { color: colors.gray500 }]}>Driver en route · ~12 min</Text>
              <Text style={[styles.trackBtn, { color: colors.gold }]} onPress={() => navigation.navigate("RideTracking", { booking: UPCOMING })}>Track Live →</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── QUICK BOOK ─────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.white }]}>Quick Book</Text>
          <View style={styles.quickGrid}>
            {[
              { abbr:"AIR", label:"Airport",  sub:"All terminals",       type:"airport_transfer" },
              { abbr:"BIZ", label:"Corporate",sub:"Executive & discreet", type:"corporate"       },
              { abbr:"WED", label:"Wedding",  sub:"Special packages",     type:"wedding"         },
              { abbr:"HRS", label:"Hourly",   sub:"From 3 hours",         type:"hourly"          },
            ].map(s => (
              <TouchableOpacity key={s.label} style={[styles.quickCard, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}
                onPress={() => navigation.navigate("Book", { service: s.type })} activeOpacity={0.85}>
                <View style={styles.quickIconBox}>
                  <Text style={[styles.quickAbbr, { color: colors.gold }]}>{s.abbr}</Text>
                </View>
                <Text style={[styles.quickLabel, { color: colors.white }]}>{s.label}</Text>
                <Text style={[styles.quickSub, { color: colors.gray500 }]}>{s.sub}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── PROMO BANNER ───────────────────────────────────── */}
        <View style={[styles.section, { marginBottom: 32 }]}>
          <View style={[styles.promoBanner, { backgroundColor: colors.gold }]}>
            <View style={styles.promoCircle1} />
            <View style={styles.promoCircle2} />
            <View style={{ flex: 1 }}>
              <Text style={styles.promoTag}>LIMITED OFFER</Text>
              <Text style={[styles.promoTitle, { color: colors.black }]}>First ride 15% off</Text>
              <Text style={styles.promoSub}>Use code ELITE15 at checkout</Text>
            </View>
            <TouchableOpacity style={[styles.promoBtn, { backgroundColor: colors.black }]} onPress={() => navigation.navigate("Book")}>
              <Text style={[styles.promoBtnText, { color: colors.gold }]}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const HERO_H = height * 0.58;

const styles = StyleSheet.create({
  container: { flex: 1 },

  // ── HERO ──────────────────────────────────────────────────────
  hero: { height: HERO_H, position: "relative" },
  slide: { width, height: HERO_H },
  carImage: { width: "100%", height: "100%" },

  slideOverlay: { ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(5,4,2,0.55)" },
  slideTopFade: { position:"absolute", top:0, left:0, right:0, height:120,
    backgroundColor:"rgba(5,4,2,0.6)" },
  slideBottomFade: { position:"absolute", bottom:0, left:0, right:0, height:200,
    backgroundColor:"rgba(5,4,2,0.85)" },

  goldTopBorder: { position:"absolute", top:0, left:0, right:0, height:2,
    backgroundColor:"rgba(201,168,76,0.8)", zIndex:10 },

  navOverlay: { position:"absolute", top: Platform.OS === "android" ? 40 : 16,
    left:20, right:20, flexDirection:"row",
    justifyContent:"space-between", alignItems:"flex-start", zIndex:20 },
  greeting: { color:"rgba(201,168,76,0.8)", fontSize:12, fontWeight:"600", letterSpacing:0.5 },
  brandName: { color:"#FFFFFF", fontSize:22, fontWeight:"800", letterSpacing:0.3 },
  avatarBtn: { width:44, height:44, borderRadius:22,
    backgroundColor:"rgba(201,168,76,0.15)", borderWidth:2,
    borderColor:"#C9A84C", justifyContent:"center", alignItems:"center" },
  avatarText: { color:"#C9A84C", fontWeight:"800", fontSize:17 },
  onlineDot: { position:"absolute", bottom:1, right:1, width:10, height:10,
    borderRadius:5, backgroundColor:"#4ADE80", borderWidth:2 },

  slideInfoOverlay: { position:"absolute", bottom:56, left:20, right:20, zIndex:20 },
  heroBadge: { flexDirection:"row", alignItems:"center", gap:7,
    backgroundColor:"rgba(201,168,76,0.12)", borderWidth:1,
    borderColor:"rgba(201,168,76,0.3)", borderRadius:20,
    paddingHorizontal:12, paddingVertical:5, alignSelf:"flex-start", marginBottom:10 },
  heroBadgeDot: { width:5, height:5, borderRadius:3, backgroundColor:"#C9A84C" },
  heroBadgeText: { color:"#C9A84C", fontSize:9, fontWeight:"800", letterSpacing:1.2 },

  carLabel: { color:"#FFFFFF", fontSize:28, fontWeight:"800", marginBottom:2 },
  carModel: { color:"rgba(201,168,76,0.7)", fontSize:13, fontWeight:"600", marginBottom:14 },
  carPriceRow: { flexDirection:"row", alignItems:"center", gap:10, marginBottom:14 },
  carPriceBadge: { backgroundColor:"rgba(201,168,76,0.15)", borderWidth:1,
    borderColor:"rgba(201,168,76,0.5)", borderRadius:12, paddingHorizontal:12, paddingVertical:6 },
  carPriceText: { color:"#C9A84C", fontWeight:"800", fontSize:16 },
  carBookBtn: { backgroundColor:"#C9A84C", borderRadius:12, paddingHorizontal:16, paddingVertical:8 },
  carBookBtnText: { color:"#0A0A0A", fontWeight:"800", fontSize:13 },

  dotsRow: { flexDirection:"row", gap:6 },
  dot: { width:6, height:6, borderRadius:3, backgroundColor:"rgba(255,255,255,0.3)" },
  dotActive: { width:22, backgroundColor:"#C9A84C" },

  statsStrip: { position:"absolute", bottom:0, left:0, right:0,
    flexDirection:"row", backgroundColor:"rgba(10,10,10,0.85)",
    borderTopWidth:1, borderTopColor:"rgba(201,168,76,0.15)",
    paddingVertical:10, zIndex:20 },
  statItem: { flex:1, alignItems:"center" },
  statValue: { color:"#C9A84C", fontSize:15, fontWeight:"800" },
  statLabel: { color:"#6B7280", fontSize:9, marginTop:1 },

  // ── BOOKING CARD ──────────────────────────────────────────────
  bookingCard: { marginHorizontal:16,
    borderRadius:24, marginTop:-20, padding:18,
    borderWidth:1, borderColor:"rgba(201,168,76,0.2)",
    shadowColor:"#C9A84C", shadowOffset:{width:0,height:8},
    shadowOpacity:0.2, shadowRadius:20, elevation:14 },
  cardTopGlow: { position:"absolute", top:0, left:0, right:0, height:1.5,
    backgroundColor:"rgba(201,168,76,0.5)", borderRadius:24 },

  serviceTab: { alignItems:"center", paddingHorizontal:14, paddingVertical:8,
    borderRadius:14, marginRight:8,
    borderWidth:1, borderColor:"transparent", minWidth:68 },
  serviceIconBox: { width:32, height:22, borderRadius:6, backgroundColor:"rgba(201,168,76,0.1)",
    borderWidth:1, borderColor:"rgba(201,168,76,0.2)", justifyContent:"center",
    alignItems:"center", marginBottom:4 },
  serviceAbbr: { fontSize:8, fontWeight:"800", letterSpacing:0.5 },
  serviceLabel: { fontSize:10, fontWeight:"600" },

  routeBox: { borderRadius:16,
    paddingHorizontal:14, paddingVertical:4,
    marginBottom:14, borderWidth:1 },
  inputRow: { flexDirection:"row", alignItems:"center", paddingVertical:13 },
  routeDot: { width:10, height:10, borderRadius:5, marginRight:12 },
  routeInput: { flex:1, fontSize:14 },
  routeDividerRow: { flexDirection:"row", alignItems:"center", marginVertical:-4, paddingLeft:5 },
  routeDividerLine: { flex:1, height:1, borderWidth:1, borderStyle:"dashed" },
  swapBtn: { width:32, height:32, borderRadius:16,
    borderWidth:1, justifyContent:"center",
    alignItems:"center", marginLeft:10 },

  bookBtn: { backgroundColor:"#C9A84C", borderRadius:16,
    flexDirection:"row", alignItems:"center",
    justifyContent:"space-between", paddingVertical:16,
    paddingHorizontal:20, marginBottom:10 },
  bookBtnText: { fontWeight:"800", fontSize:15 },
  bookBtnArrow: { width:30, height:30, borderRadius:15,
    backgroundColor:"rgba(0,0,0,0.15)", justifyContent:"center", alignItems:"center" },
  bookNote: { textAlign:"center", fontSize:11 },

  // ── SECTION ───────────────────────────────────────────────────
  section: { paddingHorizontal:20, marginTop:24 },
  sectionTitle: { fontSize:18, fontWeight:"800", marginBottom:14 },

  // ── UPCOMING ──────────────────────────────────────────────────
  upcomingCard: { borderRadius:20, padding:18, borderWidth:1 },
  upcomingHeader: { flexDirection:"row", justifyContent:"space-between",
    alignItems:"center", marginBottom:10 },
  confirmedBadge: { flexDirection:"row", alignItems:"center", gap:6,
    backgroundColor:"rgba(74,222,128,0.1)", borderRadius:20,
    paddingHorizontal:10, paddingVertical:4,
    borderWidth:1, borderColor:"rgba(74,222,128,0.3)" },
  confirmedDot: { width:6, height:6, borderRadius:3, backgroundColor:"#4ADE80" },
  confirmedText: { color:"#4ADE80", fontSize:11, fontWeight:"700" },
  upcomingAmount: { fontSize:22, fontWeight:"800" },
  upcomingRoute: { fontWeight:"700", fontSize:16, marginBottom:4 },
  upcomingMeta: { fontSize:12, marginBottom:14 },
  progressBar: { height:4, borderRadius:2, marginBottom:10, overflow:"hidden" },
  progressFill: { width:"40%", height:"100%", borderRadius:2 },
  upcomingFooter: { flexDirection:"row", justifyContent:"space-between" },
  upcomingFooterSub: { fontSize:12 },
  trackBtn: { fontSize:13, fontWeight:"700" },

  // ── QUICK GRID ────────────────────────────────────────────────
  quickGrid: { flexDirection:"row", flexWrap:"wrap", gap:10 },
  quickCard: { borderRadius:18, padding:16,
    width:(width - 50) / 2, borderWidth:1 },
  quickIconBox: { width:44, height:30, borderRadius:8, backgroundColor:"rgba(201,168,76,0.1)",
    borderWidth:1, borderColor:"rgba(201,168,76,0.25)", justifyContent:"center",
    alignItems:"center", marginBottom:10 },
  quickAbbr: { fontSize:9, fontWeight:"800", letterSpacing:0.8 },
  quickLabel: { fontWeight:"700", fontSize:13, marginBottom:3 },
  quickSub: { fontSize:11 },

  // ── PROMO ─────────────────────────────────────────────────────
  promoBanner: { borderRadius:22, padding:20,
    flexDirection:"row", alignItems:"center", overflow:"hidden" },
  promoCircle1: { position:"absolute", right:-20, top:-30, width:110, height:110,
    borderRadius:55, backgroundColor:"rgba(255,255,255,0.12)" },
  promoCircle2: { position:"absolute", right:40, bottom:-40, width:80, height:80,
    borderRadius:40, backgroundColor:"rgba(255,255,255,0.08)" },
  promoTag: { color:"rgba(0,0,0,0.55)", fontSize:9, fontWeight:"800",
    letterSpacing:1.5, marginBottom:4 },
  promoTitle: { fontSize:20, fontWeight:"800", marginBottom:2 },
  promoSub: { color:"rgba(0,0,0,0.6)", fontSize:11 },
  promoBtn: { borderRadius:14,
    paddingHorizontal:16, paddingVertical:10, flexShrink:0 },
  promoBtnText: { fontWeight:"800", fontSize:13 },
});
