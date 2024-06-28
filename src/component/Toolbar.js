import React from 'react';
import ToolbarItem from './ToolbarItem';

const Toolbar = () => {
  return (
    <div className="toolbar">
      <ToolbarItem type="TEXT" label="Text Box" />
      <ToolbarItem type="IMAGE" label="Image" />
      <ToolbarItem type="BUTTON" label="Button" />
    </div>
  );
};

export default Toolbar;
