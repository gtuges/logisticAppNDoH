import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { SidebarMenuItem } from './types';

export const renderMenuItem = (
  item: SidebarMenuItem, 
  depth = 0, 
  openMenus: string[], 
  toggleMenu: (name: string) => void,
  closeSidebar: () => void,
  isExpanded: boolean
) => {
  const hasSubItems = item.subItems && item.subItems.length > 0;
  const isOpen = openMenus.includes(item.text);
  const Icon = item.icon;

  if (item.path) {
    return (
      <NavLink
        key={item.path}
        to={item.path}
        onClick={() => window.innerWidth < 1024 && closeSidebar()}
        className={({ isActive }) => `
          flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors
          ${isActive ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50 text-gray-700'}
          ${depth > 0 ? 'text-sm' : ''}
          ${!isExpanded && depth === 0 ? 'justify-center' : ''}
        `}
        style={{ paddingLeft: isExpanded ? `${1 + depth}rem` : undefined }}
      >
        {Icon && <Icon className={`${depth > 0 ? 'w-4 h-4' : 'w-5 h-5'} flex-shrink-0`} />}
        {(isExpanded || depth > 0) && (
          <span className="font-medium whitespace-nowrap">{item.text}</span>
        )}
      </NavLink>
    );
  }

  return (
    <div key={item.text}>
      <div
        className={`
          flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors
          ${isOpen ? 'bg-gray-50' : 'hover:bg-gray-50'} text-gray-700
          ${depth > 0 ? 'text-sm' : ''}
          ${!isExpanded && depth === 0 ? 'justify-center' : ''}
        `}
        onClick={() => toggleMenu(item.text)}
        style={{ paddingLeft: isExpanded ? `${1 + depth}rem` : undefined }}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className={`${depth > 0 ? 'w-4 h-4' : 'w-5 h-5'} flex-shrink-0`} />}
          {(isExpanded || depth > 0) && (
            <span className="font-medium whitespace-nowrap">{item.text}</span>
          )}
        </div>
        {hasSubItems && isExpanded && (
          isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
        )}
      </div>
      {isOpen && hasSubItems && isExpanded && (
        <div className="space-y-1">
          {item.subItems.map(subItem => 
            renderMenuItem(subItem, depth + 1, openMenus, toggleMenu, closeSidebar, isExpanded)
          )}
        </div>
      )}
    </div>
  );
};