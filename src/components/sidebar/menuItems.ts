import { 
  LayoutDashboard, 
  Box, 
  Truck, 
  Settings,
  Building2,
  Building,
  Users,
  Shield,
  UserCog
} from 'lucide-react';
import { SidebarMenuItem } from './types';

export const mainMenuItems: SidebarMenuItem[] = [
  { 
    icon: LayoutDashboard, 
    text: 'Dashboard', 
    path: '/dashboard' 
  },
  { 
    icon: Box, 
    text: 'Batches', 
    path: '/batches' 
  },
  { 
    icon: Truck, 
    text: 'Dispatches', 
    path: '/dispatches' 
  },
  { 
    icon: Settings, 
    text: 'Settings',
    subItems: [
      {
        icon: Building2,
        text: 'Facilities',
        subItems: [
          { 
            icon: Building2, 
            text: 'Facilities', 
            path: '/settings/facilities' 
          },
          { 
            icon: Building, 
            text: 'Facility Types', 
            path: '/settings/facility-types' 
          }
        ]
      },
      {
        icon: UserCog,
        text: 'Administration',
        subItems: [
          { 
            icon: Users, 
            text: 'Users', 
            path: '/settings/users' 
          },
          { 
            icon: Shield, 
            text: 'Permissions', 
            path: '/settings/permissions' 
          }
        ]
      }
    ]
  }
];