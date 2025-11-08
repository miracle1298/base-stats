import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sdk } from '@farcaster/miniapp-sdk';
import './App.css';
import Header from './components/Header';
import AirdropChecker from './components/AirdropChecker';

function App() {
  const [context, setContext] = useState<any>(null);

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