import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Platform, ActivityIndicator, StatusBar,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { API_BASE } from "../lib/config";
import { useTheme } from "../lib/ThemeContext";

const GOLD   = "#C9A84C";
const BLACK  = "#09090B";
const CARD   = "#17171A";
const BORDER = "#2A2A30";
const GRAY   = "#6B7280";
const ERROR  = "#F87171";
const GREEN  = "#34D399";

type Form = { firstName: string; lastName: string; email: string; phone: string; password: string; confirm: string };

function pwStrength(pw: string): number {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8)           s++;
  if (/[A-Z]/.test(pw))         s++;
  if (/[0-9]/.test(pw))         s++;
  if (/[^A-Za-z0-9]/.test(pw))  s++;
  return s;
}
const STRENGTH_LABEL = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLOR = ["", ERROR, "#FBBF24", GREEN, "#10B981"];

export default function SignupScreen() {
  const navigation = useNavigation<any>();
  const { colors, isDark } = useTheme();
  const GOLD = colors.gold, BLACK = colors.black, CARD = colors.darkSurface,
        BORDER = colors.darkBorder, GRAY = colors.gray500, ERROR = colors.red, GREEN = colors.green;
  const s = makeS(colors);
  const [form, setForm] = useState<Form>({ firstName:"", lastName:"", email:"", phone:"", password:"", confirm:"" });
  const [showPw,      setShowPw]      = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");

  const set = (k: keyof Form, v: string) => { setForm(f => ({ ...f, [k]: v })); if (error) setError(""); };

  const validate = (): string | null => {
    if (!form.firstName || form.firstName.length < 2) return "First name must be at least 2 characters.";
    if (!form.lastName  || form.lastName.length  < 2) return "Last name must be at least 2 characters.";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email address.";
    if (!form.phone || form.phone.replace(/\D/g,"").length < 8) return "Enter a valid phone number.";
    if (form.password.length < 8)       return "Password must be at least 8 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    return null;
  };

  const handleSignup = async () => {
    const err = validate();
    if (err) { setError(err); return; }
    setLoading(true);
    try {
      const res  = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: form.firstName.trim(), lastName: form.lastName.trim(),
          email: form.email.trim(), phone: form.phone.trim(), password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Signup failed. Please try again."); return; }
      await AsyncStorage.setItem("ec_pending_user", JSON.stringify({
        name: `${form.firstName.trim()} ${form.lastName.trim()}`, email: form.email.trim(),
      }));
      navigation.navigate("VerifyOTP", { email: form.email.trim(), type: "signup" });
    } catch {
      setError("Network error — check your connection and try again.");
    } finally { setLoading(false); }
  };

  const strength = pwStrength(form.password);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex:1, backgroundColor: BLACK }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={BLACK} />
      <ScrollView contentContainerStyle={{ flexGrow:1, padding:24, paddingTop:52 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

        {/* Logo */}
        <View style={{ alignItems:"center", marginBottom:36 }}>
          <View style={{ width:68, height:68, borderRadius:34, backgroundColor: GOLD, alignItems:"center", justifyContent:"center", marginBottom:14,
            shadowColor: GOLD, shadowOffset:{width:0,height:8}, shadowOpacity:0.45, shadowRadius:20, elevation:12 }}>
            <Text style={{ color: BLACK, fontSize:22, fontWeight:"900" }}>EC</Text>
          </View>
          <Text style={{ color:"#fff", fontSize:24, fontWeight:"800" }}>Create Account</Text>
          <Text style={{ color: GRAY, fontSize:13, marginTop:6 }}>Join thousands of satisfied clients</Text>
        </View>

        {/* Card */}
        <View style={{ backgroundColor: CARD, borderRadius:24, padding:22, borderWidth:1, borderColor: BORDER,
          shadowColor:"#000", shadowOffset:{width:0,height:8}, shadowOpacity:0.4, shadowRadius:20, elevation:10 }}>

          {/* Name row */}
          <View style={{ flexDirection:"row", gap:10, marginBottom:16 }}>
            <View style={{ flex:1 }}>
              <Text style={s.label}>FIRST NAME</Text>
              <TextInput value={form.firstName} onChangeText={v=>set("firstName",v)} placeholder="John"
                placeholderTextColor="#3A3A45" autoCapitalize="words" style={s.input} />
            </View>
            <View style={{ flex:1 }}>
              <Text style={s.label}>LAST NAME</Text>
              <TextInput value={form.lastName} onChangeText={v=>set("lastName",v)} placeholder="Smith"
                placeholderTextColor="#3A3A45" autoCapitalize="words" style={s.input} />
            </View>
          </View>

          {/* Email */}
          <Text style={s.label}>EMAIL ADDRESS</Text>
          <TextInput value={form.email} onChangeText={v=>set("email",v)} placeholder="you@example.com"
            placeholderTextColor="#3A3A45" keyboardType="email-address" autoCapitalize="none" autoCorrect={false}
            style={[s.input,{marginBottom:16}]} />

          {/* Phone */}
          <Text style={s.label}>PHONE NUMBER</Text>
          <TextInput value={form.phone} onChangeText={v=>set("phone",v)} placeholder="+61 400 000 000"
            placeholderTextColor="#3A3A45" keyboardType="phone-pad" style={[s.input,{marginBottom:16}]} />

          {/* Password */}
          <Text style={s.label}>PASSWORD</Text>
          <View style={{ position:"relative", marginBottom:8 }}>
            <TextInput value={form.password} onChangeText={v=>set("password",v)} placeholder="Min. 8 characters"
              placeholderTextColor="#3A3A45" secureTextEntry={!showPw} autoCapitalize="none"
              style={[s.input,{paddingRight:56}]} />
            <TouchableOpacity onPress={()=>setShowPw(v=>!v)} style={s.eye}>
              <Text style={{ color: GOLD, fontSize:13, fontWeight:"600" }}>{showPw?"Hide":"Show"}</Text>
            </TouchableOpacity>
          </View>

          {/* Strength bar */}
          {form.password.length > 0 && (
            <View style={{ marginBottom:16 }}>
              <View style={{ flexDirection:"row", gap:4, marginBottom:5 }}>
                {[1,2,3,4].map(i => (
                  <View key={i} style={{ flex:1, height:3, borderRadius:2,
                    backgroundColor: i<=strength ? STRENGTH_COLOR[strength] : BORDER }} />
                ))}
              </View>
              <Text style={{ color: STRENGTH_COLOR[strength], fontSize:10, fontWeight:"700" }}>
                {STRENGTH_LABEL[strength]}
              </Text>
            </View>
          )}

          {/* Confirm */}
          <Text style={s.label}>CONFIRM PASSWORD</Text>
          <View style={{ position:"relative", marginBottom:6 }}>
            <TextInput value={form.confirm} onChangeText={v=>set("confirm",v)} placeholder="Re-enter password"
              placeholderTextColor="#3A3A45" secureTextEntry={!showConfirm} autoCapitalize="none"
              style={[s.input, {paddingRight:56},
                form.confirm && form.confirm !== form.password ? {borderColor:"rgba(248,113,113,0.4)"} : {},
                form.confirm && form.confirm === form.password && form.confirm.length>0 ? {borderColor:"rgba(52,211,153,0.4)"} : {},
              ]} />
            <TouchableOpacity onPress={()=>setShowConfirm(v=>!v)} style={s.eye}>
              <Text style={{ color: GOLD, fontSize:13, fontWeight:"600" }}>{showConfirm?"Hide":"Show"}</Text>
            </TouchableOpacity>
          </View>

          {/* Error */}
          {!!error && (
            <View style={s.errorBox}>
              <Text style={{ fontSize:16, color: ERROR }}>⚠</Text>
              <Text style={{ color: ERROR, fontSize:13, flex:1, lineHeight:18 }}>{error}</Text>
            </View>
          )}

          {/* Submit */}
          <TouchableOpacity onPress={handleSignup} disabled={loading} activeOpacity={0.85}
            style={[s.btn, loading&&{opacity:0.7}]}>
            {loading
              ? <ActivityIndicator color={BLACK} />
              : <Text style={s.btnText}>Create Account  →</Text>}
          </TouchableOpacity>

          <Text style={{ color:"#4A4A55", fontSize:11, textAlign:"center", marginTop:14, lineHeight:16 }}>
            By creating an account you agree to our <Text style={{color:GOLD}}>Terms</Text>{" "}
            & <Text style={{color:GOLD}}>Privacy Policy</Text>
          </Text>
        </View>

        {/* Sign in */}
        <View style={{ alignItems:"center", marginTop:24, marginBottom:16 }}>
          <Text style={{ color: GRAY, fontSize:14 }}>
            Already have an account?{" "}
            <Text style={{ color: GOLD, fontWeight:"700" }} onPress={()=>navigation.navigate("Login")}>
              Sign In  →
            </Text>
          </Text>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const makeS = (c: any) => ({
  label: { color: c.gray500, fontSize:10, letterSpacing:1.5, marginBottom:8, fontWeight:"700" as const },
  input: { backgroundColor: c.darkMuted, borderWidth:1, borderColor: c.darkBorder, color: c.white, padding:14, borderRadius:12, fontSize:14 },
  eye:   { position:"absolute" as const, right:14, top:0, bottom:0, justifyContent:"center" as const, padding:4 },
  errorBox: { backgroundColor:"rgba(248,113,113,0.08)", borderColor:"rgba(248,113,113,0.3)", borderWidth:1,
    borderRadius:12, padding:14, marginTop:14, flexDirection:"row" as const, alignItems:"flex-start" as const, gap:10 },
  btn:     { marginTop:22, backgroundColor: c.gold, borderRadius:14, padding:17, alignItems:"center" as const,
    shadowColor: c.gold, shadowOffset:{width:0,height:6}, shadowOpacity:0.4, shadowRadius:16, elevation:8 },
  btnText: { color: c.black, fontSize:15, fontWeight:"900" as const, letterSpacing:0.5 },
});
