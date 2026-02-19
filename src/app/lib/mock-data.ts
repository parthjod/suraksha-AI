export type WorkerStatus = 'Safe' | 'Warning' | 'Critical';

export interface Worker {
  id: string;
  name: string;
  role: string;
  location: string;
  riskScore: number;
  status: WorkerStatus;
  metrics: {
    heartRate: number;
    oxygenLevel: number;
    gasConcentration: number;
    temperature: number;
  };
  lastSeen: string;
}

export const MOCK_WORKERS: Worker[] = [
  {
    id: 'W001',
    name: 'Ramesh Singh',
    role: 'Sewer Specialist',
    location: 'Sector 4, Manhole A-12',
    riskScore: 88,
    status: 'Critical',
    metrics: {
      heartRate: 112,
      oxygenLevel: 94,
      gasConcentration: 45,
      temperature: 38,
    },
    lastSeen: '2 mins ago',
  },
  {
    id: 'W002',
    name: 'Priya Sharma',
    role: 'Drainage Inspector',
    location: 'Sector 2, Pipeline Main',
    riskScore: 42,
    status: 'Warning',
    metrics: {
      heartRate: 85,
      oxygenLevel: 98,
      gasConcentration: 12,
      temperature: 34,
    },
    lastSeen: 'Just now',
  },
  {
    id: 'W003',
    name: 'Amit Kumar',
    role: 'Cleaning Operative',
    location: 'Sector 7, Street Drain',
    riskScore: 12,
    status: 'Safe',
    metrics: {
      heartRate: 72,
      oxygenLevel: 99,
      gasConcentration: 2,
      temperature: 32,
    },
    lastSeen: '5 mins ago',
  },
  {
    id: 'W004',
    name: 'Deepak Patel',
    role: 'Heavy Machinery Op',
    location: 'Sector 1, Waste Plant',
    riskScore: 25,
    status: 'Safe',
    metrics: {
      heartRate: 78,
      oxygenLevel: 98,
      gasConcentration: 5,
      temperature: 31,
    },
    lastSeen: '1 min ago',
  },
  {
    id: 'W005',
    name: 'Sunita Rao',
    role: 'Field Supervisor',
    location: 'Sector 4, Site Hub',
    riskScore: 5,
    status: 'Safe',
    metrics: {
      heartRate: 70,
      oxygenLevel: 99,
      gasConcentration: 0,
      temperature: 30,
    },
    lastSeen: 'Just now',
  },
];
