import React, { useState, useEffect } from 'react';
import StatusCard from '@/components/StatusCard';
import OutboundCallLogTable from '@/components/OutboundCallLogTable';
import OutboundCallDetailModal from '@/components/OutboundCallDetailModal';
import { Button } from '@/components/ui/button';
import axios from 'axios';

interface OutboundCallLog {
  _id: string;
  claim_number: string;
  phone: string;
  batch_id: string;
  created_at: string;
  line_status: string;
  call_end_reason?: string;
  call_recording_link?: string;
  call_status: string;
  call_id?: string;
  summary?: string;
  transcript?: string;
  call_seconds?: string;
}

const OutboundCalls = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'successful' | 'failed'>('all');
  const [selectedCall, setSelectedCall] = useState<OutboundCallLog | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [callLogs, setCallLogs] = useState<OutboundCallLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [tenantId, setTenantId] = useState(6);

  // Fetch outbound call logs from the API
  const fetchOutboundCallLogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://voiceassistant.demo.zinniax.com/getOutboundCallDetails`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );

      if (response.data && Array.isArray(response.data.outboundCallDetails)) {
        const apiData = response.data.outboundCallDetails.map((call: any) => ({
          _id: call._id,
          claim_number: call.claim_number,
          phone: call.phone,
          batch_id: call.batch_id,
          created_at: call.created_at,
          line_status: call.line_status,
          call_end_reason: call.call_end_reason || 'N/A',
          call_recording_link: call.call_recording_link || null,
          call_status: call.call_status || 'pending',
          call_id: call.call_id || 'N/A',
          summary: call.summary || 'N/A',
          transcript: call.transcript || 'N/A',
          call_seconds: call.call_seconds || '0',
          total_calls : call.total_calls || '0',
          success_calls : call.success_calls || '0',
          pending_calls : call.pending_calls || '0',
          failed_calls: call.failed_calls || '0',
        }));
        setCallLogs(apiData);
        setTotalPages(Math.ceil(response.data.totalCount / response.data.pageSize));
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (error) {
      console.error('Error fetching outbound call logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutboundCallLogs();
  }, [currentPage, rowsPerPage]);

  const handleCallRowClick = (call: OutboundCallLog) => {
    setSelectedCall(call);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Claim Status Call Results</h1>

        {/* Stats cards */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatusCard 
            title="All" 
            count={callLogs.length} 
            selected={selectedFilter === 'all'} 
            onClick={() => setSelectedFilter('all')}
          />
          <StatusCard 
            title="Successful" 
            count={callLogs.filter((log) => log.call_status === 'success').length} 
            selected={selectedFilter === 'successful'} 
            onClick={() => setSelectedFilter('successful')}
          />
          <StatusCard 
            title="Failed" 
            count={callLogs.filter((log) => log.call_status === 'failed').length} 
            selected={selectedFilter === 'failed'} 
            onClick={() => setSelectedFilter('failed')}
          />
        </div> */}

        {/* Call logs table */}
        <div className="overflow-hidden rounded-md border border-secondary">
          <OutboundCallLogTable 
            logs={callLogs} 
            onRowClick={handleCallRowClick}
          />
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-secondary text-white rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-secondary text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Call details modal */}
        <OutboundCallDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          call={selectedCall}
        />
      </div>
    </div>
  );
};

export default OutboundCalls;