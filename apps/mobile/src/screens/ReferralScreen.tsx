import React, { useState, useEffect } from "react";
import {
  View, Text, TouchableOpacity, ScrollView, StyleSheet,
  SafeAreaView, ActivityIndicator, Clipboard, Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../lib/ThemeContext";
import { API_BASE } from "../lib/config";

interface ReferralData {
  code: string;
  credit: number;
  totalReferrals: number;
  referrals: Array<{
    id: string;
    referred_email: string;
    status: string;
    created_at: string;
    referrer_credit: number;
  }>;
}

export default function ReferralScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [data, setData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem("ec_user");
        const user = raw ? JSON.parse(raw) : null;
        const userId = user?.id || "demo-user";
        const res = await fetch(`${API_BASE}/api/referral?userId=${userId}`);
        const json = await res.json();
        setData(json);
      } catch {
        setData({ code: "ECDEMOACC", credit: 20, totalReferrals: 0, referrals: [] });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleCopy = () => {
    if (!data?.code) return;
    const link = `https://elitechauffeurs.com.au?ref=${data.code}`;
    Clipboard.setString(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    Alert.alert("Copied!", "Referral link copied to clipboard.");
  };

  const statusColor = (status: string) => {
    if (status === "rewarded") return "#22C55E";
    return "#EAB308";
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.darkBorder }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.back, { color: colors.gold }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.white }]}>Refer a Friend</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Credit balance */}
        <View style={[styles.creditCard, { backgroundColor: "#0A0A0A", borderColor: `${colors.gold}50` }]}>
          <View>
            <Text style={[styles.creditLabel, { color: colors.gray400 }]}>Your Referral Credit</Text>
            {loading ? (
              <ActivityIndicator color={colors.gold} style={{ marginVertical: 8 }} />
            ) : (
              <Text style={[styles.creditAmount, { color: colors.gold }]}>
                ${data?.credit?.toFixed(2) || "0.00"}
              </Text>
            )}
            <Text style={[styles.creditSub, { color: colors.gray500 }]}>
              {data?.totalReferrals || 0} friends referred
            </Text>
          </View>
          <View style={[styles.creditIcon, { backgroundColor: `${colors.gold}15`, borderColor: `${colors.gold}30` }]}>
            <Text style={{ color: colors.gold, fontSize: 28, fontWeight: "900" }}>$</Text>
          </View>
        </View>

        {/* How it works */}
        <View style={[styles.card, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
          <Text style={[styles.cardTitle, { color: colors.white }]}>How it works</Text>
          <View style={styles.stepsRow}>
            {[
              { n: "1", t: "Share code", d: "Send your link to friends" },
              { n: "2", t: "They sign up", d: "Friend creates account" },
              { n: "3", t: "Both get $20", d: "After first ride" },
            ].map((s, i) => (
              <View key={s.n} style={styles.step}>
                <View style={[styles.stepDot, { backgroundColor: `${colors.gold}15`, borderColor: `${colors.gold}30` }]}>
                  <Text style={[styles.stepNum, { color: colors.gold }]}>{s.n}</Text>
                </View>
                <Text style={[styles.stepTitle, { color: colors.white }]}>{s.t}</Text>
                <Text style={[styles.stepDesc, { color: colors.gray500 }]}>{s.d}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Referral code */}
        <View style={[styles.card, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
          <Text style={[styles.sectionLabel, { color: colors.gray400 }]}>YOUR REFERRAL CODE</Text>
          {loading ? (
            <View style={[styles.codeSkeleton, { backgroundColor: colors.darkBorder }]} />
          ) : (
            <>
              <View style={[styles.codeRow, { backgroundColor: colors.black, borderColor: colors.darkBorder }]}>
                <Text style={[styles.codeText, { color: colors.gold }]}>{data?.code || "ECDEMOACC"}</Text>
              </View>
              <TouchableOpacity
                style={[styles.copyBtn, { backgroundColor: colors.gold }]}
                onPress={handleCopy}
                activeOpacity={0.8}
              >
                <Text style={styles.copyBtnText}>{copied ? "✓ Copied!" : "Copy Referral Link"}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* History */}
        {(data?.referrals?.length ?? 0) > 0 && (
          <View style={[styles.card, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder, padding: 0, overflow: "hidden" }]}>
            <View style={[styles.historyHeader, { borderBottomColor: colors.darkBorder }]}>
              <Text style={[styles.cardTitle, { color: colors.white }]}>Referral History</Text>
            </View>
            {data!.referrals.map((r, i) => (
              <View
                key={r.id}
                style={[
                  styles.historyItem,
                  { borderBottomColor: colors.darkBorder },
                  i === data!.referrals.length - 1 && { borderBottomWidth: 0 },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.historyEmail, { color: colors.white }]}>{r.referred_email}</Text>
                  <Text style={[styles.historyDate, { color: colors.gray500 }]}>
                    {new Date(r.created_at).toLocaleDateString("en-AU")}
                  </Text>
                </View>
                <View style={{ alignItems: "flex-end", gap: 4 }}>
                  <Text style={[styles.historyCredit, { color: colors.gold }]}>
                    +${r.referrer_credit?.toFixed(2)}
                  </Text>
                  <View style={[styles.statusBadge, { backgroundColor: `${statusColor(r.status)}20` }]}>
                    <Text style={[styles.statusText, { color: statusColor(r.status) }]}>{r.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {data?.referrals?.length === 0 && !loading && (
          <View style={[styles.emptyState, { backgroundColor: colors.darkSurface, borderColor: colors.darkBorder }]}>
            <Text style={{ fontSize: 36, marginBottom: 12 }}>👥</Text>
            <Text style={[styles.emptyTitle, { color: colors.white }]}>No referrals yet</Text>
            <Text style={[styles.emptyDesc, { color: colors.gray500 }]}>Share your code to start earning credits</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:      { flex: 1 },
  header:         { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1 },
  back:           { fontSize: 15, fontWeight: "600", width: 60 },
  title:          { fontSize: 17, fontWeight: "700" },
  content:        { padding: 16, gap: 14, paddingBottom: 40 },
  creditCard:     { borderRadius: 20, padding: 24, borderWidth: 1.5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  creditLabel:    { fontSize: 13, marginBottom: 4 },
  creditAmount:   { fontSize: 38, fontWeight: "900", marginBottom: 4 },
  creditSub:      { fontSize: 11 },
  creditIcon:     { width: 72, height: 72, borderRadius: 36, borderWidth: 2, justifyContent: "center", alignItems: "center" },
  card:           { borderRadius: 18, padding: 20, borderWidth: 1 },
  cardTitle:      { fontSize: 16, fontWeight: "700", marginBottom: 16 },
  stepsRow:       { flexDirection: "row", gap: 8 },
  step:           { flex: 1, alignItems: "center" },
  stepDot:        { width: 36, height: 36, borderRadius: 18, borderWidth: 1, justifyContent: "center", alignItems: "center", marginBottom: 8 },
  stepNum:        { fontSize: 14, fontWeight: "900" },
  stepTitle:      { fontSize: 11, fontWeight: "700", textAlign: "center", marginBottom: 4 },
  stepDesc:       { fontSize: 10, textAlign: "center" },
  sectionLabel:   { fontSize: 10, fontWeight: "800", letterSpacing: 1.5, marginBottom: 12 },
  codeRow:        { borderRadius: 12, borderWidth: 1, paddingHorizontal: 20, paddingVertical: 16, marginBottom: 12 },
  codeText:       { fontSize: 24, fontWeight: "900", fontFamily: "monospace", letterSpacing: 3 },
  codeSkeleton:   { height: 56, borderRadius: 12, marginBottom: 12 },
  copyBtn:        { borderRadius: 12, paddingVertical: 14, alignItems: "center" },
  copyBtnText:    { color: "#0A0A0A", fontWeight: "800", fontSize: 15 },
  historyHeader:  { paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1 },
  historyItem:    { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
  historyEmail:   { fontSize: 14, fontWeight: "500", marginBottom: 2 },
  historyDate:    { fontSize: 11 },
  historyCredit:  { fontSize: 14, fontWeight: "700" },
  statusBadge:    { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  statusText:     { fontSize: 10, fontWeight: "700" },
  emptyState:     { borderRadius: 18, padding: 32, borderWidth: 1, alignItems: "center" },
  emptyTitle:     { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  emptyDesc:      { fontSize: 13, textAlign: "center" },
});
