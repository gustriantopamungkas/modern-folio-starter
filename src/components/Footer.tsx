import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold bg-hero-gradient bg-clip-text text-transparent mb-4">
                John Developer
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Full-Stack Developer yang passionate dalam menciptakan 
                solusi digital inovatif dan pengalaman pengguna yang luar biasa.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
              <nav className="space-y-2">
                {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      const element = document.getElementById(item.toLowerCase());
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Hubungi Saya</h4>
              <div className="space-y-2 text-muted-foreground">
                <p>Jakarta, Indonesia</p>
                <a href="mailto:john@example.com" className="hover:text-primary transition-colors">
                  john@example.com
                </a>
                <a href="tel:+6281234567890" className="hover:text-primary transition-colors">
                  +62 812 3456 7890
                </a>
              </div>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:john@example.com"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>

            <div className="flex items-center text-muted-foreground">
              <span>© {currentYear} Made with</span>
              <Heart className="mx-1 text-red-500" size={16} fill="currentColor" />
              <span>by John Developer</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;