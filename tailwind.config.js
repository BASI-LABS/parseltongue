/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      "2xs" : '0.5rem',
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {
      keyframes : {
        flipHorizontal: {
          '0%': { transform: 'rotateY(0)', opacity : "initial" },
          '100%': { transform: 'rotateY(180deg)', opacity : "60%"},
        },
        InverseflipHorizontal: {
          '0%': { transform: 'rotateY(180deg)', opacity : "initial" },
          '100%': { transform: 'rotateY(0)', opacity : "100%"},
        },
        shimmer: {
          from: {
            "backgroundPosition": "0 0"
          },
          to: {
            "backgroundPosition": "-200% 0"
          }
        },
        fadeIn: {
          '0%': { padding: '0', opacity : "0" },
          '50%': { padding: '0', opacity : "0" },
          '100%': { padding: '0', opacity : "100" }, // Adjust to your desired padding value
        },
      },
      animation : {
        fadeIn: 'fadeIn 0.8s ease-in-out', 
        hflip: 'flipHorizontal 1s forwards',
        ihfilp : 'InverseflipHorizontal 1s forwards',
        shimmer: "shimmer 2s linear infinite"
      }
    },
  },
  plugins: [],
}