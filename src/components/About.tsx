import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, Code, Palette, Rocket } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-hero-gradient bg-clip-text text-transparent">
              Tentang Saya
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Mengenal lebih dekat perjalanan dan passion saya dalam dunia teknologi
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                Halo! Saya John Developer
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Saya adalah seorang Full-Stack Developer dengan pengalaman 3+ tahun dalam 
                mengembangkan aplikasi web dan mobile. Passion saya terletak pada pembuatan 
                produk digital yang tidak hanya fungsional, tetapi juga memberikan pengalaman 
                pengguna yang luar biasa.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Saya senang mempelajari teknologi terbaru dan selalu mencari cara untuk 
                meningkatkan kualitas kode serta efisiensi dalam pengembangan. 
                Mari berkolaborasi untuk mewujudkan ide-ide inovatif!
              </p>
              
              <Button className="bg-hero-gradient hover:opacity-90 text-white px-6 py-3">
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-card-gradient border-border hover:shadow-accent-glow transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                    <Code className="text-primary" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold">Development</h4>
                </div>
                <p className="text-muted-foreground">
                  Pengembangan aplikasi web dan mobile dengan teknologi modern
                </p>
              </Card>

              <Card className="p-6 bg-card-gradient border-border hover:shadow-accent-glow transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mr-4">
                    <Palette className="text-accent" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold">UI/UX Design</h4>
                </div>
                <p className="text-muted-foreground">
                  Desain antarmuka yang intuitif dan pengalaman pengguna yang optimal
                </p>
              </Card>

              <Card className="p-6 bg-card-gradient border-border hover:shadow-accent-glow transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mr-4">
                    <Rocket className="text-primary" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold">Innovation</h4>
                </div>
                <p className="text-muted-foreground">
                  Solusi kreatif dan inovatif untuk tantangan teknologi kompleks
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;