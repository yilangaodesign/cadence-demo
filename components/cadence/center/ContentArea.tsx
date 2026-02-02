'use client';

import React, { ReactNode } from 'react';
import styles from './ContentArea.module.scss';

interface ContentAreaProps {
  /** URL to embed in iframe */
  url?: string;
  /** Or custom content */
  children?: ReactNode;
  /** Empty state message */
  emptyMessage?: string;
  /** Loading state */
  isLoading?: boolean;
  className?: string;
}

/**
 * ContentArea - The iframe or embedded view rendering work content
 * 
 * Height: Fill remaining space
 * Empty state: Lora serif message
 */
export function ContentArea({
  url,
  children,
  emptyMessage = 'Open a task to load its workspace',
  isLoading = false,
  className = '',
}: ContentAreaProps) {
  const isEmpty = !url && !children;

  return (
    <div className={`${styles.contentArea} ${className}`}>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner} />
        </div>
      )}
      
      {isEmpty ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyMessage}>{emptyMessage}</p>
        </div>
      ) : url ? (
        <iframe
          src={url}
          title="Workspace content"
          className={styles.iframe}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
        />
      ) : (
        children
      )}
    </div>
  );
}

export default ContentArea;
