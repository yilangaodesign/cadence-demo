'use client';

import React from 'react';
import { 
  Repeat, 
  Time, 
  Calendar, 
  Checkmark, 
  Error, 
  Add, 
  PartlyCloudy 
} from '@carbon/icons-react';
import styles from './TaskInteractionMenu.module.scss';

export type MenuAction = 
  | 'swap' 
  | 'defer-later' 
  | 'defer-tomorrow' 
  | 'complete' 
  | 'blocked' 
  | 'extend-time' 
  | 'partial';

interface MenuItem {
  id: MenuAction;
  label: string;
  icon: React.ReactNode;
  metadata?: string;
  disabled?: boolean;
}

interface TaskInteractionMenuProps {
  /** Whether the task is currently active */
  isActiveTask?: boolean;
  /** Selected action */
  selectedAction?: MenuAction;
  /** Called when an action is selected */
  onActionSelect?: (action: MenuAction) => void;
  /** Called when menu should close */
  onClose?: () => void;
  className?: string;
}

/**
 * TaskInteractionMenu - Contextual popup menu for task interactions
 * 
 * Trigger: Click on TaskBlock or TaskCard
 * Width: 200px
 * Items: Swap, Defer, Complete, Blocked, Extend time, Mark partial
 */
export function TaskInteractionMenu({
  isActiveTask = false,
  selectedAction,
  onActionSelect,
  onClose,
  className = '',
}: TaskInteractionMenuProps) {
  const baseMenuItems: MenuItem[] = [
    { id: 'swap', label: 'Swap task', icon: <Repeat size={16} /> },
    { id: 'defer-later', label: 'Defer to later today', icon: <Time size={16} /> },
    { id: 'defer-tomorrow', label: 'Defer to tomorrow', icon: <Calendar size={16} /> },
    { id: 'complete', label: 'Mark complete', icon: <Checkmark size={16} /> },
    { id: 'blocked', label: 'Mark blocked', icon: <Error size={16} /> },
  ];

  const activeTaskItems: MenuItem[] = [
    { id: 'extend-time', label: 'Need more time', icon: <Add size={16} /> },
    { id: 'partial', label: 'Mark partial progress', icon: <PartlyCloudy size={16} /> },
  ];

  const menuItems = isActiveTask 
    ? [...baseMenuItems, ...activeTaskItems]
    : baseMenuItems;

  const handleItemClick = (action: MenuAction) => {
    onActionSelect?.(action);
  };

  return (
    <div className={`${styles.taskInteractionMenu} ${className}`}>
      <ul className={styles.menuList} role="menu">
        {menuItems.map((item, index) => {
          const showDivider = index === 4 && isActiveTask; // Divider before active-only items
          return (
            <React.Fragment key={item.id}>
              {showDivider && <li className={styles.divider} role="separator" />}
              <li
                className={`${styles.menuItem} ${selectedAction === item.id ? styles.selected : ''} ${item.disabled ? styles.disabled : ''}`}
                role="menuitem"
                onClick={() => !item.disabled && handleItemClick(item.id)}
                onKeyDown={(e) => e.key === 'Enter' && !item.disabled && handleItemClick(item.id)}
                tabIndex={item.disabled ? -1 : 0}
              >
                <span className={`${styles.radioIcon} ${selectedAction === item.id ? styles.active : ''}`} />
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
                {item.metadata && (
                  <span className={styles.metadata}>{item.metadata}</span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
}

export default TaskInteractionMenu;
