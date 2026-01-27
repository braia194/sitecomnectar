import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { trackEvent } from '@/hooks/useGA4';
import { Mail, Check, AlertCircle } from 'lucide-react';

interface NewsletterFormProps {
  variant?: 'default' | 'compact' | 'inline';
  source?: string;
}

export default function NewsletterForm({ variant = 'default', source = 'blog' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const mutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: (data) => {
      setStatus('success');
      setMessage(data.message);
      setEmail('');
      setName('');
      trackEvent('newsletter_subscribe', { source });
      setTimeout(() => setStatus('idle'), 5000);
    },
    onError: (error) => {
      setStatus('error');
      setMessage(error.message || 'Erro ao inscrever. Tente novamente.');
      setTimeout(() => setStatus('idle'), 5000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setMessage('Por favor, insira um email válido');
      trackEvent('newsletter_error', { error: 'invalid_email', source });
      return;
    }
    mutation.mutate({ email, name, source });
  };

  const handleNewsletterClick = () => {
    trackEvent('newsletter_form_opened', { variant, source });
  };

  if (variant === 'compact') {
    return (
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="flex-1 px-4 py-2 rounded-lg bg-card border border-border focus:border-accent outline-none text-sm disabled:opacity-50"
        />
        <Button
          onClick={(e) => {
            handleNewsletterClick();
            handleSubmit(e);
          }}
          disabled={status === 'loading'}
          className="btn-primary text-sm"
        >
          {status === 'loading' ? 'Inscrevendo...' : 'Inscrever'}
        </Button>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            className="flex-1 px-4 py-3 rounded-lg bg-card border border-border focus:border-accent outline-none disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={status === 'loading'}
            className="btn-primary"
          >
            {status === 'loading' ? 'Inscrevendo...' : 'Inscrever'}
          </Button>
        </div>
        {message && (
          <div className={`mt-3 flex items-center gap-2 text-sm ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {status === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {message}
          </div>
        )}
      </form>
    );
  }

  return (
    <div className="p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
          <Mail className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Receba conteúdo exclusivo</h3>
          <p className="text-sm text-muted-foreground">Estratégias e insights de marketing direto no seu email</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Seu nome (opcional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={status === 'loading'}
          className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-accent outline-none disabled:opacity-50"
        />

        <input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading'}
          className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-accent outline-none disabled:opacity-50"
          required
        />

        <Button
          type="submit"
          disabled={status === 'loading'}
          className="btn-primary w-full"
        >
          {status === 'loading' ? 'Inscrevendo...' : 'Inscrever na Newsletter'}
        </Button>

        {message && (
          <div className={`flex items-center gap-2 text-sm p-3 rounded-lg ${
            status === 'success'
              ? 'bg-green-500/10 text-green-600'
              : 'bg-red-500/10 text-red-600'
          }`}>
            {status === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {message}
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center">
          Sem spam, apenas conteúdo de valor. Você pode desinscrever-se a qualquer momento.
        </p>
      </form>
    </div>
  );
}
