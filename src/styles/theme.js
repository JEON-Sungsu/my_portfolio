export const theme = {
  colors: {
    primary: '#0066CC',
    secondary: '#FF6B6B',
    background: '#0a0a0a',
    text: '#FFFFFF',
    textLight: '#B0B0B0',
    gray: '#1a1a1a',
    grayDark: '#2a2a2a',
    white: '#FFFFFF',
    black: '#000000',

    // Design-specific colors
    gradientStart: '#FF6B9D',
    gradientEnd: '#C471F5',
    orange: '#FF6B35',
    blue: '#4A90E2',
  },

  gradients: {
    primary: 'linear-gradient(135deg, #FF6B9D 0%, #C471F5 100%)',
    text: 'linear-gradient(90deg, #FF6B9D 0%, #C471F5 100%)',
  },

  breakpoints: {
    mobile: '768px',
    tablet: '1024px',
    desktop: '1440px',
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '48px',
    xxl: '64px',
    xxxl: '96px',
  },

  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '24px',
    xxl: '32px',
    xxxl: '48px',
    xxxxl: '56px',
  },

  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    round: '50%',
  },

  shadow: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.3)',
    md: '0 4px 8px rgba(0, 0, 0, 0.3)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.3)',
    xl: '0 16px 32px rgba(0, 0, 0, 0.3)',
    glow: '0 0 20px rgba(255, 107, 157, 0.3)',
  },

  transition: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },
}
