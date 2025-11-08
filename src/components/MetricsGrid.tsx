import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { TimeRange, ViewMode } from '../App';
import StatCard from './StatCard';
import ChartCard from './ChartCard';
import TopList from './TopList';
import './MetricsGrid.css';

interface MetricsGridProps {
  timeRange: TimeRange;
  viewMode: ViewMode;
}

const MetricsGrid = ({ timeRange, viewMode }: MetricsGridProps) => {
  const [liveUpdate, setLiveUpdate] = useState(0);

  // Auto-refresh every 5 seconds to simulate live data
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUpdate(prev => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Mock data - in a real app, this would come from APIs
  const getMultiplier = () => {
    switch(timeRange) {
      case '24h': return 1;
      case '7d': return 4.2;
      case '30d': return 15.8;
      default: return 1;
    }
  };

  const m = getMultiplier();
  // Add small random variations to simulate live updates
  const liveVariation = 1 + (Math.random() * 0.1 - 0.05);

  const farcasterStats = {
    activeUsers: Math.floor(45230 * m * liveVariation),
    dailyGrowth: +(2.3 * m + (Math.random() * 0.4 - 0.2)).toFixed(1),
    totalCasts: Math.floor(156340 * m * liveVariation),
    avgLikes: Math.floor(23 * (m / 2) * liveVariation),
    avgRecasts: Math.floor(8 * (m / 2) * liveVariation),
    avgReplies: Math.floor(12 * (m / 2) * liveVariation),
    spamRate: +(5.8 - m * 0.2 + (Math.random() * 0.3 - 0.15)).toFixed(1),
    qualityRate: +(94.2 + m * 0.2 + (Math.random() * 0.3 - 0.15)).toFixed(1),
  };

  const baseStats = {
    dailyTxCount: Math.floor(892450 * m * liveVariation),
    avgGasFee: +(0.0012 / m * (1 + Math.random() * 0.2 - 0.1)).toFixed(4),
    uniqueWallets: Math.floor(34560 * m * liveVariation),
    tvl: +(123.4 * m * liveVariation).toFixed(1),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (viewMode === 'spam') {
    return (
      <motion.div 
        className="metrics-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="grid-full">
          <StatCard
            title="Spam Detection Rate"
            value={`${farcasterStats.spamRate}%`}
            emoji="🚫"
            trend={-1.2}
            subtitle="Low quality content flagged"
            color="danger"
          />
        </motion.div>
        <motion.div variants={itemVariants} className="grid-full">
          <StatCard
            title="Quality Content Rate"
            value={`${farcasterStats.qualityRate}%`}
            emoji="✨"
            trend={+1.2}
            subtitle="High engagement posts"
            color="success"
          />
        </motion.div>
        <motion.div variants={itemVariants} className="grid-span-2">
          <ChartCard
            title="Spam vs Quality Trend"
            emoji="📈"
            type="comparison"
          />
        </motion.div>
        <motion.div variants={itemVariants} className="grid-span-2">
          <TopList
            title="Most Flagged Spam Keywords"
            emoji="🔍"
            items={[
              { name: 'crypto giveaway', value: '2,340 flags', trend: +15 },
              { name: 'click here now', value: '1,890 flags', trend: -5 },
              { name: 'guaranteed returns', value: '1,560 flags', trend: +8 },
              { name: 'urgent action needed', value: '1,230 flags', trend: +12 },
              { name: 'free tokens', value: '980 flags', trend: -3 },
            ]}
          />
        </motion.div>
      </motion.div>
    );
  }

  if (viewMode === 'users') {
    return (
      <motion.div 
        className="metrics-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="grid-span-2">
          <TopList
            title="Top Casters by Engagement"
            emoji="🏆"
            items={[
              { name: '@vitalik.eth', value: '45.2K engagement', trend: +12, avatar: '🧙' },
              { name: '@dwr.eth', value: '38.7K engagement', trend: +8, avatar: '👨‍💼' },
              { name: '@jessepollak', value: '32.1K engagement', trend: +15, avatar: '🎨' },
              { name: '@balajis.eth', value: '28.9K engagement', trend: -2, avatar: '📊' },
              { name: '@cdixon.eth', value: '24.3K engagement', trend: +5, avatar: '💡' },
            ]}
          />
        </motion.div>
        <motion.div variants={itemVariants} className="grid-span-2">
          <ChartCard
            title="User Activity Trend"
            emoji="📈"
            type="area"
          />
        </motion.div>
      </motion.div>
    );
  }

  if (viewMode === 'frames') {
    return (
      <motion.div 
        className="metrics-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="grid-span-2">
          <TopList
            title="Most Active Frames"
            emoji="🖼️"
            items={[
              { name: 'Base Build Challenge', value: '12.3K interactions', trend: +25 },
              { name: 'Farcaster Poll Frame', value: '9.8K interactions', trend: +18 },
              { name: 'NFT Mint Frame', value: '8.2K interactions', trend: +10 },
              { name: 'Tip Bot Frame', value: '7.1K interactions', trend: +5 },
              { name: 'Game Frame', value: '6.5K interactions', trend: +22 },
            ]}
          />
        </motion.div>
        <motion.div variants={itemVariants} className="grid-span-2">
          <ChartCard
            title="Frame Engagement Over Time"
            emoji="📊"
            type="bar"
          />
        </motion.div>
      </motion.div>
    );
  }

  if (viewMode === 'communities') {
    return (
      <motion.div 
        className="metrics-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={itemVariants} className="grid-span-2">
          <TopList
            title="Top Communities"
            emoji="🏘️"
            items={[
              { name: '/base', value: '23.4K members', trend: +30 },
              { name: '/farcaster', value: '18.9K members', trend: +12 },
              { name: '/developers', value: '15.2K members', trend: +18 },
              { name: '/nfts', value: '12.7K members', trend: +8 },
              { name: '/defi', value: '10.3K members', trend: +15 },
            ]}
          />
        </motion.div>
        <motion.div variants={itemVariants} className="grid-span-2">
          <ChartCard
            title="Community Growth"
            emoji="📈"
            type="line"
          />
        </motion.div>
      </motion.div>
    );
  }

  // Overview mode (default)
  return (
    <motion.div 
      className="metrics-grid"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Farcaster Metrics */}
      <motion.div variants={itemVariants}>
        <StatCard
          title="Active Farcaster Users"
          value={farcasterStats.activeUsers.toLocaleString()}
          emoji="🟣"
          trend={farcasterStats.dailyGrowth}
          subtitle={`+${farcasterStats.dailyGrowth}% growth`}
          color="violet"
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <StatCard
          title="Daily Casts"
          value={farcasterStats.totalCasts.toLocaleString()}
          emoji="💬"
          trend={+3.2}
          subtitle="Total posts today"
          color="blue"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatCard
          title="Avg Likes per Cast"
          value={farcasterStats.avgLikes.toString()}
          emoji="❤️"
          trend={+5.4}
          subtitle="Engagement metric"
          color="danger"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatCard
          title="Avg Recasts"
          value={farcasterStats.avgRecasts.toString()}
          emoji="🔄"
          trend={+2.1}
          subtitle="Share rate"
          color="success"
        />
      </motion.div>

      {/* Base Chain Metrics */}
      <motion.div variants={itemVariants}>
        <StatCard
          title="Base Daily Transactions"
          value={baseStats.dailyTxCount.toLocaleString()}
          emoji="🔵"
          trend={+8.3}
          subtitle="On-chain activity"
          color="blue"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatCard
          title="Avg Gas Fee"
          value={`$${baseStats.avgGasFee}`}
          emoji="⛽"
          trend={-12.5}
          subtitle="Lower is better"
          color="success"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatCard
          title="Unique Wallets"
          value={baseStats.uniqueWallets.toLocaleString()}
          emoji="💰"
          trend={+6.7}
          subtitle="Active addresses"
          color="warning"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatCard
          title="Spam Rate"
          value={`${farcasterStats.spamRate}%`}
          emoji="🚫"
          trend={-0.8}
          subtitle="Flagged content"
          color="danger"
        />
      </motion.div>

      {/* Charts */}
      <motion.div variants={itemVariants} className="grid-span-2">
        <ChartCard
          title="Farcaster Activity Trend"
          emoji="📈"
          type="area"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="grid-span-2">
        <ChartCard
          title="Base Network Stats"
          emoji="🔵"
          type="line"
        />
      </motion.div>

      {/* Top Lists */}
      <motion.div variants={itemVariants} className="grid-span-2">
        <TopList
          title="Top Active Frames"
          emoji="🖼️"
          items={[
            { name: 'Base Build Challenge', value: '12.3K interactions', trend: +25 },
            { name: 'Farcaster Poll', value: '9.8K interactions', trend: +18 },
            { name: 'NFT Showcase', value: '8.2K interactions', trend: +10 },
            { name: 'Tip Bot', value: '7.1K interactions', trend: +5 },
            { name: 'Game Frame', value: '6.5K interactions', trend: +22 },
          ]}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="grid-span-2">
        <TopList
          title="Top Casters"
          emoji="👥"
          items={[
            { name: '@vitalik.eth', value: '45.2K', trend: +12, avatar: '🧙' },
            { name: '@dwr.eth', value: '38.7K', trend: +8, avatar: '👨‍💼' },
            { name: '@jessepollak', value: '32.1K', trend: +15, avatar: '🎨' },
            { name: '@balajis.eth', value: '28.9K', trend: -2, avatar: '📊' },
            { name: '@cdixon.eth', value: '24.3K', trend: +5, avatar: '💡' },
          ]}
        />
      </motion.div>
    </motion.div>
  );
};

export default MetricsGrid;
