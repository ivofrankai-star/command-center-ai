import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const API_URL = 'https://hbjpjbaabyavlruvmkfx.supabase.co/functions/v1/ai-tasks';
const WEBHOOK_SECRET = import.meta.env.VITE_AGENT_COMMAND_WEBHOOK_SECRET || '';

const CopyCard = ({ label, value, placeholder }: { label: string; value: string; placeholder?: string }) => {
  const [copied, setCopied] = useState(false);
  const display = value || placeholder || '';
  const isPlaceholder = !value;

  const handleCopy = () => {
    if (isPlaceholder) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-4 space-y-2">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{label}</p>
      <div className="flex items-center gap-2">
        <code className={`flex-1 text-sm font-mono break-all ${isPlaceholder ? 'text-muted-foreground italic' : 'text-foreground'}`}>
          {display}
        </code>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 h-8 w-8"
          onClick={handleCopy}
          disabled={isPlaceholder}
        >
          {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
        </Button>
      </div>
    </div>
  );
};

const SettingsDialog = ({ open, onOpenChange }: SettingsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-primary/10 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-foreground">Agent Integration Credentials</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Credentials for connecting AI agents to ClawBuddy.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <CopyCard label="Agent Command API URL" value={API_URL} />
          <CopyCard
            label="Agent Command Webhook Secret"
            value={WEBHOOK_SECRET}
            placeholder="Set VITE_AGENT_COMMAND_WEBHOOK_SECRET in .env"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Copy these credentials to onboard new AI agents. Agents use these to create, update, and move tasks via API.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
