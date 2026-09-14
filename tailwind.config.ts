import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0C",
        surface: {
          DEFAULT: "#121218",
          secondary: "#181822",
          elevated: "#1F1F2C",
        },
        border: {
          subtle: "#2A2A36",
          gold: "#D4AF3740",
          goldStrong: "#D4AF3780",
        },
        gold: {
          50: "#FCF9EC",
          100: "#F8F1D2",
          200: "#F3E5AB",
          300: "#ECD27E",
          400: "#E3BE4C",
          500: "#D4AF37",
          600: "#B88E1F",
          700: "#916B16",
          800: "#6B4D10",
          900: "#44300A",
        },
      },
      fontFamily: {
        cairo: ["var(--font-cairo)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #AA7C11 100%)",
        "gold-gradient-hover": "linear-gradient(135deg, #FFFFFF 0%, #F3E5AB 30%, #D4AF37 100%)",
        "dark-glass": "linear-gradient(180deg, rgba(26, 26, 36, 0.7) 0%, rgba(18, 18, 24, 0.85) 100%)",
        "card-radial": "radial-gradient(circle at top right, rgba(212, 175, 55, 0.08) 0%, transparent 70%)",
      },
      boxShadow: {
        "gold-sm": "0 0 15px rgba(212, 175, 55, 0.2)",
        "gold-md": "0 0 25px rgba(212, 175, 55, 0.35)",
        "gold-lg": "0 0 45px rgba(212, 175, 55, 0.45)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 15px rgba(212, 175, 55, 0.2)" },
          "100%": { boxShadow: "0 0 30px rgba(212, 175, 55, 0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
