import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../components/Card/Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    elevation: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a card component',
    padding: 'md',
    elevation: 'sm',
  },
};

export const WithElevation: Story = {
  args: {
    children: 'Card with medium elevation',
    padding: 'lg',
    elevation: 'md',
  },
};

export const LargePadding: Story = {
  args: {
    children: 'Card with large padding',
    padding: 'xl',
    elevation: 'sm',
  },
};