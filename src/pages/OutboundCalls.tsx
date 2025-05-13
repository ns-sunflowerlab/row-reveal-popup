import React, { useState, useEffect } from 'react';
import OutboundCallDetailModal from '@/components/OutboundCallDetailModal';
import Loader from '@/components/ui/loader';
import axios from 'axios';

interface OutboundCallDocument {
  id: string;
  claim_number: string;
  phone: string;
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

interface OutboundCallBatch {
  batch_id: string;
  total_calls: number;
  success_calls: number;
  pending_calls: number;
  failed_calls: number;
  documents: OutboundCallDocument[];
}

const OutboundCalls = () => {
  const [batches, setBatches] = useState<OutboundCallBatch[]>([]);
  const [expandedBatchId, setExpandedBatchId] = useState<string | null>(null);
  const [selectedCall, setSelectedCall] = useState<OutboundCallDocument | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch outbound call logs from the API
  const fetchOutboundCallLogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:8002/getOutboundCallDetails?page=${currentPage}&page_size=20`);

      if (response.data && response.data.outboundCallDetails) {
        const { total_documents, batches } = response.data.outboundCallDetails;
        setBatches(batches);
        setTotalPages(Math.ceil(total_documents / 20));
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (error) {
      console.error('Error fetching outbound call logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOutboundCallLogs();
  }, [currentPage]);

  const toggleBatchExpansion = (batchId: string) => {
    setExpandedBatchId((prev) => (prev === batchId ? null : batchId));
  };

  const handleCallRowClick = (call: OutboundCallDocument) => {
    setSelectedCall(call);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Outbound Call Batches</h1>

        {isLoading && <Loader />}
        {!isLoading && batches.length > 0 && (
          <div className="rounded-md overflow-hidden border border-secondary">
            <table className="table-auto w-full text-left">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="px-4 py-2">Batch ID</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Claims</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="font-semibold">
                {batches.map((batch) => (
                  <React.Fragment key={batch.batch_id}>
                    <tr
                      className="border-b cursor-pointer hover:bg-secondary/10 transition-colors"
                      onClick={() => toggleBatchExpansion(batch.batch_id)}
                    >
                      <td className="px-4 py-2">{batch.batch_id}</td>
                      <td className="px-4 py-2">
                        {batch.documents[0]?.created_at
                          ? new Date(batch.documents[0].created_at).toLocaleString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true,
                            })
                          : 'N/A'}
                      </td>
                      <td className="px-4 py-2">
                        {batch.success_calls} : {batch.pending_calls} : {batch.failed_calls} / {batch.total_calls}
                      </td>
                      <td className="px-4 py-2">{batch.documents[0]?.line_status || 'N/A'}</td>
                    </tr>
                    {expandedBatchId === batch.batch_id && (
                      <tr>
                        <td colSpan={4} className="px-4 py-2 bg-gray-100">
                          <table className="table-auto w-full text-left">
                            <thead className="bg-secondary text-white">
                              <tr>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Phone</th>
                                <th className="px-4 py-2">Claim Number</th>
                                <th className="px-4 py-2">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {batch.documents.map((doc) => (
                                <tr
                                  key={doc.id}
                                  className="hover:bg-secondary/10 cursor-pointer transition-colors"
                                  onClick={() => handleCallRowClick(doc)}
                                >
                                  <td className="px-4 py-2">
                                    {new Date(doc.created_at).toLocaleString('en-US', {
                                      month: 'long',
                                      day: 'numeric',
                                      year: 'numeric',
                                      hour: 'numeric',
                                      minute: '2-digit',
                                      hour12: true,
                                    })}
                                  </td>
                                  <td className="px-4 py-2">{doc.phone}</td>
                                  <td className="px-4 py-2">{doc.claim_number || 'N/A'}</td>
                                  <td className="px-4 py-2">{doc.line_status || 'N/A'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

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