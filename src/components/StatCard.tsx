import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './StatCard.css';

interface StatCardProps {
  title: string;
  value: string;
  emoji: string;
  trend?: number;
  subtitle?: string;
  color?: 'blue' | 'violet' | 'success' | 'warning' | 'danger';
}

const StatCard = ({ title, value, emoji, trend, subtitle, color = 'blue' }: StatCardProps) => {
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    // Animate counter
    const numValue = parseFloat(value.replace(/[^0-9.-]/g, ''));
    if (isNaN(numValue)) {
      setDisplayValue(value);
      return;
    }

    let startValue = 0;
    const duration = 1000;
    const increment = numValue / (duration / 16);
    
    const timer = setInterval(() => {
      startValue += increment;
      if (startValue >= numValue) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        const prefix = value.match(/^[^0-9]*/)?.[0] || '';
        const suffix = value.match(/[^0-9]*$/)?.[0] || '';
        setDisplayValue(prefix + Math.floor(startValue).toLocaleString() + suffix);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div 
      className={`stat-card stat-card-${color}`}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="stat-header">
        <span className="stat-emoji">{emoji}</span>
        <span className="stat-title">{title}</span>
      </div>
      
      <div className="stat-value">{displayValue}</div>
      
      <div className="stat-footer">
        {trend !== undefined && (
          <span className={`stat-trend ${trend >= 0 ? 'positive' : 'negative'}`}>
            {trend >= 0 ? '↗' : '↘'} {Math.abs(trend)}%
          </span>
        )}
        {subtitle && <span className="stat-subtitle">{subtitle}</span>}
      </div>
    </motion.div>
  );
};

export default StatCard;
