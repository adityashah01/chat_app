/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        cardForeground: 'var(--card-foreground)',
        primary: 'var(--primary)',
        primaryForeground: 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        secondaryForeground: 'var(--secondary-foreground)',
        accent: 'var(--accent)',
        accentForeground: 'var(--accent-foreground)',
        muted: 'var(--muted)',
        mutedForeground: 'var(--muted-foreground)',
        destructive: 'var(--destructive)',
        destructiveForeground: 'var(--destructive-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        sans: 'var(--font-my-local)',
        mono: 'var(--font-mono)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
