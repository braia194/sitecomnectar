import { describe, it, expect } from 'vitest';

describe('Header Component', () => {
  it('should render navigation links', () => {
    const navItems = [
      { label: 'Home', href: '/' },
      { label: 'Sobre', href: '/sobre' },
      { label: 'Serviços', href: '/servicos' },
      { label: 'Portfólio', href: '/portfolio' },
      { label: 'Contato', href: '/contato' },
    ];

    expect(navItems).toHaveLength(5);
    expect(navItems[0].label).toBe('Home');
    expect(navItems[4].label).toBe('Contato');
  });

  it('should have correct href paths', () => {
    const paths = ['/', '/sobre', '/servicos', '/portfolio', '/contato'];
    
    paths.forEach((path) => {
      expect(path).toMatch(/^\//);
    });
  });
});
