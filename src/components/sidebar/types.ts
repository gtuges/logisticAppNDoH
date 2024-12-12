import { LucideIcon } from 'lucide-react';

export interface SidebarMenuItem {
  icon: LucideIcon;
  text: string;
  path?: string;
  subItems?: SidebarMenuItem[];
}