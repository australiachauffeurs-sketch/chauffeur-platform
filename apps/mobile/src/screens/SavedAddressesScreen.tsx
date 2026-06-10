import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, TextInput, Alert,
} from "react-native";
import { COLORS, SHADOWS } from "../lib/theme";

type Address = {
  id: string;
  label: string;
  icon: string;
  address: string;
  isDefault: boolean;
};

const ICON_OPTIONS = ["Home", "Work", "Airport", "Hotel", "Hospital", "School", "Gym", "Food"];

export default function SavedAddressesScreen({ navigation }: any) {
  const [addresses, setAddresses]   = useState<Address[]>([]);
  const [adding, setAdding]         = useState(false);
  const [editId, setEditId]         = useState<string | null>(null);
  const [newLabel, setNewLabel]     = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newIcon, setNewIcon]       = useState("Home");

  const saveAddress = () => {
    if (!newLabel.trim() || !newAddress.trim()) {
      Alert.alert("Missing Fields", "Please enter a label and address.");
      return;
    }
    if (editId) {
      setAddresses(prev => prev.map(a => a.id === editId ? { ...a, label: newLabel, address: newAddress, icon: newIcon } : a));
      setEditId(null);
    } else {
      setAddresses(prev => [...prev, { id: Date.now().toString(), label: newLabel, icon: newIcon, address: newAddress, isDefault: false }]);
    }
    setAdding(false);
    setNewLabel(""); setNewAddress(""); setNewIcon("Home");
  };

  const deleteAddress = (id: string) => {
    Alert.alert("Delete Address", "Remove this saved address?", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: () => setAddresses(prev => prev.filter(a => a.id !== id)) },
    ]);
  };

  const startEdit = (a: Address) => {
    setEditId(a.id);
    setNewLabel(a.label);
    setNewAddress(a.address);
    setNewIcon(a.icon);
    setAdding(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Saved Addresses</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Info */}
        <View style={styles.infoCard}>
          <Text style={[styles.infoIcon, { color: COLORS.gold }]}>Tip</Text>
          <Text style={styles.infoText}>Save your frequent addresses for faster booking. Tap any address to use it as pickup or drop-off.</Text>
        </View>

        {/* Addresses */}
        {addresses.map(a => (
          <View key={a.id} style={styles.addressCard}>
            <View style={styles.addressIcon}>
              <Text style={{ fontSize: 12, color: COLORS.gold, fontWeight: "700" }}>{a.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.addressRow}>
                <Text style={styles.addressLabel}>{a.label}</Text>
                {a.isDefault && (
                  <View style={styles.defaultBadge}>
                    <Text style={styles.defaultText}>Default</Text>
                  </View>
                )}
              </View>
              <Text style={styles.addressText} numberOfLines={2}>{a.address}</Text>
            </View>
            <View style={styles.addressActions}>
              <TouchableOpacity onPress={() => startEdit(a)}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteAddress(a.id)}>
                <Text style={styles.deleteText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Add / Edit Form */}
        {adding ? (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>{editId ? "Edit Address" : "Add New Address"}</Text>

            <Text style={styles.inputLabel}>Icon</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }}>
              {ICON_OPTIONS.map(ic => (
                <TouchableOpacity
                  key={ic}
                  style={[styles.iconChip, newIcon === ic && styles.iconChipActive]}
                  onPress={() => setNewIcon(ic)}
                >
                  <Text style={{ fontSize: 10, color: COLORS.gold, fontWeight: "600" }}>{ic}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Label</Text>
              <TextInput style={styles.input} value={newLabel} onChangeText={setNewLabel} placeholder="e.g. Home, Work, Gym" placeholderTextColor={COLORS.gray500} />
            </View>

            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={[styles.input, { minHeight: 60 }]}
                value={newAddress}
                onChangeText={setNewAddress}
                placeholder="Full street address"
                placeholderTextColor={COLORS.gray500}
                multiline
              />
            </View>

            <View style={styles.formActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => { setAdding(false); setEditId(null); setNewLabel(""); setNewAddress(""); setNewIcon("Home"); }}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.saveBtn, SHADOWS.gold]} onPress={saveAddress}>
                <Text style={styles.saveBtnText}>{editId ? "Update" : "Save Address"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.addBtn} onPress={() => setAdding(true)}>
            <Text style={styles.addBtnIcon}>+</Text>
            <Text style={styles.addBtnText}>Add New Address</Text>
          </TouchableOpacity>
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
  infoCard:        { flexDirection: "row", alignItems: "flex-start", backgroundColor: `${COLORS.gold}08`, borderRadius: 14, padding: 14, marginBottom: 20, gap: 10, borderWidth: 1, borderColor: `${COLORS.gold}20` },
  infoIcon:        { fontSize: 20 },
  infoText:        { color: COLORS.gray400, fontSize: 13, lineHeight: 19, flex: 1 },
  addressCard:     { flexDirection: "row", alignItems: "center", backgroundColor: COLORS.darkSurface, borderRadius: 16, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: COLORS.darkBorder, gap: 14 },
  addressIcon:     { width: 48, height: 48, borderRadius: 14, backgroundColor: `${COLORS.gold}10`, justifyContent: "center", alignItems: "center" },
  addressRow:      { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
  addressLabel:    { color: COLORS.white, fontWeight: "700", fontSize: 15 },
  defaultBadge:    { backgroundColor: `${COLORS.gold}20`, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2 },
  defaultText:     { color: COLORS.gold, fontSize: 10, fontWeight: "700" },
  addressText:     { color: COLORS.gray400, fontSize: 13, lineHeight: 18 },
  addressActions:  { alignItems: "center", gap: 12 },
  editText:        { color: COLORS.gold, fontSize: 12, fontWeight: "600" },
  deleteText:      { color: COLORS.red, fontSize: 16, fontWeight: "700" },
  formCard:        { backgroundColor: COLORS.darkSurface, borderRadius: 18, padding: 20, borderWidth: 1, borderColor: `${COLORS.gold}30`, marginBottom: 16 },
  formTitle:       { color: COLORS.white, fontSize: 18, fontWeight: "700", marginBottom: 16 },
  inputLabel:      { color: COLORS.gray400, fontSize: 12, fontWeight: "600", marginBottom: 8 },
  iconChip:        { width: 44, height: 44, borderRadius: 12, backgroundColor: COLORS.darkMuted, justifyContent: "center", alignItems: "center", marginRight: 8, borderWidth: 1, borderColor: "transparent" },
  iconChipActive:  { borderColor: COLORS.gold, backgroundColor: `${COLORS.gold}15` },
  inputBox:        { marginBottom: 14 },
  input:           { backgroundColor: COLORS.darkMuted, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, color: COLORS.white, fontSize: 15, borderWidth: 1, borderColor: COLORS.darkBorder },
  formActions:     { flexDirection: "row", gap: 12, marginTop: 4 },
  cancelBtn:       { flex: 1, borderRadius: 12, paddingVertical: 14, alignItems: "center", borderWidth: 1, borderColor: COLORS.darkBorder },
  cancelText:      { color: COLORS.gray400, fontWeight: "600", fontSize: 15 },
  saveBtn:         { flex: 2, backgroundColor: COLORS.gold, borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  saveBtnText:     { color: COLORS.black, fontWeight: "700", fontSize: 15 },
  addBtn:          { flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: COLORS.darkSurface, borderRadius: 16, padding: 18, borderWidth: 1.5, borderColor: COLORS.darkBorder, borderStyle: "dashed", gap: 10, marginTop: 8 },
  addBtnIcon:      { color: COLORS.gold, fontSize: 24, fontWeight: "700" },
  addBtnText:      { color: COLORS.gold, fontSize: 15, fontWeight: "600" },
});
