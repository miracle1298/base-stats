import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import './AirdropSimulator.css';

const AirdropSimulator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [amount, setAmount] = useState('1000');
  const [showSuccess, setShowSuccess] = useState(false);

  const topUsers = [
    { name: '@vitalik.eth', engagement: '45.2K', avatar: '🧙' },
    { name: '@dwr.eth', engagement: '38.7K', avatar: '👨‍💼' },
    { name: '@jessepollak', engagement: '32.1K', avatar: '🎨' },
    { name: '@balajis.eth', engagement: '28.9K', avatar: '📊' },
    { name: '@cdixon.eth', engagement: '24.3K', avatar: '💡' },
  ];

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#0052FF', '#7C65C1', '#00D395', '#FFB800']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#0052FF', '#7C65C1', '#00D395', '#FFB800']
      });
    }, 250);
  };

  const handleAirdrop = () => {
    if (!selectedUser || !amount) return;
    
    triggerConfetti();
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      setIsOpen(false);
      setSelectedUser('');
      setAmount('1000');
    }, 3500);
  };

  const handleRandomAirdrop = () => {
    const randomUser = topUsers[Math.floor(Math.random() * topUsers.length)];
    const randomAmount = Math.floor(Math.random() * 5000) + 500;
    
    setSelectedUser(randomUser.name);
    setAmount(randomAmount.toString());
    
    setTimeout(() => {
      triggerConfetti();
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        setIsOpen(false);
        setSelectedUser('');
        setAmount('1000');
      }, 3500);
    }, 500);
  };

  return (
    <>
      <motion.button
        className="airdrop-trigger"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(0, 82, 255, 0.3)',
            '0 0 40px rgba(124, 101, 193, 0.5)',
            '0 0 20px rgba(0, 82, 255, 0.3)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        📬 CastCoin Mock Airdrop
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="airdrop-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="airdrop-modal"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {showSuccess ? (
                <motion.div
                  className="success-message"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <div className="success-icon">🎉</div>
                  <h2>Airdrop Successful!</h2>
                  <p>
                    {amount} CastCoins sent to <strong>{selectedUser}</strong>
                  </p>
                  <div className="coins-animation">
                    {[...Array(8)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="coin"
                        initial={{ y: 0, opacity: 1 }}
                        animate={{
                          y: -100,
                          opacity: 0,
                          x: (i - 4) * 20,
                        }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.1,
                          repeat: Infinity,
                        }}
                      >
                        🪙
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="modal-header">
                    <h2>🪂 Mock Airdrop Simulator</h2>
                    <button className="close-btn" onClick={() => setIsOpen(false)}>
                      ✕
                    </button>
                  </div>

                  <div className="modal-body">
                    <div className="form-group">
                      <label>Select Top Caster</label>
                      <div className="user-grid">
                        {topUsers.map((user) => (
                          <motion.button
                            key={user.name}
                            className={`user-btn ${selectedUser === user.name ? 'selected' : ''}`}
                            onClick={() => setSelectedUser(user.name)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <span className="user-avatar">{user.avatar}</span>
                            <div className="user-info">
                              <span className="user-name">{user.name}</span>
                              <span className="user-engagement">{user.engagement}</span>
                            </div>
                            {selectedUser === user.name && (
                              <motion.span
                                className="check-mark"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                              >
                                ✓
                              </motion.span>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Amount (CastCoins)</label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="amount-input"
                        min="1"
                      />
                    </div>

                    <div className="modal-actions">
                      <motion.button
                        className="action-btn primary"
                        onClick={handleAirdrop}
                        disabled={!selectedUser || !amount}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        🚀 Send Airdrop
                      </motion.button>

                      <motion.button
                        className="action-btn secondary"
                        onClick={handleRandomAirdrop}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        🎲 Random Drop
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AirdropSimulator;
