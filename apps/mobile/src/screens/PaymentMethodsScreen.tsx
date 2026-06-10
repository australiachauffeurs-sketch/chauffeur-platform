import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, Alert, TextInput,
} from "react-native";
import { COLORS, SHADOWS } from "../lib/theme";

type Card = {
  id: string;
  brand: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
  icon: string;
};

export default function PaymentMethodsScreen({ navigation }: any) {
  const [cards, setCards]     = useState<Card[]>([]);
  const [adding, setAdding]  = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [expiry, setExpiry]   = useState("");
  const [cvc, setCvc]         = useState("");
  const [name, setName]       = useState("");

  const setDefault = (id: string) => {
    setCards(prev => prev.map(c => ({ ...c, isDefault: c.id === id })));
  };

  const removeCard = (id: string) => {
    Alert.alert("Remove Card", "Are you sure you want to remove this card?", [
      { text: "Cancel" },
      { text: "Remove", style: "destructive", onPress: () => setCards(prev => prev.filter(c => c.id !== id)) },
    ]);
  };

  const addCard = () => {
    if (!cardNum || !expiry || !cvc || !name) {
      Alert.alert("Missing Fields", "Please fill in all card details.");
      return;
    }
    const newCard: Card = {
      id: Date.now().toString(),
      brand: cardNum.startsWith("4") ? "Visa" : "Mastercard",
      last4: cardNum.slice(-4),
      expiry,
      isDefault: cards.length === 0,
      icon: "",
    };
    setCards(prev => [...prev, newCard]);
    setAdding(false);
    setCardNum(""); setExpiry(""); setCvc(""); setName("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Payment Methods</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Empty state when no cards saved */}
        {cards.length === 0 && !adding && (
          <View style={styles.emptyCards}>
            <Text style={styles.emptyCardsTitle}>No payment methods yet</Text>
            <Text style={styles.emptyCardsSub}>
              Add a card for faster, contactless checkout on every booking.
            </Text>
          </View>
        )}

        {/* Saved Cards */}
        {cards.map(card => (
          <View key={card.id} style={[styles.cardItem, card.isDefault && styles.cardItemDefault]}>
            <View style={styles.cardIcon}>
              <Text style={{ fontSize: 14, color: COLORS.gold, fontWeight: "700" }}>{card.brand}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.cardRow}>
                <Text style={styles.cardBrand}>{card.brand}</Text>
                {card.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
              </View>
              <Text style={styles.cardNumber}>•••• •••• •••• {card.last4}</Text>
              <Text style={styles.cardExpiry}>Expires {card.expiry}</Text>
            </View>
            <View style={styles.cardActions}>
              {!card.isDefault && (
                <TouchableOpacity style={styles.setDefaultBtn} onPress={() => setDefault(card.id)}>
                  <Text style={styles.setDefaultText}>Set Default</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => removeCard(card.id)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Add Card */}
        {adding ? (
          <View style={styles.addForm}>
            <Text style={styles.formTitle}>Add New Card</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Cardholder Name</Text>
              <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="John Doe" placeholderTextColor={COLORS.gray500} />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Card Number</Text>
              <TextInput style={styles.input} value={cardNum} onChangeText={setCardNum} placeholder="4242 4242 4242 4242" placeholderTextColor={COLORS.gray500} keyboardType="numeric" maxLength={19} />
            </View>
            <View style={styles.row}>
              <View style={[styles.inputBox, { flex: 1 }]}>
                <Text style={styles.inputLabel}>Expiry</Text>
                <TextInput style={styles.input} value={expiry} onChangeText={setExpiry} placeholder="MM/YY" placeholderTextColor={COLORS.gray500} maxLength={5} />
              </View>
              <View style={{ width: 12 }} />
              <View style={[styles.inputBox, { flex: 1 }]}>
                <Text style={styles.inputLabel}>CVC</Text>
                <TextInput style={styles.input} value={cvc} onChangeText={setCvc} placeholder="123" placeholderTextColor={COLORS.gray500} keyboardType="numeric" maxLength={4} secureTextEntry />
              </View>
            </View>
            <View style={styles.formActions}>
              <TouchableOpacity style={styles.cancelFormBtn} onPress={() => setAdding(false)}>
                <Text style={styles.cancelFormText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.saveBtn, SHADOWS.gold]} onPress={addCard}>
                <Text style={styles.saveBtnText}>Add Card</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.addBtn} onPress={() => setAdding(true)}>
            <Text style={styles.addBtnIcon}>+</Text>
            <Text style={styles.addBtnText}>Add New Card</Text>
          </TouchableOpacity>
        )}

        {/* Info */}
        <View style={styles.infoCard}>
          <Text style={[styles.infoIcon, { fontSize: 14, color: COLORS.gold }]}>Secure</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoTitle}>Secure Payments</Text>
            <Text style={styles.infoSub}>Your payment information is encrypted and securely stored via Stripe. We never store your full card number.</Text>
          </View>
        </View>

        {/* Invoice Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Billing</Text>
        </View>
        {[
          { icon: "",  label: "Invoices & Receipts",  sub: "View trip receipts and tax invoices", action: () => navigation.navigate("Bookings") },
          { icon: "",  label: "Corporate Billing",    sub: "Set up cost centres and PO numbers",   action: () => Alert.alert("Corporate Billing", "To set up a corporate account with consolidated invoicing, cost centres and PO numbers, contact our team at corporate@elitechauffeurs.au.") },
        ].map(item => (
          <TouchableOpacity key={item.label} style={styles.menuItem} onPress={item.action}>
            <Text style={styles.menuIcon}>{item.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuSub}>{item.sub}</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1, backgroundColor: COLORS.black },
  header:         { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.darkBorder },
  back:           { color: COLORS.gold, fontSize: 16 },
  title:          { color: COLORS.white, fontWeight: "700", fontSize: 17 },
  cardItem:       { backgroundColor: COLORS.darkSurface, borderRadius: 18, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: COLORS.darkBorder, flexDirection: "row", gap: 14 },
  cardItemDefault:{ borderColor: `${COLORS.gold}40` },
  cardIcon:       { width: 50, height: 50, borderRadius: 14, backgroundColor: `${COLORS.gold}10`, justifyContent: "center", alignItems: "center" },
  cardRow:        { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  cardBrand:      { color: COLORS.white, fontWeight: "700", fontSize: 16 },
  defaultBadge:   { backgroundColor: `${COLORS.gold}20`, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  defaultText:    { color: COLORS.gold, fontSize: 10, fontWeight: "700" },
  cardNumber:     { color: COLORS.gray400, fontSize: 14, fontFamily: "monospace", marginBottom: 2 },
  cardExpiry:     { color: COLORS.gray500, fontSize: 12 },
  cardActions:    { justifyContent: "center", alignItems: "flex-end", gap: 8 },
  setDefaultBtn:  { backgroundColor: `${COLORS.gold}15`, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  setDefaultText: { color: COLORS.gold, fontSize: 11, fontWeight: "600" },
  removeText:     { color: COLORS.red, fontSize: 11, fontWeight: "600" },
  addBtn:         { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: COLORS.darkSurface, borderRadius: 16, padding: 18, marginBottom: 20, borderWidth: 1.5, borderColor: COLORS.darkBorder, borderStyle: "dashed", gap: 10 },
  addBtnIcon:     { color: COLORS.gold, fontSize: 24, fontWeight: "700" },
  addBtnText:     { color: COLORS.gold, fontSize: 15, fontWeight: "600" },
  addForm:        { backgroundColor: COLORS.darkSurface, borderRadius: 18, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: `${COLORS.gold}30` },
  formTitle:      { color: COLORS.white, fontSize: 18, fontWeight: "700", marginBottom: 16 },
  inputBox:       { marginBottom: 14 },
  inputLabel:     { color: COLORS.gray400, fontSize: 12, marginBottom: 6 },
  input:          { backgroundColor: COLORS.darkMuted, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: COLORS.white, fontSize: 15, borderWidth: 1, borderColor: COLORS.darkBorder },
  row:            { flexDirection: "row" },
  formActions:    { flexDirection: "row", gap: 12, marginTop: 4 },
  cancelFormBtn:  { flex: 1, borderRadius: 12, paddingVertical: 14, alignItems: "center", borderWidth: 1, borderColor: COLORS.darkBorder },
  cancelFormText: { color: COLORS.gray400, fontWeight: "600", fontSize: 15 },
  saveBtn:        { flex: 2, backgroundColor: COLORS.gold, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  saveBtnText:    { color: COLORS.black, fontWeight: "700", fontSize: 15 },
  emptyCards:     { alignItems: "center", paddingVertical: 28, paddingHorizontal: 16, marginBottom: 8 },
  emptyCardsTitle:{ color: COLORS.white, fontSize: 17, fontWeight: "800", marginBottom: 6 },
  emptyCardsSub:  { color: COLORS.gray500, fontSize: 13, textAlign: "center", lineHeight: 19 },
  infoCard:       { flexDirection: "row", alignItems: "flex-start", backgroundColor: COLORS.darkMuted, borderRadius: 14, padding: 16, gap: 12, marginBottom: 24 },
  infoIcon:       { fontSize: 22 },
  infoTitle:      { color: COLORS.white, fontWeight: "600", fontSize: 14, marginBottom: 4 },
  infoSub:        { color: COLORS.gray500, fontSize: 12, lineHeight: 18 },
  sectionHeader:  { marginBottom: 12 },
  sectionTitle:   { color: COLORS.gray400, fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase" },
  menuItem:       { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.darkSurface, borderRadius: 14, padding: 16, marginBottom: 8, borderWidth: 1, borderColor: COLORS.darkBorder, gap: 12 },
  menuIcon:       { fontSize: 22 },
  menuLabel:      { color: COLORS.white, fontSize: 15, fontWeight: "500", marginBottom: 2 },
  menuSub:        { color: COLORS.gray500, fontSize: 11 },
  chevron:        { color: COLORS.gray500, fontSize: 22 },
});
