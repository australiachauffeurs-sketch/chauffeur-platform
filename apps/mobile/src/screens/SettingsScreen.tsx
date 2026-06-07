import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
  SafeAreaView, Switch, Alert, Linking,
} from "react-native";
import { COLORS } from "../lib/theme";

export default function SettingsScreen({ navigation }: any) {
  const [biometric, setBiometric]       = useState(false);
  const [locationAlways, setLocationAlways] = useState(false);
  const [analytics, setAnalytics]       = useState(true);
  const [marketing, setMarketing]       = useState(false);
  const [darkMode, setDarkMode]         = useState(true);
  const [pushEnabled, setPushEnabled]   = useState(true);
  const [emailNotif, setEmailNotif]     = useState(true);
  const [smsNotif, setSmsNotif]         = useState(false);

  const SettingToggle = ({ label, sub, value, onToggle }: { label: string; sub: string; value: boolean; onToggle: (v: boolean) => void }) => (
    <View style={styles.settingRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.settingLabel}>{label}</Text>
        <Text style={styles.settingSub}>{sub}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: COLORS.darkBorder, true: `${COLORS.gold}60` }}
        thumbColor={value ? COLORS.gold : COLORS.gray500}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Privacy & Security</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>

        {/* Security */}
        <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.card}>
          <SettingToggle
            label="Biometric Login"
            sub="Use Face ID or fingerprint to sign in"
            value={biometric}
            onToggle={setBiometric}
          />
          <View style={styles.divider} />
          <TouchableOpacity style={styles.settingRow} onPress={() => Alert.alert("Change Password", "A reset email will be sent to your registered address.", [{ text: "Cancel" }, { text: "Send Email" }])}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Change Password</Text>
              <Text style={styles.settingSub}>Update your account password</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.settingRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Two-Factor Authentication</Text>
              <Text style={styles.settingSub}>Add extra security to your account</Text>
            </View>
            <View style={styles.comingSoon}><Text style={styles.comingSoonText}>Soon</Text></View>
          </TouchableOpacity>
        </View>

        {/* Notifications */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.card}>
          <SettingToggle label="Push Notifications" sub="Booking updates and driver alerts" value={pushEnabled} onToggle={setPushEnabled} />
          <View style={styles.divider} />
          <SettingToggle label="Email Notifications" sub="Receipts and trip summaries" value={emailNotif} onToggle={setEmailNotif} />
          <View style={styles.divider} />
          <SettingToggle label="SMS Alerts" sub="Text messages for ride updates" value={smsNotif} onToggle={setSmsNotif} />
        </View>

        {/* Privacy */}
        <Text style={styles.sectionTitle}>Privacy</Text>
        <View style={styles.card}>
          <SettingToggle label="Location (Always)" sub="Share location even when app is closed" value={locationAlways} onToggle={setLocationAlways} />
          <View style={styles.divider} />
          <SettingToggle label="Analytics" sub="Help us improve with usage data" value={analytics} onToggle={setAnalytics} />
          <View style={styles.divider} />
          <SettingToggle label="Marketing Emails" sub="Promotions and special offers" value={marketing} onToggle={setMarketing} />
        </View>

        {/* Appearance */}
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.card}>
          <SettingToggle label="Dark Mode" sub="Use dark theme throughout the app" value={darkMode} onToggle={setDarkMode} />
        </View>

        {/* Legal */}
        <Text style={styles.sectionTitle}>Legal</Text>
        <View style={styles.card}>
          {[
            { label: "Terms of Service",  sub: "Read our terms",    url: "https://elitechauffeurs.au/terms" },
            { label: "Privacy Policy",    sub: "How we handle data", url: "https://elitechauffeurs.au/privacy" },
            { label: "Cookie Policy",     sub: "Cookie usage info",  url: "https://elitechauffeurs.au/cookies" },
          ].map((item, i) => (
            <React.Fragment key={item.label}>
              {i > 0 && <View style={styles.divider} />}
              <TouchableOpacity style={styles.settingRow} onPress={() => Linking.openURL(item.url)}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  <Text style={styles.settingSub}>{item.sub}</Text>
                </View>
                <Text style={styles.chevron}>›</Text>
              </TouchableOpacity>
            </React.Fragment>
          ))}
        </View>

        {/* Data */}
        <Text style={styles.sectionTitle}>Your Data</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.settingRow} onPress={() => Alert.alert("Export Data", "We'll email you a copy of all your data within 48 hours.", [{ text: "Cancel" }, { text: "Request Export" }])}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Export My Data</Text>
              <Text style={styles.settingSub}>Download a copy of your account data</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.settingRow} onPress={() => Alert.alert("Clear Cache", "This will clear locally cached data. You may need to reload some screens.", [{ text: "Cancel" }, { text: "Clear", style: "destructive" }])}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingLabel}>Clear Cache</Text>
              <Text style={styles.settingSub}>Free up storage space</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>Elite Chauffeurs v1.0.0 · Build 2026.06.07</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, backgroundColor: COLORS.black },
  header:          { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: COLORS.darkBorder },
  back:            { color: COLORS.gold, fontSize: 16 },
  title:           { color: COLORS.white, fontWeight: "700", fontSize: 17 },
  sectionTitle:    { color: COLORS.white, fontSize: 15, fontWeight: "700", marginBottom: 10, marginTop: 20 },
  card:            { backgroundColor: COLORS.darkSurface, borderRadius: 16, overflow: "hidden", borderWidth: 1, borderColor: COLORS.darkBorder },
  settingRow:      { flexDirection: "row", alignItems: "center", paddingVertical: 14, paddingHorizontal: 16 },
  settingLabel:    { color: COLORS.white, fontSize: 15, fontWeight: "500", marginBottom: 2 },
  settingSub:      { color: COLORS.gray500, fontSize: 11 },
  divider:         { height: 1, backgroundColor: COLORS.darkBorder },
  chevron:         { color: COLORS.gray500, fontSize: 22 },
  comingSoon:      { backgroundColor: `${COLORS.gold}15`, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  comingSoonText:  { color: COLORS.gold, fontSize: 10, fontWeight: "700" },
  versionText:     { color: COLORS.gray500, fontSize: 11, textAlign: "center", marginTop: 24 },
});
