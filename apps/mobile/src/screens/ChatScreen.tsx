import React, { useState, useEffect, useRef } from "react";
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform,
} from "react-native";
import { supabase } from "../lib/supabase";
import { useTheme } from "../lib/ThemeContext";

export default function ChatScreen({ route, navigation }: any) {
  const { bookingId, driverName } = route.params || {};
  const { colors } = useTheme();
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState("");
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    // Load existing messages
    supabase
      .from("chat_messages")
      .select("*")
      .eq("booking_id", bookingId)
      .order("created_at")
      .then(({ data }) => {
        if (data) setMessages(data);
      });

    // Subscribe to new messages
    const channel = supabase
      .channel(`chat-${bookingId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `booking_id=eq.${bookingId}`,
        },
        (payload) => setMessages((prev) => [...prev, payload.new])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [bookingId]);

  const send = async () => {
    if (!text.trim()) return;
    const msg = text.trim();
    setText("");
    await supabase.from("chat_messages").insert({
      booking_id: bookingId,
      sender_role: "customer",
      message: msg,
    });
  };

  const renderItem = ({ item }: any) => {
    const isMe = item.sender_role === "customer";
    return (
      <View style={[styles.msgRow, isMe && styles.msgRowRight]}>
        {!isMe && (
          <Text style={[styles.senderLabel, { color: colors.gray400 }]}>Driver</Text>
        )}
        <View
          style={[
            styles.bubble,
            isMe
              ? { backgroundColor: colors.gold }
              : { backgroundColor: colors.darkSurface, borderWidth: 1, borderColor: colors.darkBorder },
          ]}
        >
          <Text style={[styles.bubbleText, { color: isMe ? "#000" : colors.white }]}>
            {item.message}
          </Text>
        </View>
        <Text style={[styles.timeText, { color: colors.gray500 }]}>
          {new Date(item.created_at).toLocaleTimeString("en-AU", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.black }]}>
      <View style={[styles.header, { borderBottomColor: colors.darkBorder }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.back, { color: colors.gold }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.white }]}>{driverName || "Driver"}</Text>
        <View style={{ width: 60 }} />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
          onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        />
        <View
          style={[
            styles.inputRow,
            { backgroundColor: colors.darkSurface, borderTopColor: colors.darkBorder },
          ]}
        >
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type a message…"
            placeholderTextColor={colors.gray500}
            style={[
              styles.input,
              { color: colors.white, backgroundColor: colors.darkMuted, borderColor: colors.darkBorder },
            ]}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <TouchableOpacity
            style={[styles.sendBtn, { backgroundColor: colors.gold }]}
            onPress={send}
          >
            <Text style={{ color: "#000", fontWeight: "800", fontSize: 16 }}>↑</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1 },
  header:      { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1 },
  back:        { fontSize: 16 },
  title:       { fontWeight: "700", fontSize: 17 },
  msgRow:      { marginBottom: 12, alignItems: "flex-start", maxWidth: "80%" },
  msgRowRight: { alignSelf: "flex-end", alignItems: "flex-end" },
  senderLabel: { fontSize: 10, marginBottom: 3, fontWeight: "600" },
  bubble:      { borderRadius: 16, paddingHorizontal: 14, paddingVertical: 10 },
  bubbleText:  { fontSize: 15, lineHeight: 21 },
  timeText:    { fontSize: 10, marginTop: 3 },
  inputRow:    { flexDirection: "row", alignItems: "center", gap: 10, padding: 12, borderTopWidth: 1 },
  input:       { flex: 1, borderRadius: 22, paddingHorizontal: 16, paddingVertical: 10, fontSize: 15, borderWidth: 1 },
  sendBtn:     { width: 44, height: 44, borderRadius: 22, justifyContent: "center", alignItems: "center" },
});
