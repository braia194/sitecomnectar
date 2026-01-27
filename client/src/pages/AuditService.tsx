import { useState } from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export default function AuditService() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    website: '',
    currentSpend: '',
    mainChallenge: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const createAuditMutation = trpc.leads.createAudit.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createAuditMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        company: formData.company,
        website: formData.website || undefined,
        currentSpend: formData.currentSpend ? parseInt(formData.currentSpend) : undefined,
        mainChallenge: formData.mainChallenge,
      });

      toast.success('Auditoria solicitada com sucesso! Enviaremos o relatório em breve.');
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        company: '',
        website: '',
        currentSpend: '',
        mainChallenge: '',
      });
    } catch (error) {
      toast.error('Erro ao solicitar auditoria. Tente novamente.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <section className="py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Auditoria de Campanhas</h1>
          <p className="text-xl text-muted-foreground max-w-3xl">Análise profunda 360° do seu marketing digital. Gratuita para novos clientes.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">O Que Analisamos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
            {['Google Ads', 'Meta Ads', 'SEO', 'Conversão', 'Público', 'Concorrência'].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
                <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Solicitar Auditoria Gratuita</h2>
            <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-card border border-border">
              <input
                type="text"
                name="name"
                placeholder="Seu nome"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Seu email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              />
              <input
                type="tel"
                name="whatsapp"
                placeholder="WhatsApp (com DDD)"
                value={formData.whatsapp}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              />
              <input
                type="text"
                name="company"
                placeholder="Sua empresa"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              />
              <input
                type="url"
                name="website"
                placeholder="Site da empresa (opcional)"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              />
              <input
                type="number"
                name="currentSpend"
                placeholder="Gasto mensal em marketing (opcional)"
                value={formData.currentSpend}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              />
              <textarea
                name="mainChallenge"
                placeholder="Qual é seu principal desafio em marketing?"
                value={formData.mainChallenge}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent outline-none transition-colors"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? 'Enviando...' : 'Solicitar Auditoria Gratuita'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/30 backdrop-blur">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">100% Gratuita, Sem Compromisso</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Analisaremos sua estratégia de marketing e enviaremos um relatório completo com recomendações personalizadas.</p>
        </div>
      </section>
    </div>
  );
}
