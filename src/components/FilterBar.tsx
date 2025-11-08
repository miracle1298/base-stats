import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { TimeRange, ViewMode } from '../App';
import './FilterBar.css';

interface FilterBarProps {
  timeRange: TimeRange;
  setTimeRange: (range: TimeRange) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const FilterBar = ({ timeRange, setTimeRange, viewMode, setViewMode }: FilterBarProps) => {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const timeRanges: TimeRange[] = ['24h', '7d', '30d'];
  const viewModes: { mode: ViewMode; label: string; emoji: string }[] = [
    { mode: 'overview', label: 'Overview', emoji: '📊' },
    { mode: 'users', label: 'Top Users', emoji: '👥' },
    { mode: 'frames', label: 'Active Frames', emoji: '🖼️' },
    { mode: 'communities', label: 'Communities', emoji: '🏘️' },
    { mode: 'spam', label: 'Spam Tracker', emoji: '🚫' },
  ];

  return (
    <motion.div 
      className="filter-bar"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      style={{ display: 'flex', visibility: 'visible' }}
    >
      <div className="filter-section" style={{ width: '100%' }}>
        <label className="filter-label">
          ⏰ Time Range 
          <motion.span 
            className="update-indicator"
            key={lastUpdate.getTime()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            • Auto-updating
          </motion.span>
        </label>
        <div className="filter-buttons">
          {timeRanges.map((range) => (
            <motion.button
              key={range}
              className={`filter-btn ${timeRange === range ? 'active' : ''}`}
              onClick={() => setTimeRange(range)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {range}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <label className="filter-label" style={{ display: 'block', width: '100%' }}>🔍 View Mode</label>
        <div className="filter-buttons view-modes">
          {viewModes.map(({ mode, label, emoji }) => (
            <motion.button
              key={mode}
              className={`filter-btn view-btn ${viewMode === mode ? 'active' : ''}`}
              onClick={() => setViewMode(mode)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="btn-emoji">{emoji}</span>
              {label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBar;
