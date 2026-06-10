import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, TextInput, Linking, Alert,
} from "react-native";
import { SHADOWS } from "../lib/theme";
import { useTheme } from "../lib/ThemeContext";

const FAQ = [
  { q: "How do I cancel a booking?",            a: "Go to My Bookings → select the booking → tap 'Cancel Booking'. Free cancellation up to 2 hours before pickup." },
  { q: "What payment methods do you accept?",   a: "We accept Visa, Mastercard, American Express, and corporate invoicing. You can manage your cards in Payment Methods." },
  { q: "Is there a minimum booking time?",       a: "For hourly bookings, the minimum is 3 hours. Point-to-point transfers have no minimum time requirement." },
  { q: "Can I change my pickup time?",           a: "Yes, you can modify your booking up to 1 hour before scheduled pickup. Go to Booking Details and tap 'Edit'." },
  { q: "How do I add a child seat?",             a: "Add child seat requirements in the special instructions when booking. Child seats are available at no extra charge for sedan and SUV categories." },
  { q: "Do you offer airport meet & greet?",     a: "Yes! For airport pickups, your chauffeur will wait at the arrivals hall with a name sign. Flight tracking is included." },
];

const CONTACT_OPTIONS = [
  { icon: "",  label: "Call Us",     sub: "Speak to our team 24/7",     action: "tel:+611300123456" },
  { icon: "",  label: "Live Chat",   sub: "Average response: < 2 min",  action: "chat" },
  { icon: "",  label: "Email Us",    sub: "support@elitechauffeurs.au", action: "mailto:support@elitechauffeurs.au" },
  { icon: "",  label: "WhatsApp",    sub: "Message us anytime",         action: "https://wa.me/611300123456" },
];

export default function SupportScreen({ navigation }: any) {
  const { colors } = useTheme();
  const COLORS = colors;
  const styles = makeStyles(colors);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [message, setMessage]         = useState("");
  const [category, setCategory]       = useState("general");

  const CATEGORIES = ["general", "booking", "payment", "driver", "complaint"];

  const handleContact = (action: string) => {
    if (action === "chat") {
      Alert.alert("Live Chat", "Live chat feature coming soon! Please use phone or email in the meantime.");
    } else {
      Linking.openURL(action);
    }
  };

  const submitTicket = () => {
    if (!message.trim()) {
      Alert.alert("Empty Message", "Please describe your issue.");
      return;
    }
    Alert.alert("Ticket Submitted", "We'll get back to you within 2 hours. Check your email for updates.", [
      { text: "OK", onPress: () => { setMessage(""); } },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Support</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={[styles.heroEmoji, { color: COLORS.gold }]}>Support</Text>
          <Text style={styles.heroTitle}>How can we help?</Text>
          <Text style={styles.heroSub}>24/7 premium support for all our customers</Text>
        </View>

        {/* Contact Options */}
        <View style={styles.contactGrid}>
          {CONTACT_OPTIONS.map(opt => (
            <TouchableOpacity
              key={opt.label}
              style={styles.contactCard}
              onPress={() => handleContact(opt.action)}
              activeOpacity={0.85}
            >
              <Text style={styles.contactIcon}>{opt.icon}</Text>
              <Text style={styles.contactLabel}>{opt.label}</Text>
              <Text style={styles.contactSub}>{opt.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Emergency */}
        <TouchableOpacity style={styles.emergencyCard} onPress={() => Linking.openURL("tel:+611300123456")}>
          <Text style={[styles.emergencyIcon, { color: "#F87171" }]}>SOS</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.emergencyTitle}>Emergency Assistance</Text>
            <Text style={styles.emergencySub}>If you're in an active ride and need urgent help, tap here to call immediately.</Text>
          </View>
          <Text style={styles.emergencyArrow}>→</Text>
        </TouchableOpacity>

        {/* FAQ */}
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
        {FAQ.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.faqItem}
            onPress={() => setExpandedFaq(expandedFaq === i ? null : i)}
            activeOpacity={0.85}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{item.q}</Text>
              <Text style={styles.faqToggle}>{expandedFaq === i ? "−" : "+"}</Text>
            </View>
            {expandedFaq === i && (
              <Text style={styles.faqAnswer}>{item.a}</Text>
            )}
          </TouchableOpacity>
        ))}

        {/* Submit Ticket */}
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Submit a Request</Text>
        <View style={styles.ticketForm}>
          <Text style={styles.inputLabel}>Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }}>
            {CATEGORIES.map(c => (
              <TouchableOpacity
                key={c}
                style={[styles.catChip, category === c && styles.catChipActive]}
                onPress={() => setCategory(c)}
              >
                <Text style={[styles.catText, category === c && styles.catTextActive]}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.inputLabel}>Describe your issue</Text>
          <TextInput
            style={styles.textArea}
            value={message}
            onChangeText={setMessage}
            placeholder="Tell us what happened..."
            placeholderTextColor={COLORS.gray500}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
          <TouchableOpacity style={[styles.submitBtn, SHADOWS.gold]} onPress={submitTicket}>
            <Text style={styles.submitText}>Submit Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const makeStyles = (COLORS: any) => StyleSheet.create({
  container:       { flex: 1, backgroundColor: COLORS.black },
  header:          { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.darkBorder },
  back:            { color: COLORS.gold, fontSize: 16 },
  title:           { color: COLORS.white, fontWeight: "700", fontSize: 17 },
  hero:            { alignItems: "center", paddingVertical: 24, marginBottom: 8 },
  heroEmoji:       { fontSize: 48, marginBottom: 12 },
  heroTitle:       { color: COLORS.white, fontSize: 24, fontWeight: "800", marginBottom: 6 },
  heroSub:         { color: COLORS.gray500, fontSize: 14 },
  contactGrid:     { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16 },
  contactCard:     { width: "48%", backgroundColor: COLORS.darkSurface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: COLORS.darkBorder },
  contactIcon:     { fontSize: 26, marginBottom: 8 },
  contactLabel:    { color: COLORS.white, fontWeight: "700", fontSize: 14, marginBottom: 4 },
  contactSub:      { color: COLORS.gray500, fontSize: 11 },
  emergencyCard:   { flexDirection: "row", alignItems: "center", backgroundColor: "#F8717115", borderRadius: 16, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: "#F8717140", gap: 12 },
  emergencyIcon:   { fontSize: 28 },
  emergencyTitle:  { color: "#F87171", fontWeight: "700", fontSize: 15, marginBottom: 4 },
  emergencySub:    { color: COLORS.gray400, fontSize: 12, lineHeight: 18 },
  emergencyArrow:  { color: "#F87171", fontSize: 20, fontWeight: "700" },
  sectionTitle:    { color: COLORS.gray400, fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 },
  faqItem:         { backgroundColor: COLORS.darkSurface, borderRadius: 14, padding: 16, marginBottom: 8, borderWidth: 1, borderColor: COLORS.darkBorder },
  faqHeader:       { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  faqQuestion:     { color: COLORS.white, fontWeight: "600", fontSize: 14, flex: 1, marginRight: 12 },
  faqToggle:       { color: COLORS.gold, fontSize: 20, fontWeight: "700" },
  faqAnswer:       { color: COLORS.gray400, fontSize: 13, lineHeight: 20, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.darkBorder },
  ticketForm:      { backgroundColor: COLORS.darkSurface, borderRadius: 18, padding: 18, borderWidth: 1, borderColor: COLORS.darkBorder },
  inputLabel:      { color: COLORS.gray400, fontSize: 12, marginBottom: 8 },
  catChip:         { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: COLORS.darkMuted, marginRight: 8 },
  catChipActive:   { backgroundColor: `${COLORS.gold}20`, borderWidth: 1, borderColor: `${COLORS.gold}40` },
  catText:         { color: COLORS.gray500, fontSize: 13, fontWeight: "500" },
  catTextActive:   { color: COLORS.gold, fontWeight: "600" },
  textArea:        { backgroundColor: COLORS.darkMuted, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: COLORS.white, fontSize: 14, borderWidth: 1, borderColor: COLORS.darkBorder, minHeight: 120, marginBottom: 14 },
  submitBtn:       { backgroundColor: COLORS.gold, borderRadius: 14, paddingVertical: 16, alignItems: "center" },
  submitText:      { color: COLORS.black, fontWeight: "700", fontSize: 16 },
});
