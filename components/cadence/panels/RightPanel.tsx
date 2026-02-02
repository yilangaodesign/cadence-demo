'use client';

import React, { ReactNode, useState } from 'react';
import { Idea, UserAvatar, ChartLine } from '@carbon/icons-react';
import styles from './RightPanel.module.scss';

export type RightPanelTab = 'insights' | 'agent' | 'dashboard';

interface RightPanelProps {
  /** Insights tab content */
  insightsContent?: ReactNode;
  /** Agent tab content */
  agentContent?: ReactNode;
  /** Dashboard tab content */
  dashboardContent?: ReactNode;
  /** Default active tab */
  defaultTab?: RightPanelTab;
  /** Called when tab changes */
  onTabChange?: (tab: RightPanelTab) => void;
  className?: string;
}

/**
 * RightPanel - Container for safety/alerts/governance zone
 * 
 * Width: 340px fixed
 * Tabs: Insights | Agent | Dashboard
 * Scrolls internally
 */
export function RightPanel({
  insightsContent,
  agentContent,
  dashboardContent,
  defaultTab = 'insights',
  onTabChange,
  className = '',
}: RightPanelProps) {
  const [activeTab, setActiveTab] = useState<RightPanelTab>(defaultTab);

  const handleTabClick = (tab: RightPanelTab) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  const tabs: { id: RightPanelTab; label: string; icon: React.ReactNode }[] = [
    { id: 'insights', label: 'Insights', icon: <Idea size={16} /> },
    { id: 'agent', label: 'Agent', icon: <UserAvatar size={16} /> },
    { id: 'dashboard', label: 'Dashboard', icon: <ChartLine size={16} /> },
  ];

  return (
    <div className={`${styles.rightPanel} ${className}`}>
      {/* Custom Tab List */}
      <div className={styles.tabList} role="tablist" aria-label="Right panel navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* Tab Panels */}
      <div className={styles.tabPanelContainer}>
        {activeTab === 'insights' && (
          <div 
            id="panel-insights" 
            role="tabpanel" 
            aria-labelledby="tab-insights"
            className={styles.tabPanel}
          >
            {insightsContent}
          </div>
        )}
        {activeTab === 'agent' && (
          <div 
            id="panel-agent" 
            role="tabpanel" 
            aria-labelledby="tab-agent"
            className={styles.tabPanel}
          >
            {agentContent}
          </div>
        )}
        {activeTab === 'dashboard' && (
          <div 
            id="panel-dashboard" 
            role="tabpanel" 
            aria-labelledby="tab-dashboard"
            className={styles.tabPanel}
          >
            {dashboardContent}
          </div>
        )}
      </div>
    </div>
  );
}

export default RightPanel;
