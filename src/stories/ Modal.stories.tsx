import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../components/Modal/Modal';
import { Button } from '../components/Button/Button';
import { useState } from 'react';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Modal with trigger button
const ModalExample = ({ args }: { args: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        actions={
          <>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>
              Confirm
            </Button>
          </>
        }
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    title: 'Modal Title',
    children: 'This is the modal content. You can put any React component here.',
  },
  render: (args) => <ModalExample args={args} />,
};

export const Small: Story = {
  args: {
    title: 'Small Modal',
    size: 'sm',
    children: 'This is a small modal.',
  },
  render: (args) => <ModalExample args={args} />,
};

export const Large: Story = {
  args: {
    title: 'Large Modal',
    size: 'lg',
    children: 'This is a large modal with more content.',
  },
  render: (args) => <ModalExample args={args} />,
};

export const WithoutTitle: Story = {
  args: {
    children: 'This modal has no title.',
  },
  render: (args) => <ModalExample args={args} />,
};