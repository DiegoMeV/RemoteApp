import { stringToObject } from '@/lib/funcs'
const themeApp = stringToObject(import.meta.env.VITE_THEME_APPLICATION, 'THEME_APPLICATION')

export const welcomeCard = {
  background: themeApp?.primary
    ? 'linear-gradient(135deg, rgba(173, 216, 230, 0.2), #7f7f7f)'
    : 'linear-gradient(135deg, rgba(173, 216, 230, 0.2), rgba(70, 130, 180, 0.2))',
  height: '100%',
  borderRadius: 2,
  position: 'relative',
  display: 'flex',
}

export const backgroundInboxWelcomeCard = () => ({
  background: (theme) =>
    theme.palette.mode === 'dark'
      ? 'linear-gradient(to bottom, #3A3A3A 50%, #1A1A1A 100%)'
      : themeApp?.primary
      ? 'linear-gradient(to bottom, #E9E9E9 50%, #A7A7A7 100%)'
      : 'linear-gradient(135deg, rgba(173, 216, 230, 0.2), rgba(70, 130, 180, 0.2))',
})

export const secondaryText = {
  opacity: 0.8,
  maxWidth: 310,
}
export const imageStack = {
  display: 'flex',
  justifyContent: 'center',
  maxWidth: 310,
  alignItems: 'center',
  marginInline: 'auto',
}

export const imageWelcomeCardStyles = {
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
}
