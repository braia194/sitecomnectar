import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    challenge: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const createLeadMutation = trpc.leads.createLead.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await createLeadMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        company: formData.company,
        challenge: formData.challenge,
      });

      toast.success('Lead capturado com sucesso! Entraremos em contato em breve.');
      setFormData({ name: '', email: '', whatsapp: '', company: '', challenge: '' });
    } catch (error) {
      toast.error('Erro ao capturar lead. Tente novamente.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      <section className="py-20 bg-gradient-to-b from-card/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Comece Sua Transformação</h1>
            <p className="text-xl text-muted-foreground">Vamos conversar sobre como multiplicar seus resultados.</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Entre em Contato</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-accent outline-none transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Seu email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-accent outline-none transition-colors"
                />
                <input
                  type="tel"
                  name="whatsapp"
                  placeholder="WhatsApp (com DDD)"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-accent outline-none transition-colors"
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Sua empresa"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-accent outline-none transition-colors"
                />
                <textarea
                  name="challenge"
                  placeholder="Qual é seu maior desafio em marketing digital?"
                  value={formData.challenge}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-accent outline-none transition-colors"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full"
                >
                  {isLoading ? 'Enviando...' : 'Solicitar Análise Gratuita'}
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-2xl bg-card border border-border">
                <MessageCircle className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
                <p className="text-muted-foreground mb-4">Resposta em até 24h</p>
                <a href="https://wa.me/5522998810032" className="text-accent font-semibold hover:underline">(22) 99881-0032</a>
              </div>

              <div className="p-8 rounded-2xl bg-card border border-border">
                <Mail className="w-8 h-8 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-muted-foreground mb-4">Contato profissional</p>
                <a href="mailto:contato@agenciacomnectar.com.br" className="text-accent font-semibold hover:underline">contato@agenciacomnectar.com.br</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
