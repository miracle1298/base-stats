import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sdk } from '@farcaster/miniapp-sdk';
import './ConsistentInteractors.css';

interface Interaction {
  userId: string;
  postId: string;
  type: string;
  createdAt: string;
}

interface UserAggregate {
  userId: string;
  postsCount: number;
  totalInteractions: number;
  lastInteractionAt: string;
  score: number;
}

interface RewardConfig {
  type: 'shoutout' | 'badge' | 'airdrop';
  metadata: any;
}

function ConsistentInteractors() {
  const [userFid, setUserFid] = useState<string | null>(null);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [aggregates, setAggregates] = useState<UserAggregate[]>([]);
  const [recipients, setRecipients] = useState<UserAggregate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get user FID when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // In a real implementation, you would get the user's FID from the Farcaster context
        // For now, we'll simulate this
        console.log('Farcaster context:', sdk.context);
        // We'll use a placeholder FID for demonstration
        setUserFid('12345');
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  // Automatically fetch interactions when user data is available
  useEffect(() => {
    if (userFid) {
      handleFetchInteractions();
    }
  }, [userFid]);

  const handleFetchInteractions = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate fetching interactions
      // In a real implementation, you would call the Farcaster API
      const mockInteractions: Interaction[] = [
        { userId: '12345', postId: 'post1', type: 'like', createdAt: new Date().toISOString() },
        { userId: '12345', postId: 'post2', type: 'recast', createdAt: new Date().toISOString() },
        { userId: '12345', postId: 'post3', type: 'reply', createdAt: new Date().toISOString() },
      ];
      
      setInteractions(mockInteractions);
      const aggregated = aggregateInteractions(mockInteractions);
      setAggregates(aggregated);
      const picked = pickRecipients(aggregated);
      setRecipients(picked);
    } catch (err) {
      console.error('Error fetching interactions:', err);
      setError('Failed to fetch interactions');
    } finally {
      setLoading(false);
    }
  };

  const aggregateInteractions = (interactions: Interaction[]): UserAggregate[] => {
    const map = new Map();
    for (const it of interactions) {
      if (!map.has(it.userId)) {
        map.set(it.userId, { 
          userId: it.userId, 
          posts: new Set(), 
          total: 0, 
          lastAt: null 
        });
      }
      const rec = map.get(it.userId);
      rec.posts.add(it.postId);
      rec.total += 1;
      const t = new Date(it.createdAt).getTime();
      if (!rec.lastAt || t > rec.lastAt) rec.lastAt = t;
    }
    
    // Convert posts set to count and lastAt to ISO
    return Array.from(map.values()).map(u => ({
      userId: u.userId,
      postsCount: u.posts.size,
      totalInteractions: u.total,
      lastInteractionAt: new Date(u.lastAt).toISOString(),
      score: 0 // Will be calculated later
    }));
  };

  const computeConsistencyScore = (agg: UserAggregate, options: any = {}) => {
    const { wPosts = 0.6, wTotal = 0.3, recencyHalfLifeDays = 14 } = options;
    
    // Normalize postsCount and totalInteractions by naive caps to avoid runaway values
    const maxPosts = Math.max(agg.postsCount, 1);
    const maxTotal = Math.max(agg.totalInteractions, 1);

    // Recency factor: exponential decay based on lastInteractionAt
    const now = Date.now();
    const ageDays = (now - new Date(agg.lastInteractionAt).getTime()) / (1000 * 60 * 60 * 24);
    const recencyFactor = Math.exp(-Math.log(2) * (ageDays / recencyHalfLifeDays)); // 1 when recent -> decays

    // Raw score
    const score = (wPosts * Math.log(1 + agg.postsCount)) + (wTotal * Math.log(1 + agg.totalInteractions));
    
    // Apply recency
    return score * recencyFactor;
  };

  const pickRecipients = (aggregates: UserAggregate[], rules: any = { mode: 'topN', topN: 10 }) => {
    const scored = aggregates.map(a => ({ 
      ...a, 
      score: computeConsistencyScore(a) 
    }));
    
    scored.sort((x, y) => y.score - x.score);
    
    if (rules.mode === 'topN') {
      return scored.slice(0, rules.topN);
    }
    
    if (rules.mode === 'threshold') {
      return scored.filter(s => s.score >= rules.scoreThreshold);
    }
    
    return [];
  };

  const handleRewardUsers = async () => {
    // In a real implementation, you would integrate with reward systems
    alert('Reward functionality would be implemented here');
  };

  return (
    <div className="consistent-interactors">
      <motion.div 
        className="interactors-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="interactors-header">
          <h2>🎯 Consistent Interactors</h2>
          <p>Identify and reward your most engaged followers</p>
        </div>

        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ⚠️ {error}
          </motion.div>
        )}

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Analyzing interactions...</p>
          </div>
        ) : (
          <>
            {userFid && (
              <div className="user-info">
                <h3>Your FID: {userFid}</h3>
              </div>
            )}

            {aggregates.length > 0 && (
              <div className="results-section">
                <h3>Interaction Analysis</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-value">{aggregates.length}</div>
                    <div className="stat-label">Active Interactors</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">
                      {aggregates.reduce((sum, agg) => sum + agg.totalInteractions, 0)}
                    </div>
                    <div className="stat-label">Total Interactions</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-value">
                      {Math.max(...aggregates.map(a => a.postsCount))}
                    </div>
                    <div className="stat-label">Max Posts Engaged</div>
                  </div>
                </div>

                {recipients.length > 0 && (
                  <div className="recipients-section">
                    <h3>Top Consistent Interactors</h3>
                    <div className="recipients-list">
                      {recipients.map((recipient, index) => (
                        <div key={recipient.userId} className="recipient-item">
                          <div className="recipient-rank">#{index + 1}</div>
                          <div className="recipient-info">
                            <div className="recipient-id">FID: {recipient.userId}</div>
                            <div className="recipient-stats">
                              {recipient.postsCount} posts • {recipient.totalInteractions} interactions
                            </div>
                          </div>
                          <div className="recipient-score">
                            {recipient.score.toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <motion.button
                      className="reward-btn"
                      onClick={handleRewardUsers}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      🎁 Reward Top Interactors
                    </motion.button>
                  </div>
                )}
              </div>
            )}

            {!userFid && !loading && (
              <div className="setup-section">
                <p>Connect your Farcaster account to analyze interactions</p>
                <motion.button
                  className="connect-btn"
                  onClick={handleFetchInteractions}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Analyze My Interactions
                </motion.button>
              </div>
            )}
          </>
        )}
      </motion.div>
    </div>
  );
}

export default ConsistentInteractors;