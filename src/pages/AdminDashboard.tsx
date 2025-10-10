import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { dummyIssues, statsData, Issue } from '@/data/dummyData';
import { AlertCircle, Clock, CheckCircle2, TrendingUp, Users, Target } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const [issues, setIssues] = useState(dummyIssues);

  const handleStatusChange = (issueId: string, newStatus: Issue['status']) => {
    setIssues(prev =>
      prev.map(issue =>
        issue.id === issueId ? { ...issue, status: newStatus } : issue
      )
    );
    toast.success('Issue status updated');
  };

  const getStatusColor = (status: Issue['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20';
      case 'in-progress':
        return 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20';
      case 'resolved':
        return 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20';
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

  const pendingIssues = issues.filter(i => i.status === 'pending');
  const inProgressIssues = issues.filter(i => i.status === 'in-progress');
  const resolvedIssues = issues.filter(i => i.status === 'resolved');

  const IssueCard = ({ issue }: { issue: Issue }) => (
    <Card className="hover:shadow-card-hover transition-all">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{issue.title}</CardTitle>
          <Badge className={getSeverityColor(issue.severity)} variant="secondary">
            {issue.severity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">{issue.description}</p>
        <div className="text-xs text-muted-foreground">
          <p>📍 {issue.location}</p>
          <p>👤 {issue.reportedBy}</p>
          <p>📅 {issue.reportedAt}</p>
        </div>
        <Select
          value={issue.status}
          onValueChange={(value) => handleStatusChange(issue.id, value as Issue['status'])}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage and track civic issues across the city</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="animate-fade-in">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Reports
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statsData.totalReports}</div>
              <p className="text-xs text-muted-foreground mt-1">
                +{statsData.reportsThisMonth} this month
              </p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg Resolution Time
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statsData.avgResolutionTime}</div>
              <p className="text-xs text-muted-foreground mt-1">days</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Issues Resolved
                </CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statsData.resolvedIssues}</div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  SLA Compliance
                </CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statsData.slaCompliance}%</div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">On target</p>
            </CardContent>
          </Card>
        </div>

        {/* Issues Management */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending" className="gap-2">
              <Badge variant="secondary" className={getStatusColor('pending')}>
                {pendingIssues.length}
              </Badge>
              Pending
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="gap-2">
              <Badge variant="secondary" className={getStatusColor('in-progress')}>
                {inProgressIssues.length}
              </Badge>
              In Progress
            </TabsTrigger>
            <TabsTrigger value="resolved" className="gap-2">
              <Badge variant="secondary" className={getStatusColor('resolved')}>
                {resolvedIssues.length}
              </Badge>
              Resolved
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingIssues.map((issue, index) => (
                <div
                  key={issue.id}
                  className="animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <IssueCard issue={issue} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressIssues.map((issue, index) => (
                <div
                  key={issue.id}
                  className="animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <IssueCard issue={issue} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resolvedIssues.map((issue, index) => (
                <div
                  key={issue.id}
                  className="animate-slide-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <IssueCard issue={issue} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
