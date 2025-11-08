import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './ChartCard.css';

interface ChartCardProps {
  title: string;
  emoji: string;
  type: 'line' | 'area' | 'bar' | 'comparison';
}

const ChartCard = ({ title, emoji, type }: ChartCardProps) => {
  // Mock data
  const data = [
    { name: 'Mon', value1: 4000, value2: 2400 },
    { name: 'Tue', value1: 3000, value2: 1398 },
    { name: 'Wed', value1: 2000, value2: 9800 },
    { name: 'Thu', value1: 2780, value2: 3908 },
    { name: 'Fri', value1: 1890, value2: 4800 },
    { name: 'Sat', value1: 2390, value2: 3800 },
    { name: 'Sun', value1: 3490, value2: 4300 },
  ];

  const comparisonData = [
    { name: 'W1', spam: 6.5, quality: 93.5 },
    { name: 'W2', spam: 6.2, quality: 93.8 },
    { name: 'W3', spam: 5.9, quality: 94.1 },
    { name: 'W4', spam: 5.8, quality: 94.2 },
  ];

  const renderChart = () => {
    if (type === 'comparison') {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#A0A0B8" style={{ fontSize: '0.8rem' }} />
            <YAxis stroke="#A0A0B8" style={{ fontSize: '0.8rem' }} />
            <Tooltip 
              contentStyle={{ 
                background: '#1A1B2E', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Area type="monotone" dataKey="quality" stackId="1" stroke="#00D395" fill="#00D395" fillOpacity={0.6} />
            <Area type="monotone" dataKey="spam" stackId="1" stroke="#FF4757" fill="#FF4757" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    if (type === 'area') {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C65C1" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#7C65C1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#A0A0B8" style={{ fontSize: '0.8rem' }} />
            <YAxis stroke="#A0A0B8" style={{ fontSize: '0.8rem' }} />
            <Tooltip 
              contentStyle={{ 
                background: '#1A1B2E', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Area type="monotone" dataKey="value1" stroke="#7C65C1" fillOpacity={1} fill="url(#colorValue)" />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    if (type === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="name" stroke="#A0A0B8" style={{ fontSize: '0.8rem' }} />
            <YAxis stroke="#A0A0B8" style={{ fontSize: '0.8rem' }} />
            <Tooltip 
              contentStyle={{ 
                background: '#1A1B2E', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff'
              }} 
            />
            <Bar dataKey="value1" fill="#0052FF" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    // Line chart (default)
    return (
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="#A0A0B8" style={{ fontSize: '0.8rem' }} />
          <YAxis stroke="#A0A0B8" style={{ fontSize: '0.8rem' }} />
          <Tooltip 
            contentStyle={{ 
              background: '#1A1B2E', 
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              color: '#fff'
            }} 
          />
          <Line type="monotone" dataKey="value1" stroke="#0052FF" strokeWidth={2} dot={{ fill: '#0052FF', r: 4 }} />
          <Line type="monotone" dataKey="value2" stroke="#7C65C1" strokeWidth={2} dot={{ fill: '#7C65C1', r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <motion.div 
      className="chart-card"
      whileHover={{ scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="chart-header">
        <span className="chart-emoji">{emoji}</span>
        <h3 className="chart-title">{title}</h3>
      </div>
      
      <div className="chart-content">
        {renderChart()}
      </div>
    </motion.div>
  );
};

export default ChartCard;
