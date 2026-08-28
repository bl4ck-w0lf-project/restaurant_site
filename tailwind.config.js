export default {
 
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    
    extend: {
      
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
