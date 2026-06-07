import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const PLACES_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || "";

interface Props {
  value: string;
  onSelect: (address: string) => void;
  placeholder?: string;
  style?: any;
  inputStyle?: any;
  placeholderTextColor?: string;
}

export function PlacesAutocomplete({
  value,
  onSelect,
  placeholder,
  style,
  inputStyle,
  placeholderTextColor = "#666",
}: Props) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchSuggestions = async (text: string) => {
    if (!text || text.length < 3) {
      setSuggestions([]);
      return;
    }

    // If no Google API key, fall back to Nominatim (same free service the web uses)
    const useNominatim = !PLACES_API_KEY || PLACES_API_KEY.includes("YOUR_");

    try {
      if (useNominatim) {
        const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(text)}&format=json&addressdetails=1&limit=6&countrycodes=au&dedupe=1`;
        const res = await fetch(url, {
          headers: {
            "User-Agent": "EliteChauffeursApp/1.0 (booking platform)",
            "Accept-Language": "en-AU,en;q=0.9",
          },
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setSuggestions(
            data.map((item: any) => {
              // Build a clean address string from Nominatim result
              const a = item.address ?? {};
              const parts: string[] = [];
              if (item.name && item.name.toLowerCase() !== (a.road ?? "").toLowerCase()) {
                parts.push(item.name);
              } else if (a.house_number && a.road) {
                parts.push(`${a.house_number} ${a.road}`);
              } else if (a.road) {
                parts.push(a.road);
              }
              const suburb = a.suburb ?? a.neighbourhood ?? a.village ?? a.town ?? a.city_district;
              if (suburb && suburb !== item.name) parts.push(suburb);
              const city = a.city ?? a.municipality;
              if (city && city !== suburb) parts.push(city);
              const STATE_ABBR: Record<string, string> = {
                "New South Wales": "NSW", "Victoria": "VIC", "Queensland": "QLD",
                "Western Australia": "WA", "South Australia": "SA", "Tasmania": "TAS",
                "Australian Capital Territory": "ACT", "Northern Territory": "NT",
              };
              const state = STATE_ABBR[a.state] ?? a.state;
              if (state) parts.push(state);
              return parts.length > 1
                ? parts.join(", ")
                : item.display_name.split(",").slice(0, 4).join(",").trim();
            })
          );
        }
      } else {
        // Google Places Autocomplete REST API
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(text)}&components=country:au&key=${PLACES_API_KEY}`
        );
        const data = await res.json();
        if (data.predictions) {
          setSuggestions(data.predictions.map((p: any) => p.description));
        }
      }
    } catch {
      setSuggestions([]);
    }
  };

  const handleChange = (text: string) => {
    setQuery(text);
    onSelect(text); // keep parent updated even while typing
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => fetchSuggestions(text), 350);
  };

  const handleSelect = (address: string) => {
    setQuery(address);
    onSelect(address);
    setSuggestions([]);
  };

  return (
    <View style={[{ zIndex: 100 }, style]}>
      <TextInput
        value={query}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={inputStyle}
        autoCorrect={false}
        autoCapitalize="words"
      />
      {suggestions.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={suggestions}
            keyExtractor={(_, i) => String(i)}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={suggestions.length > 4}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelect(item)}
                activeOpacity={0.7}
              >
                <View style={styles.dot} />
                <Text style={styles.itemText} numberOfLines={2}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "#1a1a2e",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    zIndex: 999,
    maxHeight: 220,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
    gap: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C9A84C",
    marginTop: 4,
    flexShrink: 0,
  },
  itemText: {
    color: "#fff",
    fontSize: 13,
    flex: 1,
    lineHeight: 18,
  },
});
