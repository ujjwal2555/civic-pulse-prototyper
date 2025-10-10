import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { chartData, statsData } from '@/data/dummyData';
import { BarChart, TrendingUp, PieChart, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

const Analytics = () => {
  const [counters, setCounters] = useState({
    resolved: 0,
    compliance: 0,
  });

  useEffect(() => {
    // Animated counters
    const resolvedInterval = setInterval(() => {
      setCounters(prev => {
        if (prev.resolved < statsData.resolvedIssues) {
          return { ...prev, resolved: prev.resolved + 50 };
        }
        return prev;
      });
    }, 10);

    const complianceInterval = setInterval(() => {
      setCounters(prev => {
        if (prev.compliance < statsData.slaCompliance) {
          return { ...prev, compliance: prev.compliance + 1 };
        }
        return prev;
      });
    }, 30);

    return () => {
      clearInterval(resolvedInterval);
      clearInterval(complianceInterval);
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics & Insights</h1>
          <p className="text-muted-foreground">Track performance and identify trends</p>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-2xl">Issues Resolved</CardTitle>
              <CardDescription>All-time total</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-primary">
                {counters.resolved.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary/10 to-accent/10 border-secondary/20 animate-scale-in" style={{ animationDelay: '100ms' }}>
            <CardHeader>
              <CardTitle className="text-2xl">SLA Compliance</CardTitle>
              <CardDescription>Service level achievement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-secondary">
                {counters.compliance}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle>Reports Over Time</CardTitle>
              </div>
              <CardDescription>Monthly trend analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chartData.reportsOverTime.map((data, index) => (
                  <div key={data.month} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{data.month}</span>
                      <span className="text-muted-foreground">{data.reports} reports</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                        style={{
                          width: `${(data.reports / 70) * 100}%`,
                          transitionDelay: `${index * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                <CardTitle>Issue Types</CardTitle>
              </div>
              <CardDescription>Most common issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chartData.issueTypes.map((data, index) => (
                  <div key={data.type} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{data.type}</span>
                      <span className="text-muted-foreground">{data.count} issues</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-secondary to-accent transition-all duration-1000"
                        style={{
                          width: `${(data.count / 100) * 100}%`,
                          transitionDelay: `${index * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Heatmap */}
        <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <CardTitle>City Hotspots</CardTitle>
            </div>
            <CardDescription>Areas with most reported issues</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 rounded-lg bg-gradient-to-br from-red-500/20 via-orange-500/20 to-yellow-500/20 flex items-center justify-center">
              <div className="text-center space-y-2">
                <MapPin className="h-12 w-12 text-primary mx-auto" />
                <p className="text-lg font-medium">Interactive Heatmap</p>
                <p className="text-sm text-muted-foreground">
                  Visual representation of issue density across city zones
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
