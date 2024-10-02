module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',  // Blue-500
        secondary: '#10B981', // Emerald-500
        accent: '#F59E0B',   // Amber-500
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
        neutral: '#F3F4F6',
        text: '#1F2937',
        darkBackground: '#1F2937',
        darkText: '#F3F4F6',
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
        monospace: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
