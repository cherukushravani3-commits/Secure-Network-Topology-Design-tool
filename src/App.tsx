import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { SegmentManagement } from './components/SegmentManagement';
import { TopologyCanvas } from './components/TopologyCanvas';
import { FirewallRules } from './components/FirewallRules';
import { ExportConfig } from './components/ExportConfig';
import { Toast } from './components/Toast';
import { useNetworkData } from './hooks/useNetworkData';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const {
    segments,
    rules,
    addSegment,
    updateSegment,
    deleteSegment,
    addRule,
    deleteRule,
  } = useNetworkData();

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <Dashboard segments={segments} rules={rules} />
            <div className="px-8 pb-8">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Network Topology Map</h3>
              <TopologyCanvas segments={segments} onUpdatePosition={updateSegment} />
            </div>
          </div>
        );
      case 'segments':
        return (
          <SegmentManagement
            segments={segments}
            onAdd={addSegment}
            onDelete={deleteSegment}
            onUpdate={updateSegment}
            onShowToast={showToast}
          />
        );
      case 'rules':
        return (
          <FirewallRules
            rules={rules}
            onAdd={addRule}
            onDelete={deleteRule}
            onShowToast={showToast}
          />
        );
      case 'export':
        return (
          <ExportConfig
            segments={segments}
            rules={rules}
            onShowToast={showToast}
          />
        );
      default:
        return <Dashboard segments={segments} rules={rules} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
