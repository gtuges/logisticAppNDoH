import { TabId } from '../../constants';

export interface TabHeaderProps {
  selectedTab: TabId;
  onTabChange: (index: TabId) => void;
}