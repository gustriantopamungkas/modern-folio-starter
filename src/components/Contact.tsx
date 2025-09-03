import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Mail, Linkedin, Github, Send, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih atas pesan Anda. Saya akan segera merespon.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-hero-gradient bg-clip-text text-transparent">
              Hubungi Saya
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Mari berkolaborasi dan wujudkan ide-ide brilian bersama
          </p>

        <div className="max-w-2xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground text-center">
                Mari Terhubung
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed text-center">
                Saya selalu terbuka untuk mendiskusikan proyek baru, ide kreatif, 
                atau peluang kolaborasi. Jangan ragu untuk menghubungi saya!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 justify-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Mail className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-medium text-foreground">Email</p>
                  <a href="mailto:john@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                    john@example.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 justify-center">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <MapPin className="text-accent" size={20} />
                </div>
                <div>
                  <p className="font-medium text-foreground">Lokasi</p>
                  <p className="text-muted-foreground">Jakarta, Indonesia</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 justify-center">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Phone className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-medium text-foreground">Telepon</p>
                  <a href="tel:+6281234567890" className="text-muted-foreground hover:text-primary transition-colors">
                    +62 812 3456 7890
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 text-center">
              <h4 className="font-semibold mb-4 text-foreground">Ikuti Saya</h4>
              <div className="flex space-x-4 justify-center">
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
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;