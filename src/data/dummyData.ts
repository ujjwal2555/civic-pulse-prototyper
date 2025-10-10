export interface Issue {
  id: string;
  title: string;
  type: 'pothole' | 'lighting' | 'waste' | 'other';
  location: string;
  lat: number;
  lng: number;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  severity: 'low' | 'medium' | 'high';
  reportedBy: string;
  reportedAt: string;
  photo?: string;
  aiDetection?: string;
}

export const dummyIssues: Issue[] = [
  {
    id: '1',
    title: 'Large pothole near school',
    type: 'pothole',
    location: 'Central Avenue, Zone 3',
    lat: 40.7589,
    lng: -73.9851,
    description: 'Deep pothole causing traffic issues near elementary school entrance',
    status: 'in-progress',
    severity: 'high',
    reportedBy: 'Sarah Chen',
    reportedAt: '2024-01-15',
    aiDetection: 'AI detected: Pothole - Severity High',
  },
  {
    id: '2',
    title: 'Streetlight not working',
    type: 'lighting',
    location: 'Park Street & 5th Ave',
    lat: 40.7614,
    lng: -73.9776,
    description: 'Streetlight has been out for 3 days, safety concern',
    status: 'resolved',
    severity: 'medium',
    reportedBy: 'John Smith',
    reportedAt: '2024-01-12',
  },
  {
    id: '3',
    title: 'Overflowing waste bin',
    type: 'waste',
    location: 'Market Square',
    lat: 40.7580,
    lng: -73.9855,
    description: 'Public waste bin overflowing for 2 days',
    status: 'pending',
    severity: 'medium',
    reportedBy: 'Maria Garcia',
    reportedAt: '2024-01-16',
  },
  {
    id: '4',
    title: 'Broken sidewalk tiles',
    type: 'other',
    location: 'Main Street',
    lat: 40.7628,
    lng: -73.9765,
    description: 'Multiple broken tiles creating tripping hazard',
    status: 'pending',
    severity: 'low',
    reportedBy: 'David Lee',
    reportedAt: '2024-01-14',
  },
  {
    id: '5',
    title: 'Damaged traffic sign',
    type: 'other',
    location: 'Highway Exit 12',
    lat: 40.7555,
    lng: -73.9900,
    description: 'Stop sign partially obscured by vandalism',
    status: 'in-progress',
    severity: 'high',
    reportedBy: 'Emily Johnson',
    reportedAt: '2024-01-13',
  },
];

export const statsData = {
  totalReports: 245,
  avgResolutionTime: 2.3,
  resolvedIssues: 2350,
  slaCompliance: 93,
  reportsThisMonth: 48,
};

export const chartData = {
  reportsOverTime: [
    { month: 'Jan', reports: 45 },
    { month: 'Feb', reports: 52 },
    { month: 'Mar', reports: 48 },
    { month: 'Apr', reports: 61 },
    { month: 'May', reports: 55 },
    { month: 'Jun', reports: 67 },
  ],
  issueTypes: [
    { type: 'Potholes', count: 89 },
    { type: 'Lighting', count: 67 },
    { type: 'Waste', count: 54 },
    { type: 'Other', count: 35 },
  ],
};
