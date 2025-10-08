import { useState, useEffect } from 'react';
import { NetworkSegment, FirewallRule } from '../types';

const STORAGE_KEY_SEGMENTS = 'network_segments';
const STORAGE_KEY_RULES = 'firewall_rules';

export function useNetworkData() {
  const [segments, setSegments] = useState<NetworkSegment[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_SEGMENTS);
    return stored ? JSON.parse(stored) : [];
  });

  const [rules, setRules] = useState<FirewallRule[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_RULES);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SEGMENTS, JSON.stringify(segments));
  }, [segments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_RULES, JSON.stringify(rules));
  }, [rules]);

  const addSegment = (segment: Omit<NetworkSegment, 'id'>) => {
    const newSegment = {
      ...segment,
      id: crypto.randomUUID(),
    };
    setSegments(prev => [...prev, newSegment]);
    return newSegment;
  };

  const updateSegment = (id: string, updates: Partial<NetworkSegment>) => {
    setSegments(prev =>
      prev.map(seg => (seg.id === id ? { ...seg, ...updates } : seg))
    );
  };

  const deleteSegment = (id: string) => {
    setSegments(prev => prev.filter(seg => seg.id !== id));
  };

  const addRule = (rule: Omit<FirewallRule, 'id'>) => {
    const newRule = {
      ...rule,
      id: crypto.randomUUID(),
    };
    setRules(prev => [...prev, newRule]);
    return newRule;
  };

  const deleteRule = (id: string) => {
    setRules(prev => prev.filter(rule => rule.id !== id));
  };

  return {
    segments,
    rules,
    addSegment,
    updateSegment,
    deleteSegment,
    addRule,
    deleteRule,
  };
}
