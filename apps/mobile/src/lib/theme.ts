// ── Dark Theme (original) ────────────────────────────────────────────────────
export const DARK_COLORS = {
  // Core backgrounds
  black:       "#0A0A0A",
  darkBg:      "#111113",
  darkSurface: "#111111",
  darkMuted:   "#1E1E1E",
  darkBorder:  "#2A2A2A",

  // Text
  white:   "#FFFFFF",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray300: "#D1D5DB",

  // Brand gold
  gold:      "#C9A84C",
  goldLight: "#E8C97A",
  goldDark:  "#A07830",

  // Status colours
  green:  "#4ADE80",
  red:    "#F87171",
  blue:   "#3B82F6",
  orange: "#FB923C",

  // Utility
  black10: "rgba(201,168,76,0.1)",
};

// ── Light Theme (white + gold only) ──────────────────────────────────────────
export const LIGHT_COLORS = {
  // backgrounds — clean whites with a subtle warm/gold tint
  black:        "#FFFFFF",   // app background
  darkBg:       "#FBF9F4",   // alt background
  darkSurface:  "#FFFFFF",   // cards
  darkMuted:    "#FAF7EF",   // inputs / muted fills
  darkBorder:   "#ECE3CF",   // soft gold-tinted borders

  // text — near-black for contrast on white
  white:        "#1A1712",   // primary text
  gray500:      "#7A6E5A",   // secondary text
  gray400:      "#9B8E78",   // tertiary text
  gray300:      "#B7A98E",

  // brand gold
  gold:         "#B8923A",   // slightly deeper gold for contrast on white
  goldLight:    "#C9A84C",
  goldDark:     "#9A7A2E",

  // status (kept readable on white)
  green:        "#15803D",
  red:          "#DC2626",
  blue:         "#2563EB",
  orange:       "#C2620C",

  black10:      "rgba(184,146,58,0.1)",
};

// COLORS = current active theme — will be overridden by ThemeContext
// Keep this export for files that haven't migrated yet (fallback to dark)
export const COLORS = DARK_COLORS;

export const FONTS = {
  regular: { fontFamily: "System" },
  medium:  { fontFamily: "System", fontWeight: "500" as const },
  bold:    { fontFamily: "System", fontWeight: "700" as const },
};

export const SHADOWS = {
  gold: {
    shadowColor: "#C9A84C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  card: {
    shadowColor: "#C9A84C",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
};
