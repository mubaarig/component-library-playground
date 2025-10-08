// Utility functions for visual regression testing
export const testIds = {
  button: 'button',
  card: 'card',
  input: 'input',
  modal: 'modal',
  modalOverlay: 'modal-overlay',
} as const;

// Helper to take screenshots for visual testing
export const takeComponentScreenshot = async (componentTestId: string) => {
  // This would integrate with your visual testing framework
  console.log(`Taking screenshot for component: ${componentTestId}`);
};

// Theme testing utilities
export const testThemes = ['light', 'dark'] as const;

export const getThemeStyles = (theme: 'light' | 'dark') => {
  // Return expected styles for each theme for visual testing
  return {
    button: {
      primary: theme === 'light' ? '#0ea5e9' : '#38bdf8',
    },
    background: theme === 'light' ? '#ffffff' : '#0f172a',
  };
};