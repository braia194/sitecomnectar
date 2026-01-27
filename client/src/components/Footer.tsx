import { Mail, MessageCircle, Linkedin, Instagram, MapPin } from 'lucide-react';
import { CONTACT_DATA } from '@/const/contact';

export default function Footer() {
  return (
    <footer className="bg-card/50 backdrop-blur border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/logo-comnectar.png" alt="Comnectar" className="h-6 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground">
              Transformando dados em resultados reais para sua agência.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="/sobre" className="hover:text-accent transition-colors">Sobre</a></li>
              <li><a href="/servicos" className="hover:text-accent transition-colors">Serviços</a></li>
              <li><a href="/portfolio" className="hover:text-accent transition-colors">Portfólio</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold mb-4">Serviços</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/servicos/trafego-pago" className="hover:text-accent transition-colors">Tráfego Pago</a></li>
              <li><a href="/servicos/instagram" className="hover:text-accent transition-colors">Instagram</a></li>
              <li><a href="/servicos/auditoria" className="hover:text-accent transition-colors">Auditoria</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contato</h3>
            <div className="space-y-3">
              <a href={`https://wa.me/55${CONTACT_DATA.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a href={`mailto:${CONTACT_DATA.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                <Mail className="w-4 h-4" />
                Email
              </a>
              <a href="#" className="flex items-start gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{CONTACT_DATA.address}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-border pt-8 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2024 Comnectar. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href={CONTACT_DATA.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href={CONTACT_DATA.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
