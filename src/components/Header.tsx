import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [updateTime, setUpdateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateTime(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <motion.header 
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="header-content">
        <div className="logo-section">
          <motion.div 
            className="logo-icon"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            🎯
          </motion.div>
          <div>
            <h1 className="logo-text">Airdrop Checker</h1>
            <p className="tagline">Check Base & Farcaster airdrop eligibility with spam detection</p>
          </div>
        </div>
        
        <div className="status-badges">
          <motion.div 
            className="status-badge live"
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="pulse-dot"></span>
            Live • Updated {updateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </motion.div>
          <div className="status-badge">
            🔵 Base Network
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
