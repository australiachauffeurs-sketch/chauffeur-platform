// ── Dark Theme (original) ────────────────────────────────────────────────────
export const DARK_COLORS = {
  // Core backgrounds
  black:       "#FAF8F4",   // cream — main screen background
  darkSurface: "#FFFFFF",   // white — card / input background
  darkMuted:   "#F5F1EB",   // soft cream — secondary surface / tabs bg
  darkBorder:  "#E8E0D0",   // warm border

  // Text
  white:   "#1C1611",   // ink — primary text
  gray400: "#7A6F62",   // muted text
  gray500: "#B0A898",   // faint text / placeholders
  gray300: "#C8C0B4",   // very faint text

  // Brand gold — unchanged
  gold:      "#C9A84C",
  goldLight: "#E8C97A",
  goldDark:  "#A07830",

  // Status colours — unchanged
  green:  "#4ADE80",
  red:    "#F87171",
  orange: "#FB923C",
  blue:   "#60A5FA",
};

// ── Light Theme (white + gold palette) ──────────────────────────────────────
export const LIGHT_COLORS = {
  black:        "#FFFFFF",
  darkSurface:  "#FFFFFF",
  darkMuted:    "#F0EDE6",
  darkBorder:   "#E2D9C8",
  white:        "#1A1410",
  gray500:      "#6B5E4E",
  gray400:      "#8B7B6B",
  gray300:      "#A89880",
  gold:         "#C9A84C",
  goldLight:    "#D4A843",
  goldDark:     "#A8873A",
  green:        "#16A34A",
  red:          "#DC2626",
  blue:         "#2563EB",
  orange:       "#D97706",
};

// Legacy export so existing imports still work (defaults to dark)
export const COLORS = DARK_COLORS;

export const SHADOWS = {
  gold: {
    shadowColor: "#C9A84C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 10,
  },
  card: {
    shadowColor: "#C9A84C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
};
