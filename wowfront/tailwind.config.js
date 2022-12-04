/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors:{
        // 'primary': '#41B0C9',
        // 'secondary' : '#467186',
        'primary': '#546449',
        'secondary' : '#6e7967',
        'oldprimary' : '#41B0C9',
        'complementary' : '#d27619',
        'mygray' : '#252525',
        'warriorcolor' : '#C69B6D',
        'warlockcolor' : '#8788EE',
        'roguecolor' : '#FFF468',
        'shamancolor' : '#0070DD',
        'priestcolor' : '#FFFFFF',
        'paladincolor' : '#F48CBA',
        'monkcolor' : '#00FF98',
        'magecolor' : '#3FC7EB',
        'huntercolor' : '#AAD372',
        'evokercolor' : '#33937F',
        'druidcolor' : '#FF7C0A',
        'demon Huntercolor' : '#A330C9',
        'death Knightcolor' : '#C41E3A',
        'Alliance' : '#242B50',
        'Horde' : '#38191A',
      }
    },
  },
  plugins: [],
}
