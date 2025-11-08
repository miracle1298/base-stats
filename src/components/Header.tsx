import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
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
            <h1 className="logo-text">Consistent Interactors</h1>
            <p className="tagline">Identify and reward your most consistent Farcaster interactors</p>
          </div>
        </div>
        
        <div className="status-badges">
          <div className="status-badge">
            🔵 Base Network
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
