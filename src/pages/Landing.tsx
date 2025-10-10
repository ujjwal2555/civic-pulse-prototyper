import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Map, Brain, Eye, TrendingUp, Camera, MapPin, CheckCircle2, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-city.jpg';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Map,
      title: 'Real-time Map',
      description: 'Interactive map showing all reported issues in your city',
    },
    {
      icon: Brain,
      title: 'Smart Classification',
      description: 'AI-powered automatic categorization and severity detection',
    },
    {
      icon: Eye,
      title: 'Community Transparency',
      description: 'Track issue status and resolution progress publicly',
    },
    {
      icon: TrendingUp,
      title: 'Predictive Insights',
      description: 'Analytics to predict and prevent future infrastructure issues',
    },
  ];

  const steps = [
    { icon: Camera, title: 'Report', description: 'Snap a photo of the issue' },
    { icon: Bell, title: 'Review', description: 'City staff receives notification' },
    { icon: MapPin, title: 'Resolve', description: 'Team dispatched to location' },
    { icon: CheckCircle2, title: 'Verify', description: 'Issue marked as resolved' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(6, 182, 212, 0.8)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center text-white animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Empower Your City
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Report Issues in Seconds
            </p>
            <p className="text-lg mb-10 text-white/80 max-w-2xl mx-auto">
              CivicConnect bridges the gap between citizens and local government, making it easier than ever to report and resolve civic issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8"
                onClick={() => navigate('/report')}
              >
                Report an Issue
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-white/10 text-white border-white hover:bg-white hover:text-primary"
                onClick={() => navigate('/dashboard')}
              >
                View Map
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Modern Cities
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with cutting-edge technology to make civic engagement seamless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-card-hover transition-all duration-300 animate-scale-in border-border"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 inline-flex p-4 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Four simple steps to make your city better
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-4 inline-flex p-6 rounded-full bg-secondary/20 text-secondary">
                  <step.icon className="h-10 w-10" />
                </div>
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of citizens making their communities better, one report at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8"
                onClick={() => navigate('/login?role=citizen')}
              >
                Citizen Login
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
                onClick={() => navigate('/login?role=admin')}
              >
                Admin Login
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
