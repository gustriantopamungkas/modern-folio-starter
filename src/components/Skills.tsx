import { Card } from '@/components/ui/card';

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Vue.js", level: 75 },
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 80 },
      { name: "PostgreSQL", level: 75 },
      { name: "MongoDB", level: 70 },
      { name: "Redis", level: 65 },
    ]
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 75 },
      { name: "AWS", level: 70 },
      { name: "Figma", level: 85 },
      { name: "Vercel", level: 80 },
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-hero-gradient bg-clip-text text-transparent">
              Keahlian
            </span>
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg">
            Teknologi dan tools yang saya kuasai dalam pengembangan software
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category) => (
              <Card key={category.title} className="p-6 bg-card-gradient border-border hover:shadow-accent-glow transition-all duration-300">
                <h3 className="text-xl font-bold mb-6 text-center text-foreground">
                  {category.title}
                </h3>
                
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-foreground font-medium">{skill.name}</span>
                        <span className="text-muted-foreground text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-hero-gradient h-2 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Additional Skills Tags */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-6 text-foreground">Teknologi Lainnya</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "GraphQL", "Socket.io", "Jest", "Cypress", "Webpack", "Vite", 
                "Prisma", "Express.js", "Flutter", "React Native", "Firebase", "Supabase"
              ].map((tech) => (
                <span 
                  key={tech} 
                  className="px-4 py-2 bg-muted rounded-full text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;