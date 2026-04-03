import { motion } from 'framer-motion';
import { Zap, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { agents, activityFeed } from '@/data/mockData';
import { useEffect, useState } from 'react';

const CountUp = ({ target, duration = 1.5 }: { target: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <span className="font-mono">{count}</span>;
};

const metrics = [
  { label: 'Tasks Completed', value: 787, icon: CheckCircle2, trend: '+12%' },
  { label: 'Active Agents', value: 2, icon: Zap, trend: '2 of 3' },
  { label: 'Alerts', value: 3, icon: AlertTriangle, trend: '-2 today' },
  { label: 'Avg Response', value: 1.2, icon: Clock, trend: '-0.3s' },
];

const CommandDeck = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="glass-card-hover p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10 glow-emerald">
              <m.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">{m.label}</span>
          </div>
          <p className="text-3xl font-bold text-foreground">
            {Number.isInteger(m.value) ? <CountUp target={m.value} /> : m.value + 's'}
          </p>
          <p className="text-xs text-primary mt-1">{m.trend}</p>
        </motion.div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="lg:col-span-3 glass-card p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h3>
        <ScrollArea className="h-[320px] pr-2">
          <div className="space-y-3">
            {activityFeed.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors"
              >
                <span className="text-lg">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.agent}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="lg:col-span-2 glass-card p-5"
      >
        <h3 className="text-sm font-semibold text-foreground mb-4">Agent Status</h3>
        <div className="space-y-3">
          {agents.map((agent) => (
            <div key={agent.id} className="p-3 rounded-lg bg-secondary/20 flex items-center gap-3">
              <span className={`status-dot-${agent.status}`} />
              <span className="text-lg">{agent.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{agent.name}</p>
                <p className="text-xs text-muted-foreground truncate">{agent.activity}</p>
              </div>
              <span className="text-xs text-muted-foreground">{agent.lastSeen}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default CommandDeck;
