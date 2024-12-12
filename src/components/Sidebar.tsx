import React, { useState } from 'react';
import { useSidebarContext } from '../contexts/SidebarContext';
import Logo from './sidebar/Logo';
import Navigation from './sidebar/Navigation';
import CollapseButton from './sidebar/CollapseButton';

const Sidebar: React.FC = () => {
  const { toggle } = useSidebarContext();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = (menuName: string) => {
    setOpenMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  };

  return (
    <div
      className={`
        fixed top-0 left-0 h-screen bg-white border-r border-gray-200 
        transition-all duration-300 ease-in-out z-50
        ${isExpanded ? 'w-64' : 'w-16'}
        lg:relative
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <Logo isExpanded={isExpanded} />
      
      <Navigation
        openMenus={openMenus}
        toggleMenu={toggleMenu}
        closeSidebar={toggle}
        isExpanded={isExpanded}
      />

      <CollapseButton
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      />
    </div>
  );
};

export default Sidebar;