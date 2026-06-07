import React, { useState, useEffect } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, TextInput, Alert, ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS, SHADOWS } from "../lib/theme";
import { API_BASE } from "../lib/config";

export default function EditProfileScreen({ navigation }: any) {
  const [loading, setLoading]       = useState(false);
  const [firstName, setFirstName]   = useState("");
  const [lastName, setLastName]     = useState("");
  const [email, setEmail]           = useState("");
  const [phone, setPhone]           = useState("");
  const [city, setCity]             = useState("");
  const [company, setCompany]       = useState("");

  useEffect(() => {
    (async () => {
      const raw = await AsyncStorage.getItem("ec_user");
      if (raw) {
        try {
          const u = JSON.parse(raw);
          setFirstName(u.firstName || u.name?.split(" ")[0] || "");
          setLastName(u.lastName || u.name?.split(" ").slice(1).join(" ") || "");
          setEmail(u.email || "");
          setPhone(u.phone || "");
          setCity(u.city || "");
          setCompany(u.company || "");
        } catch {}
      }
    })();
  }, []);

  const handleSave = async () => {
    if (!firstName.trim()) {
      Alert.alert("Required", "First name is required.");
      return;
    }
    setLoading(true);
    try {
      // Update locally
      const raw = await AsyncStorage.getItem("ec_user");
      const user = raw ? JSON.parse(raw) : {};
      const updated = {
        ...user,
        firstName, lastName,
        name: `${firstName} ${lastName}`.trim(),
        phone, city, company,
      };
      await AsyncStorage.setItem("ec_user", JSON.stringify(updated));
      Alert.alert("Profile Updated", "Your changes have been saved.", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch {
      Alert.alert("Error", "Could not save your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave} disabled={loading}>
          <Text style={styles.saveLink}>{loading ? "..." : "Save"}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{(firstName || "U").charAt(0).toUpperCase()}</Text>
          </View>
          <TouchableOpacity style={styles.changePhotoBtn}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.row}>
            <View style={[styles.inputBox, { flex: 1 }]}>
              <Text style={styles.label}>First Name *</Text>
              <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="John" placeholderTextColor={COLORS.gray500} />
            </View>
            <View style={{ width: 12 }} />
            <View style={[styles.inputBox, { flex: 1 }]}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Doe" placeholderTextColor={COLORS.gray500} />
            </View>
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Email</Text>
            <View style={[styles.input, styles.inputDisabled]}>
              <Text style={styles.disabledText}>{email || "Not set"}</Text>
            </View>
            <Text style={styles.helper}>Email cannot be changed. Contact support for help.</Text>
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="+61 400 000 000" placeholderTextColor={COLORS.gray500} keyboardType="phone-pad" />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>City</Text>
            <TextInput style={styles.input} value={city} onChangeText={setCity} placeholder="Sydney" placeholderTextColor={COLORS.gray500} />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>Company (Optional)</Text>
            <TextInput style={styles.input} value={company} onChangeText={setCompany} placeholder="Company name" placeholderTextColor={COLORS.gray500} />
          </View>
        </View>

        {/* Save */}
        <TouchableOpacity style={[styles.saveBtn, SHADOWS.gold]} onPress={handleSave} disabled={loading}>
          {loading ? <ActivityIndicator color={COLORS.black} /> : <Text style={styles.saveBtnText}>Save Changes</Text>}
        </TouchableOpacity>

        {/* Danger Zone */}
        <View style={styles.dangerSection}>
          <Text style={styles.dangerTitle}>Account Actions</Text>
          <TouchableOpacity style={styles.dangerBtn} onPress={() => Alert.alert("Change Password", "A password reset email will be sent to your registered email.", [{ text: "Cancel" }, { text: "Send Email", onPress: () => {} }])}>
            <Text style={styles.dangerBtnText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.dangerBtn, styles.deleteBtn]} onPress={() => Alert.alert("Delete Account", "This action is permanent and cannot be undone. All your data will be removed.", [{ text: "Cancel" }, { text: "Delete", style: "destructive" }])}>
            <Text style={[styles.dangerBtnText, { color: COLORS.red }]}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: COLORS.black },
  header:          { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.darkBorder },
  back:            { color: COLORS.gold, fontSize: 16 },
  title:           { color: COLORS.white, fontWeight: "700", fontSize: 17 },
  saveLink:        { color: COLORS.gold, fontSize: 15, fontWeight: "700" },
  avatarSection:   { alignItems: "center", paddingVertical: 24, marginBottom: 8 },
  avatar:          { width: 90, height: 90, borderRadius: 45, backgroundColor: COLORS.darkMuted, borderWidth: 3, borderColor: COLORS.gold, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  avatarText:      { color: COLORS.gold, fontSize: 36, fontWeight: "700" },
  changePhotoBtn:  { backgroundColor: `${COLORS.gold}15`, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, borderWidth: 1, borderColor: `${COLORS.gold}30` },
  changePhotoText: { color: COLORS.gold, fontSize: 13, fontWeight: "600" },
  form:            { marginBottom: 20 },
  row:             { flexDirection: "row" },
  inputBox:        { marginBottom: 16 },
  label:           { color: COLORS.gray400, fontSize: 12, fontWeight: "600", marginBottom: 6 },
  input:           { backgroundColor: COLORS.darkSurface, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 13, color: COLORS.white, fontSize: 15, borderWidth: 1, borderColor: COLORS.darkBorder },
  inputDisabled:   { backgroundColor: COLORS.darkMuted, opacity: 0.7 },
  disabledText:    { color: COLORS.gray500, fontSize: 15 },
  helper:          { color: COLORS.gray500, fontSize: 11, marginTop: 4 },
  saveBtn:         { backgroundColor: COLORS.gold, borderRadius: 14, paddingVertical: 16, alignItems: "center", marginBottom: 24 },
  saveBtnText:     { color: COLORS.black, fontWeight: "700", fontSize: 16 },
  dangerSection:   { marginTop: 8 },
  dangerTitle:     { color: COLORS.gray400, fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 },
  dangerBtn:       { backgroundColor: COLORS.darkSurface, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 16, marginBottom: 8, borderWidth: 1, borderColor: COLORS.darkBorder },
  deleteBtn:       { borderColor: "#F8717130" },
  dangerBtnText:   { color: COLORS.white, fontWeight: "500", fontSize: 15 },
});
