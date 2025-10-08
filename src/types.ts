export interface NetworkSegment {
  id: string;
  name: string;
  cidr: string;
  role: string;
  position_x: number;
  position_y: number;
  color: string;
}

export interface FirewallRule {
  id: string;
  name: string;
  source: string;
  destination: string;
  protocol: 'TCP' | 'UDP' | 'ICMP' | 'ANY';
  port: string;
  action: 'ALLOW' | 'DENY';
  priority: number;
}

export interface NetworkConfiguration {
  segments: NetworkSegment[];
  rules: FirewallRule[];
  exportedAt: string;
}
