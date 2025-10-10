import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { dummyIssues, Issue } from '@/data/dummyData';
import { MapPin, Plus, AlertCircle, Clock, CheckCircle2, Wrench } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import InteractiveMap from '@/components/InteractiveMap';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const getStatusIcon = (status: Issue['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <Wrench className="h-4 w-4" />;
      case 'resolved':
        return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400';
      case 'in-progress':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400';
      case 'resolved':
        return 'bg-green-500/10 text-green-700 dark:text-green-400';
    }
  };

  const getSeverityColor = (severity: Issue['severity']) => {
    switch (severity) {
      case 'low':
        return 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
      case 'medium':
        return 'bg-orange-500/10 text-orange-700 dark:text-orange-400';
      case 'high':
        return 'bg-red-500/10 text-red-700 dark:text-red-400';
    }
  };

  const getProgressValue = (status: Issue['status']) => {
    switch (status) {
      case 'pending':
        return 25;
      case 'in-progress':
        return 60;
      case 'resolved':
        return 100;
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Interactive Map Section */}
      <div className="relative h-[500px] md:h-[600px] bg-muted border-b">
        <InteractiveMap 
          issues={dummyIssues} 
          onIssueClick={(issue) => setSelectedIssue(issue)}
        />
      </div>

      {/* Issues List */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Reported Issues</h2>
            <p className="text-muted-foreground">Track and monitor civic issues in your area</p>
          </div>
          <Button onClick={() => navigate('/report')} className="gap-2">
            <Plus className="h-4 w-4" />
            Report Issue
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dummyIssues.map((issue, index) => (
            <Card
              key={issue.id}
              className="cursor-pointer hover:shadow-card-hover transition-all animate-slide-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setSelectedIssue(issue)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{issue.title}</CardTitle>
                  <Badge className={getSeverityColor(issue.severity)} variant="secondary">
                    {issue.severity}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {issue.location}
                </div>

                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(issue.status)} variant="secondary">
                    <span className="flex items-center gap-1">
                      {getStatusIcon(issue.status)}
                      {issue.status}
                    </span>
                  </Badge>
                  <span className="text-xs text-muted-foreground">{issue.reportedAt}</span>
                </div>

                {issue.aiDetection && (
                  <div className="flex items-start gap-2 text-xs bg-accent/50 p-2 rounded">
                    <AlertCircle className="h-3 w-3 mt-0.5 text-accent-foreground" />
                    <span className="text-accent-foreground">{issue.aiDetection}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Issue Detail Modal */}
      <Dialog open={!!selectedIssue} onOpenChange={() => setSelectedIssue(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedIssue?.title}</DialogTitle>
          </DialogHeader>

          {selectedIssue && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge className={getStatusColor(selectedIssue.status)} variant="secondary">
                  {selectedIssue.status}
                </Badge>
                <Badge className={getSeverityColor(selectedIssue.severity)} variant="secondary">
                  {selectedIssue.severity} severity
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Resolution Progress</span>
                  <span className="font-medium">{getProgressValue(selectedIssue.status)}%</span>
                </div>
                <Progress value={getProgressValue(selectedIssue.status)} />
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Description</p>
                <p className="text-sm text-muted-foreground">{selectedIssue.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">{selectedIssue.location}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Reported By</p>
                  <p className="font-medium">{selectedIssue.reportedBy}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedIssue.reportedAt}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <p className="font-medium capitalize">{selectedIssue.type}</p>
                </div>
              </div>

              {selectedIssue.aiDetection && (
                <div className="bg-accent/50 p-3 rounded-lg">
                  <p className="text-sm font-medium mb-1">AI Analysis</p>
                  <p className="text-sm text-accent-foreground">{selectedIssue.aiDetection}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Floating Action Button */}
      <Button
        size="lg"
        className="fixed bottom-6 right-6 rounded-full shadow-lg h-14 w-14 p-0 md:h-auto md:w-auto md:px-6"
        onClick={() => navigate('/report')}
      >
        <Plus className="h-6 w-6 md:mr-2" />
        <span className="hidden md:inline">Report Issue</span>
      </Button>
    </div>
  );
};

export default Dashboard;
