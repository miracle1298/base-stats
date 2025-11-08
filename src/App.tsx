import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sdk } from '@farcaster/miniapp-sdk';
import './App.css';
import Header from './components/Header';
import AirdropChecker from './components/AirdropChecker';

function App() {
  const [context, setContext] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const initSDK = async () => {
      try {
        const sdkContext = sdk.context;
        setContext(sdkContext);
        console.log('Farcaster SDK Context:', sdkContext);
        
        // Log available capabilities
        console.log('Available SDK actions:', Object.keys(sdk.actions || {}));
        console.log('Available SDK context properties:', Object.keys(sdkContext || {}));
        
        await new Promise(resolve => setTimeout(resolve, 100));
        await sdk.actions.ready();
      } catch (error) {
        console.error('Failed to initialize Farcaster SDK:', error);
      }
    };

    initSDK();
  }, []);

  const handleAutoConnect = async () => {
    try {
      // Use Farcaster's signIn action to connect wallet
      // Generate a random nonce for security
      const nonce = Math.random().toString(36).substring(2, 15);
      const result = await sdk.actions.signIn({ nonce });
      console.log('Sign in result:', result);
      
      // The result contains signature and message, not user data directly
      // We'll need to verify this signature to get user info
      if (result && result.signature) {
        setIsConnected(true);
        // In a real app, you would verify the signature and get user data
        // For now, we'll just set a flag that we're connected
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  return (
    <div 
      className="app"
      style={{
        marginTop: context?.client?.safeAreaInsets?.top || 0,
        marginBottom: context?.client?.safeAreaInsets?.bottom || 0,
        marginLeft: context?.client?.safeAreaInsets?.left || 0,
        marginRight: context?.client?.safeAreaInsets?.right || 0,
      }}
    >
      <Header />
      
      {/* Auto-connect button */}
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <button 
          onClick={handleAutoConnect}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #8A63D2 0%, #0052FF 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          {isConnected ? 'Wallet Connected' : 'Auto-Connect Wallet'}
        </button>
      </div>
      
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AirdropChecker />
      </motion.div>
    </div>
  );
}

export default App;
