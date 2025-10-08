import React, { useState } from 'react';
import { ThemeSelector } from './components/ThemeSelector/ThemeSelector';
import {ThemeProvider} from './styles/themes/ThemeProvider';
import { Button } from './components/Button/Button';
import { Card } from './components/Card/Card';
import { Input } from './components/Input/Input';
import { Modal } from './components/Modal/Modal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <ThemeProvider>
      <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <ThemeSelector />
        
        <h1>Component Library Playground</h1>
        
        <Card padding="lg" margin="lg">
          <h2>Buttons</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>

          <h2>Inputs</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
            <Input 
              placeholder="Basic input" 
              value={inputValue}
              onChange={setInputValue}
            />
            <Input 
              label="With label" 
              placeholder="Enter text here"
              helperText="This is a helper text"
            />
            <Input 
              label="Error state" 
              error 
              helperText="This is an error message"
            />
            <Input 
              label="Disabled" 
              disabled 
              placeholder="Disabled input"
            />
          </div>

          <h2>Modal</h2>
          <Button onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
            actions={
              <>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>
                  Confirm
                </Button>
              </>
            }
          >
            <p>This is a modal example with actions.</p>
          </Modal>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default App;