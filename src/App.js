import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Canvas from './component/Canvas';
import Toolbar from './component/Toolbar';
import TextBox from './component/TextBox';
import ImageComponent from './component/ImageComponent';
import ButtonComponent from './component/ButtonComponent';
import './index.css'; 

const App = () => {
  const [components, setComponents] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);

  const addComponent = (type) => {
    const newComponent = type === 'TEXT' ? TextBox : type === 'IMAGE' ? ImageComponent : ButtonComponent;
    setComponents([...components, newComponent]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        <Toolbar />
        <div style={{ flex: 1, padding: '20px' }}>
          <button onClick={() => setPreviewMode(!previewMode)}>
            {previewMode ? 'Edit Mode' : 'Preview Mode'}
          </button>
          {!previewMode ? (
            <Canvas components={components} addComponent={addComponent} />
          ) : (
            <div>
              {components.map((Component, index) => (
                <Component key={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
};

export default App;
