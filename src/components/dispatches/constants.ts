export const TABS = [
  { id: 0, label: 'Receipt Details' },
  { id: 1, label: 'Invoice Details' }
] as const;

export type TabId = typeof TABS[number]['id'];