import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primaryLight: '#00000020',
        primaryLightHover: '#00000020',
        primaryLightActive: '#00000020',
        primaryLightContrast: '#00000020',
        primary: '#1F51FF40',
        primaryBorder: '#00000020',
        primaryBorderHover: '#00000020',
        primarySolidHover: '#00000010',
        primarySolidContrast: '$white',
        primaryShadow: '$white500',
        transparent: '#00000000',
        dropdownItemHoverTextColor:'#00000000',
        link: '#5E1DAD',
  
        myColor: '#00000000'
  
      },
      
    },
  },
  plugins: [],
}
export default config
