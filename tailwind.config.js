/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  // Theme tokens come from CSS variables (see src/theme/tokens.css)
  theme: {
    extend: {
      colors: {
        primary: 'var(--bs-primary)',
        'primary-hover': 'var(--bs-primary-hover)',
        'primary-fg': 'var(--bs-primary-fg)',
        success: 'var(--bs-success)',
        warning: 'var(--bs-warning)',
        danger: 'var(--bs-danger)',
        info: 'var(--bs-info)',
        body: 'var(--bs-body-bg)',
        surface: 'var(--bs-surface)',
        'surface-2': 'var(--bs-surface-2)',
        'surface-3': 'var(--bs-surface-3)',
        border: 'var(--bs-border)',
        text: 'var(--bs-text)',
        'text-secondary': 'var(--bs-text-secondary)',
        'text-muted': 'var(--bs-text-muted)',
        nav: 'var(--bs-nav-bg)',
        sidebar: 'var(--bs-sidebar-bg)',
        'sidebar-active': 'var(--bs-sidebar-active-bg)',
        alert: 'var(--bs-alert-bg)',
      },
      fontFamily: {
        sans: ['var(--bs-font-regular)', 'system-ui', 'sans-serif'],
        medium: ['var(--bs-font-medium)', 'system-ui', 'sans-serif'],
        bold: ['var(--bs-font-bold)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        mini: ['11px', { lineHeight: '16px' }],
        tiny: ['12px', { lineHeight: '18px' }],
        small: ['13px', { lineHeight: '20px' }],
        default: ['14px', { lineHeight: '20px' }],
        h7: ['15px', { lineHeight: '22px' }],
        h6: ['16px', { lineHeight: '24px' }],
        h5: ['18px', { lineHeight: '26px' }],
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '10px',
      },
      spacing: {
        // Align with ULS 4px base where useful
        0.5: '2px',
        1: '4px',
        1.5: '6px',
        2: '8px',
        2.5: '10px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
      },
      minHeight: {
        'btn-xs': '24px',
        'btn-s': '28px',
        'btn-m': '32px',
        'btn-l': '36px',
        'btn-xl': '40px',
      },
      boxShadow: {
        xs: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
        md: '0 4px 8px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    // Avoid fighting page background set by theme tokens
    preflight: true,
  },
};
