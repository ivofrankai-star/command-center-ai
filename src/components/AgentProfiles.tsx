import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { agents } from '@/data/mockData';

const AgentProfiles = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {agents.map((agent, i) => (
      <motion.div
        key={agent.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: i * 0.1 }}
        className="glass-card-hover p-6 flex flex-col"
        style={{ borderTopColor: agent.accentColor, borderTopWidth: 2 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{agent.emoji}</span>
          <div>
            <h3 className="font-semibold text-foreground">{agent.name}</h3>
            <p className="text-sm text-muted-foreground">{agent.role}</p>
          </div>
          <span className={`ml-auto status-dot-${agent.status}`} />
        </div>
        <div className="space-y-3 flex-1">
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">{agent.type}</Badge>
            <Badge variant="outline" className="text-xs capitalize">{agent.status}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-2 rounded-lg bg-secondary/20 text-center">
              <p className="text-lg font-bold font-mono text-foreground">{agent.tasksCompleted}</p>
              <p className="text-xs text-muted-foreground">Tasks Done</p>
            </div>
            <div className="p-2 rounded-lg bg-secondary/20 text-center">
              <p className="text-lg font-bold font-mono text-foreground">{agent.accuracy}%</p>
              <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {agent.skills.map((s) => (
              <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{s}</span>
            ))}
          </div>
        </div>
        <Button variant="outline" className="mt-4 w-full border-primary/20 text-primary hover:bg-primary/10">View Details</Button>
      </motion.div>
    ))}
  </div>
);

export default AgentProfiles;
