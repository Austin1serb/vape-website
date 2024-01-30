import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6200EE',
        'primary-variant': '#3700B3',
        secondary: '#03DAC6',
        'secondary-variant': '#018786',
        background: '#FFFFFF',
        surface: '#F5F5F5',
        error: '#B00020',
        'on-primary': '#FFFFFF',
        'on-secondary': '#000000',
        'on-background': '#000000',
        'on-surface': '#000000',
        'on-error': '#FFFFFF',
        'deep-purple-50': '#EDE7F6',
        'deep-purple-100': '#D1C4E9',
        'deep-purple-200': '#B39DDB',
        'deep-purple-300': '#9575CD',
        'deep-purple-400': '#7E57C2',
        'deep-purple-500': '#673AB7',
        'deep-purple-600': '#5E35B1',
        'deep-purple-700': '#512DA8',
        'deep-purple-800': '#4527A0',
        'deep-purple-900': '#311B92',
        'deep-purple-A100': '#B388FF',
        'deep-purple-A200': '#7C4DFF',
        'deep-purple-A400': '#651FFF',
        'deep-purple-A700': '#6200EA',
      },
    },
  },
  plugins: [],
};
export default config;
