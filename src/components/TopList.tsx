import { motion } from 'framer-motion';
import './TopList.css';

interface TopListItem {
  name: string;
  value: string;
  trend?: number;
  avatar?: string;
}

interface TopListProps {
  title: string;
  emoji: string;
  items: TopListItem[];
}

const TopList = ({ title, emoji, items }: TopListProps) => {
  return (
    <motion.div 
      className="top-list"
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="list-header">
        <span className="list-emoji">{emoji}</span>
        <h3 className="list-title">{title}</h3>
      </div>
      
      <div className="list-items">
        {items.map((item, index) => (
          <motion.div 
            key={index}
            className="list-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 5 }}
          >
            <div className="item-rank">
              <span className={`rank-badge rank-${index + 1}`}>#{index + 1}</span>
            </div>
            
            <div className="item-info">
              {item.avatar && (
                item.avatar.startsWith('http') ? (
                  <img 
                    src={item.avatar} 
                    alt={item.name} 
                    className="item-avatar"
                    style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                    onError={(e) => {
                      // Fallback to default emoji if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.innerHTML = '👤';
                    }}
                  />
                ) : (
                  <span className="item-avatar">{item.avatar}</span>
                )
              )}
              <div className="item-details">
                <span className="item-name">{item.name}</span>
                <span className="item-value">{item.value}</span>
              </div>
            </div>
            
            {item.trend !== undefined && (
              <div className={`item-trend ${item.trend >= 0 ? 'positive' : 'negative'}`}>
                {item.trend >= 0 ? '↗' : '↘'} {Math.abs(item.trend)}%
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopList;
