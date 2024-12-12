import React from 'react';
import { renderMenuItem } from './utils';
import { mainMenuItems } from './menuItems';

interface NavigationProps {
  openMenus: string[];
  toggleMenu: (menuName: string) => void;
  closeSidebar: () => void;
  isExpanded: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  openMenus,
  toggleMenu,
  closeSidebar,
  isExpanded
}) => {
  return (
    <nav className={`
      overflow-y-auto h-[calc(100vh-4rem)] 
      ${isExpanded ? 'px-4' : 'px-2'}
    `}>
      <div className="space-y-1 py-4">
        {mainMenuItems.map(item => renderMenuItem(
          item,
          0,
          openMenus,
          toggleMenu,
          closeSidebar,
          isExpanded
        ))}
      </div>
    </nav>
  );
};

export default Navigation;