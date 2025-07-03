import { stringToObject } from '@/lib/funcs'

const themeApp = stringToObject(import.meta.env.VITE_THEME_APPLICATION, 'THEME_APPLICATION')

export const sxHoverColor = (hoverColor) => ({
  '&:hover': {
    color: hoverColor || themeApp?.primary || '#1a73e8',
  },
})
