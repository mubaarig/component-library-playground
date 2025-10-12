import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/Input/Input';
import { useState } from 'react';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    error: {
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Must be at least 8 characters',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Email',
    error: true,
    helperText: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled input',
    disabled: true,
    placeholder: 'Cannot edit this field',
  },
};

// Interactive example
const InputWithState = () => {
  const [value, setValue] = useState('');
  return (
    <Input
      label="Controlled input"
      value={value}
      onChange={setValue}
      placeholder="Type something..."
    />
  );
};

export const Controlled: Story = {
  render: () => <InputWithState />,
};