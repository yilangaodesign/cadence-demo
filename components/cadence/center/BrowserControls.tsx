'use client';

import React from 'react';
import { ArrowLeft, ArrowRight, Renew, StarFilled, Star } from '@carbon/icons-react';
import { Button } from '@carbon/react';
import styles from './BrowserControls.module.scss';

interface BrowserControlsProps {
  /** Current URL */
  url?: string;
  /** Whether back navigation is available */
  canGoBack?: boolean;
  /** Whether forward navigation is available */
  canGoForward?: boolean;
  /** Whether the page is bookmarked */
  isBookmarked?: boolean;
  /** Whether the page is loading */
  isLoading?: boolean;
  /** Called when back is clicked */
  onBack?: () => void;
  /** Called when forward is clicked */
  onForward?: () => void;
  /** Called when refresh is clicked */
  onRefresh?: () => void;
  /** Called when bookmark is toggled */
  onBookmarkToggle?: () => void;
  className?: string;
}

/**
 * BrowserControls - Navigation bar for embedded web content
 * 
 * Height: 36px
 * Layout: Back/Forward/Refresh | URL bar | Bookmark
 */
export function BrowserControls({
  url = '',
  canGoBack = false,
  canGoForward = false,
  isBookmarked = false,
  isLoading = false,
  onBack,
  onForward,
  onRefresh,
  onBookmarkToggle,
  className = '',
}: BrowserControlsProps) {
  return (
    <div className={`${styles.browserControls} ${className}`}>
      {/* Navigation buttons */}
      <div className={styles.navButtons}>
        <Button
          kind="ghost"
          size="sm"
          hasIconOnly
          renderIcon={ArrowLeft}
          iconDescription="Back"
          onClick={onBack}
          disabled={!canGoBack}
          className={styles.navButton}
        />
        <Button
          kind="ghost"
          size="sm"
          hasIconOnly
          renderIcon={ArrowRight}
          iconDescription="Forward"
          onClick={onForward}
          disabled={!canGoForward}
          className={styles.navButton}
        />
        <Button
          kind="ghost"
          size="sm"
          hasIconOnly
          renderIcon={Renew}
          iconDescription="Refresh"
          onClick={onRefresh}
          className={`${styles.navButton} ${isLoading ? styles.spinning : ''}`}
        />
      </div>

      {/* URL bar */}
      <div className={styles.urlBar}>
        <span className={styles.urlText}>{url}</span>
      </div>

      {/* Bookmark */}
      <Button
        kind="ghost"
        size="sm"
        hasIconOnly
        renderIcon={isBookmarked ? StarFilled : Star}
        iconDescription={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        onClick={onBookmarkToggle}
        className={`${styles.bookmarkButton} ${isBookmarked ? styles.bookmarked : ''}`}
      />
    </div>
  );
}

export default BrowserControls;
