import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

const About = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4">About CivicConnect</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering citizens and governments to collaborate for smarter, safer, and cleaner cities
          </p>
        </div>

        <div className="space-y-8">
          <Card className="animate-slide-in">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                CivicConnect was created to bridge the gap between citizens and local governments.
                We believe that effective civic engagement starts with accessible, transparent communication.
              </p>
              <p>
                Our platform enables residents to report infrastructure issues quickly and easily,
                while providing municipal staff with the tools to manage and resolve these issues efficiently.
                Through AI-powered categorization, real-time tracking, and comprehensive analytics,
                we're transforming how cities respond to community needs.
              </p>
            </CardContent>
          </Card>

          <Card className="animate-slide-in" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">For Citizens</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Quick photo-based reporting</li>
                    <li>• GPS location tagging</li>
                    <li>• Real-time status updates</li>
                    <li>• Voice input support</li>
                    <li>• Interactive issue map</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold">For Administrators</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Centralized dashboard</li>
                    <li>• Status management</li>
                    <li>• Priority assignment</li>
                    <li>• Performance analytics</li>
                    <li>• Predictive insights</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-slide-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Email</p>
                    <p className="text-sm text-muted-foreground">support@civicconnect.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Phone</p>
                    <p className="text-sm text-muted-foreground">1-800-CIVIC-HELP</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Address</p>
                    <p className="text-sm text-muted-foreground">City Hall, Downtown</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
