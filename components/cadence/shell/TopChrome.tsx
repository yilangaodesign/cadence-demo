'use client';

import React, { ReactNode } from 'react';
import { Settings, Notification, Search as SearchIcon } from '@carbon/icons-react';
import { Search, Button } from '@carbon/react';
import styles from './TopChrome.module.scss';

interface TopChromeProps {
  /** User's initials or avatar content */
  userInitials?: string;
  /** User's avatar image URL */
  avatarUrl?: string;
  /** Number of unread notifications */
  unreadCount?: number;
  /** Search placeholder text */
  searchPlaceholder?: string;
  /** Called when search value changes */
  onSearchChange?: (value: string) => void;
  /** Called when settings is clicked */
  onSettingsClick?: () => void;
  /** Called when notifications is clicked */
  onNotificationsClick?: () => void;
  /** Called when avatar is clicked */
  onAvatarClick?: () => void;
  /** Custom left content (e.g., window controls) */
  leftContent?: ReactNode;
  className?: string;
}

/**
 * TopChrome - Persistent horizontal bar across the full app width
 * 
 * Layout: Window controls (left) | Search (center) | Settings, Notifications, Avatar (right)
 * Height: 48px
 */
export function TopChrome({
  userInitials = 'DK',
  avatarUrl,
  unreadCount = 0,
  searchPlaceholder = 'Search tasks, events, clients…',
  onSearchChange,
  onSettingsClick,
  onNotificationsClick,
  onAvatarClick,
  leftContent,
  className = '',
}: TopChromeProps) {
  return (
    <div className={`${styles.topChrome} ${className}`}>
      {/* Left section - Window controls or custom content */}
      <div className={styles.leftSection}>
        {leftContent || (
          <div className={styles.windowControls}>
            <span className={`${styles.windowButton} ${styles.close}`} />
            <span className={`${styles.windowButton} ${styles.minimize}`} />
            <span className={`${styles.windowButton} ${styles.expand}`} />
          </div>
        )}
      </div>

      {/* Center section - Search */}
      <div className={styles.centerSection}>
        <Search
          size="lg"
          placeholder={searchPlaceholder}
          labelText="Search"
          closeButtonLabelText="Clear search"
          onChange={(e) => onSearchChange?.(e.target.value)}
          className={styles.searchBar}
        />
      </div>

      {/* Right section - Settings, Notifications, Avatar */}
      <div className={styles.rightSection}>
        <Button
          kind="ghost"
          size="sm"
          hasIconOnly
          renderIcon={Settings}
          iconDescription="Settings"
          onClick={onSettingsClick}
          className={styles.iconButton}
        />
        <div className={styles.notificationWrapper}>
          <Button
            kind="ghost"
            size="sm"
            hasIconOnly
            renderIcon={Notification}
            iconDescription="Notifications"
            onClick={onNotificationsClick}
            className={styles.iconButton}
          />
          {unreadCount > 0 && (
            <span className={styles.notificationBadge} />
          )}
        </div>
        <button
          type="button"
          className={styles.avatarButton}
          onClick={onAvatarClick}
          aria-label="User profile"
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt="User avatar" className={styles.avatarImage} />
          ) : (
            <span className={styles.avatarInitials}>{userInitials}</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default TopChrome;
