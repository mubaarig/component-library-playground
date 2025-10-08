


import type { Preview } from '@storybook/react-vite'
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../src/styles/themes/ThemeProvider'; // adjust path

const preview: Preview = {
  decorators: [
    (Story) => (
    <MemoryRouter>
      </MemoryRouter>
      <MemoryRouter>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </MemoryRouter>
    )
  ],
  parameters: { layout: 'centered' },
};

export default preview;



  