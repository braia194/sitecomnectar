import { useMemo } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { BLOG_ARTICLES } from '@/const/blog-articles';
import { WHATSAPP_MESSAGES, getWhatsAppLink } from '@/const/contact';
import NewsletterForm from '@/components/NewsletterForm';
import { Calendar, User, Share2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Streamdown } from 'streamdown';

export default function BlogArticle() {
  const [location, navigate] = useLocation();
  const slug = location.split('/blog/')[1];

  const article = useMemo(() => {
    return BLOG_ARTICLES.find(a => a.slug === slug);
  }, [slug]);

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return BLOG_ARTICLES.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3);
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Artigo não encontrado</h1>
          <Button onClick={() => navigate('/blog')} className="btn-primary">
            Voltar para Blog
          </Button>
        </div>
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/blog/${article.slug}`;
  const shareText = `Leia: ${article.title}`;

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Header */}
      <section className="py-12 bg-gradient-to-b from-card/50 to-background border-b border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Blog
          </button>

          <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-4">
            {article.category}
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">{article.title}</h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {article.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(article.published).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div className="text-sm">{article.views.toLocaleString()} visualizações</div>
          </div>

          {/* Share */}
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-accent transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-accent transition-colors"
            >
              <Share2 className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`${shareText}\n${shareUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-accent transition-colors"
            >
              <Share2 className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Image */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-96 object-cover rounded-2xl"
          />
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-invert max-w-none">
            <Streamdown>{article.content}</Streamdown>
          </div>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20">
            <h3 className="text-2xl font-bold mb-4">Quer implementar essas estratégias?</h3>
            <p className="text-muted-foreground mb-6">
              Nossos especialistas podem ajudar você a aplicar esses conceitos no seu negócio.
            </p>
            <Button
              onClick={() => window.open(getWhatsAppLink(WHATSAPP_MESSAGES.contato), '_blank')}
              className="btn-primary"
            >
              Conversar com Especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-20 bg-card/30 border-t border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-12">Artigos Relacionados</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map(relatedArticle => (
                <a
                  key={relatedArticle.id}
                  href={`/blog/${relatedArticle.slug}`}
                  className="group rounded-2xl overflow-hidden bg-card border border-border hover:border-accent transition-all duration-300 hover:shadow-glow flex flex-col"
                >
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5">
                    <img
                      src={relatedArticle.image}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <span className="inline-block w-fit px-2 py-1 bg-accent/10 text-accent text-xs font-semibold rounded mb-3">
                      {relatedArticle.category}
                    </span>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 flex-grow">
                      {relatedArticle.excerpt}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-4 max-w-2xl">
          <NewsletterForm source="blog-article" />
        </div>
      </section>
    </div>
  );
}
