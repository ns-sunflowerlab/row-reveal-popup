
import React, { useState } from 'react';
import StatusCard from '@/components/StatusCard';
import CallLogTable from '@/components/CallLogTable';
import CallDetailModal from '@/components/CallDetailModal';
import { mockCallLogs, CallLog, getCallStats } from '@/types/calls';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'transferred' | 'successful' | 'failed'>('all');
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const callStats = getCallStats(mockCallLogs);

  const handleCallRowClick = (call: CallLog) => {
    setSelectedCall(call);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Logs</h1>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatusCard 
            title="All" 
            count={callStats.all} 
            selected={selectedFilter === 'all'} 
            onClick={() => setSelectedFilter('all')}
          />
          <StatusCard 
            title="Transferred" 
            count={callStats.transferred} 
            selected={selectedFilter === 'transferred'} 
            onClick={() => setSelectedFilter('transferred')}
          />
          <StatusCard 
            title="Successful" 
            count={callStats.successful} 
            selected={selectedFilter === 'successful'} 
            onClick={() => setSelectedFilter('successful')}
          />
          <StatusCard 
            title="Failed" 
            count={callStats.failed} 
            selected={selectedFilter === 'failed'} 
            onClick={() => setSelectedFilter('failed')}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6 items-center">
          <Button variant="outline" size="sm" className="rounded-full flex gap-1.5 items-center">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            Date and Time
          </Button>
          
          <Button variant="outline" size="sm" className="rounded-full flex gap-1.5 items-center">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M7 15h0m5 0h0m5 0h0" />
            </svg>
            Cost
          </Button>
          
          <Button variant="outline" size="sm" className="rounded-full flex gap-1.5 items-center">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call Type
          </Button>
          
          <Button variant="outline" size="sm" className="rounded-full flex gap-1.5 items-center">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Assistant
          </Button>
          
          <Button variant="outline" size="sm" className="rounded-full flex gap-1.5 items-center">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Call ID
          </Button>
          
          <Button variant="outline" size="sm" className="rounded-full flex gap-1.5 items-center">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v18" />
              <path d="M8 6.4A6 6 0 0 1 12 3a6 6 0 0 1 4 3.4" />
              <path d="M16 21a6 6 0 0 1-4-3.4 6 6 0 0 1-4 3.4" />
              <path d="M6 14.5a8 8 0 0 1 0-5" />
              <path d="M18 9.5a8 8 0 0 1 0 5" />
            </svg>
            Success Evaluation
          </Button>
          
          <Button variant="outline" size="sm" className="rounded-full flex gap-1.5 items-center">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Ended Reason
          </Button>
          
          <div className="ml-auto">
            <Button variant="outline" className="flex gap-2 items-center">
              Export to CSV
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Call logs table */}
        <div className="overflow-hidden rounded-md border border-secondary">
          <CallLogTable 
            logs={mockCallLogs} 
            onRowClick={handleCallRowClick}
          />
        </div>

        {/* Call details modal */}
        <CallDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          call={selectedCall}
        />
      </div>
    </div>
  );
};

export default Index;
