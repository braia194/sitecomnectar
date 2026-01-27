import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Music, BarChart3, Zap } from 'lucide-react';
import { WHATSAPP_MESSAGES, getWhatsAppLink } from '@/const/contact';
import { useLocation } from 'wouter';
import AILab from '@/components/AILab';

export default function Home() {
  const [, navigate] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [counters, setCounters] = useState({
    revenue: 0,
    roi: 0,
    years: 0,
    leads: 0,
  });

  // Animated particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(8, 20, 87, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(250, 68, 46, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(250, 68, 46, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Counter animations
  useEffect(() => {
    const targets = { revenue: 2300000, roi: 280, years: 12, leads: 1250 };
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCounters({
        revenue: Math.floor(targets.revenue * progress),
        roi: Math.floor(targets.roi * progress),
        years: Math.floor(targets.years * progress),
        leads: Math.floor(targets.leads * progress),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />

        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Transformamos <span className="text-gradient">Dados em Resultados</span> Reais
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Marketing digital orientado por dados, não por achismos. Tráfego pago, gestão de redes sociais e estratégias que comprovam ROI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button onClick={() => window.open(getWhatsAppLink(WHATSAPP_MESSAGES.auditoria), '_blank')} className="btn-primary text-lg h-14 animate-pulse-glow">
                Auditar Meu Tráfego Grátis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button onClick={() => navigate('/portfolio')} className="btn-secondary text-lg h-14">
                Ver Cases de Sucesso
              </Button>
            </div>

            {/* Animated Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
              <div className="p-6 rounded-lg bg-card/50 backdrop-blur border border-border">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  R$ {(counters.revenue / 1000000).toFixed(1)}M
                </div>
                <p className="text-sm text-muted-foreground">Gerados para clientes</p>
              </div>

              <div className="p-6 rounded-lg bg-card/50 backdrop-blur border border-border">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  {counters.roi}%
                </div>
                <p className="text-sm text-muted-foreground">ROI médio</p>
              </div>

              <div className="p-6 rounded-lg bg-card/50 backdrop-blur border border-border">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  {counters.years}+
                </div>
                <p className="text-sm text-muted-foreground">Anos de experiência</p>
              </div>

              <div className="p-6 rounded-lg bg-card/50 backdrop-blur border border-border">
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  {counters.leads.toLocaleString()}
                </div>
                <p className="text-sm text-muted-foreground">Leads hoje</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Lab Section */}
      <AILab />

      {/* Live Stats Section */}
      <section className="py-20 bg-card/30 backdrop-blur">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Métricas em Tempo Real</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Taxa de Conversão', value: '8,5%', icon: '📊' },
              { label: 'CTR Médio', value: '4,2%', icon: '🎯' },
              { label: 'CPC Médio', value: 'R$ 0,85', icon: '💰' },
              { label: 'ROAS Médio', value: '12,3x', icon: '📈' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-card border border-border hover:border-accent transition-all duration-300 hover:shadow-glow group cursor-pointer"
              >
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
                <p className="text-muted-foreground">{stat.label}</p>
                <div className="mt-4 h-1 bg-border rounded-full group-hover:bg-accent transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Nossos Serviços</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Soluções completas de marketing digital com foco em performance e resultados mensuráveis
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: 'Gestão de Tráfego Pago',
                description: 'Google Ads + Meta Ads',
                tag: 'ROI médio: 280%',
              },
              {
                icon: Music,
                title: 'Gestão de Instagram',
                description: 'Crescimento orgânico + conteúdo',
                tag: 'Engajamento +340%',
              },
              {
                icon: BarChart3,
                title: 'Auditoria de Campanhas',
                description: 'Análise profunda 360°',
                tag: 'Gratuita para novos',
              },
              {
                icon: Zap,
                title: 'Estratégia Data-Driven',
                description: 'Decisões baseadas em dados',
                tag: 'Otimização contínua',
              },
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-card border border-border card-hover group"
                >
                  <Icon className="w-12 h-12 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">{service.description}</p>
                  <div className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold">
                    {service.tag}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-card/30 backdrop-blur">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">O Que Nossos Clientes Dizem</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Robson Ramos',
                company: 'CEO na Robscar Oficina',
                text: 'Patrick foi um cliente que veio em minha oficina e me apresentou a Agência Comnectar, que foi capaz de colocar minha empresa no radar com o Google Meu Negócio, onde trouxe clientes até de outros estados.',
                rating: 5,
              },
              {
                name: 'Caio de Medeiros',
                company: 'Founder/CEO no Miramar Surf Camp',
                text: 'A Agência Comnectar ajudou muito a estruturar a presença digital para o Miramar Surf Camp, trouxe novos hóspedes e sempre com uma entrega impecável! Recomendo demais!',
                rating: 5,
              },
              {
                name: 'Michele Naili',
                company: 'Deputada Federal no Partido Novo',
                text: 'A Agência Comnectar me auxiliou na criação da estratégia da campanha como candidata a Deputada Federal pelo Partido NOVO, superando em 35% a previsão inicial de votos!',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-card border border-border hover:border-accent transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-accent text-xl">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Pronto para Multiplicar Seus Resultados?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Comece com uma análise gratuita do seu tráfego e descubra o potencial real do seu negócio
          </p>
          <Button className="bg-white text-accent hover:bg-white/90 text-lg h-14 px-8">
            Começar Agora - Análise Gratuita
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
