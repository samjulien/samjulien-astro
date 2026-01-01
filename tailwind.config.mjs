/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      mono: ['Recursive', 'system-ui', 'monospace'],
      sans: ['Recursive', 'system-ui', 'sans-serif']
    },
    extend: {
      colors: {
        green: {
          50: '#EDFAF7',
          100: '#E7F7F3',
          200: '#C3EAE0',
          300: '#9FDECE',
          400: '#58C5A9',
          500: '#10AC84',
          600: '#0E9B77',
          700: '#0A674F',
          800: '#074D3B',
          900: '#053428',
        },
        brand: '#10AC84',
        'brand-dark': '#0E9B77'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            fontFamily: 'Recursive, sans-serif',
            fontVariationSettings: "'MONO' 0, 'CASL' 0, 'wght' 400, 'slnt' 0, 'CRSV' 0.5",
            'code, pre': {
              fontVariationSettings: "'MONO' 1, 'CASL' 0, 'wght' 400, 'slnt' 0, 'CRSV' 0.5",
            },
            'h1, h2, h3, h4, h5': {
              fontVariationSettings: "'MONO' 0, 'CASL' 0.1, 'wght' 800, 'slnt' 0, 'CRSV' 0.5",
            },
            strong: {
              fontVariationSettings: "'MONO' 0, 'CASL' 0, 'wght' 800, 'slnt' 0, 'CRSV' 0.5",
            },
            em: {
              fontVariationSettings: "'MONO' 0, 'CASL' 0.3, 'wght' 400, 'slnt' -12, 'CRSV' 0.5",
            },
            a: {
              color: theme('colors.green.600'),
            },
            'a:hover': {
              color: theme('colors.green.500'),
            },
            code: {
              padding: '2px 4px',
              borderRadius: '3px',
              background: theme('colors.gray.200'),
            },
            img: {
              marginTop: 0,
              marginBottom: 0,
            },
            'code::before, code::after': {
              content: "''",
            },
            maxWidth: '85ch',
          },
        },
        invert: {
          css: {
            color: theme('colors.gray.200'),
            'h1, h2, h3, h4, h5': {
              color: theme('colors.gray.100'),
            },
            strong: {
              color: theme('colors.gray.100'),
            },
            a: {
              color: theme('colors.green.400'),
            },
            'a:hover': {
              color: theme('colors.green.300'),
            },
            code: {
              background: theme('colors.gray.700'),
              color: theme('colors.gray.200'),
            },
            blockquote: {
              color: theme('colors.gray.300'),
              borderLeftColor: theme('colors.gray.600'),
            },
            hr: {
              borderColor: theme('colors.gray.600'),
            },
            'ol > li::marker': {
              color: theme('colors.gray.400'),
            },
            'ul > li::marker': {
              color: theme('colors.gray.400'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}