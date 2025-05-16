import CallBadge from '@/components/CallBadge';
import OutboundCallBatchDetail from '@/components/OutboundCallBatchDetail';
import { OutboundCallLogDTO } from '@/components/OutboundCallDetailModal';
import Loader from '@/components/ui/loader';
import axios from 'axios';
import { CircleCheckBig, CircleX, Clock4 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export interface OutboundCallBatch {
  batch_id: string;
  total_calls: number;
  success_calls: number;
  pending_calls: number;
  failed_calls: number;
  documents: OutboundCallLogDTO[];
}

const OutboundCalls = () => {
  const [batches, setBatches] = useState<OutboundCallBatch[]>([]);
  const [batchDetail, setBatchDetail] = useState<OutboundCallBatch | null>(null);
  const [selectedCall, setSelectedCall] = useState<OutboundCallLogDTO | null>(null);
  const [callLogs, setCallLogs] = useState<OutboundCallLogDTO[] | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCallLogModalOpen, setIsCallLogModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch outbound call logs from the API
  const fetchOutboundCallLogs = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://frankly-modern-jackal.ngrok-free.app/getOutboundCallDetails?page=${currentPage}&page_size=20`,
         {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        }
      );

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

  const toggleBatchExpansion = (batch: OutboundCallBatch, logs?: OutboundCallLogDTO[]) => {
    setIsCallLogModalOpen(true);
    setBatchDetail(batch);
    logs ? setCallLogs(logs) : '';
  };

  const closeCallLogModal = () => {
    setIsCallLogModalOpen(false);
    setBatchDetail(null);
  };

  const handleCallRowClick = (call: OutboundCallLogDTO) => {
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
                  <th className="px-2 py-2">Batch ID</th>
                  <th className=" py-2">Date</th>
                  <th className="px-2 py-2">Claims</th>
                  <th className="px-2 py-2">Status</th>
                  <th className="px-2 py-2">Completed Date</th>
                </tr>
              </thead>
              <tbody className="font-semibold">
                {batches.map(batch => (
                  <React.Fragment key={batch.batch_id}>
                    <tr
                      className="border-b cursor-pointer hover:bg-secondary/10 transition-colors"
                      onClick={() => toggleBatchExpansion(batch, batch.documents)}
                    >
                      <td className="px-2 py-2 w-[30%]">{batch.batch_id}</td>
                      <td className=" py-2">
                        {batch.documents[0]?.created_at
                          ? new Date(
                            new Date(batch.documents[0].created_at).getTime() - 4 * 60 * 60 * 1000
                          ).toLocaleString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })
                          : 'N/A'}
                      </td>
                      <td className="py-2">
                        <div className="flex gap-2">
                          <CallBadge variant="success" className="flex items-center px-1">
                            <CircleCheckBig size={12} />: {batch.success_calls}
                          </CallBadge>
                          <CallBadge variant="fail" className="flex items-center px-1">
                            <CircleX size={12} />: {batch.failed_calls}
                          </CallBadge>
                          <CallBadge variant="silence-timeout" className="flex items-center px-1">
                            <Clock4 size={12} />: {batch.pending_calls}
                          </CallBadge>
                        </div>
                        <CallBadge className="px-1">Total: {batch.total_calls}</CallBadge>
                      </td>
                      <td className="px-2 py-2">{batch.documents[0]?.line_status || 'N/A'}</td>
                      <td className="px-2 py-2">
                        {batch.documents[0]?.completed_at
                          ? new Date(
                            new Date(batch.documents[0].completed_at).getTime() - 4 * 60 * 60 * 1000
                          ).toLocaleString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true
                          })
                          : 'N/A'}
                      </td>
                    </tr>
                    {/* {expandedBatchId === batch.batch_id && (
                      <tr>
                        <td colSpan={5} className="px-4 py-2 bg-slate-200">
                          <table className="table-auto border w-full bg-white text-left">
                            <thead className="bg-secondary text-white">
                              <tr>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Phone</th>
                                <th className="px-4 py-2">Claim Number</th>
                                <th className="px-4 py-2">Call Status</th>
                                <th className="px-4 py-2">Claim Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {batch.documents.map(doc => (
                                <tr
                                  key={doc._id}
                                  className="hover:bg-secondary/10 cursor-pointer transition-colors border-b"
                                  onClick={() => handleCallRowClick(doc)}
                                >
                                  <td className="px-4 py-2">
                                    {new Date(doc.created_at).toLocaleString('en-US', {
                                      month: 'long',
                                      day: 'numeric',
                                      year: 'numeric',
                                      hour: 'numeric',
                                      minute: '2-digit',
                                      hour12: true
                                    })}
                                  </td>
                                  <td className="px-4 py-2">{doc.phone}</td>
                                  <td className="px-4 py-2">{doc.claim_number || 'N/A'}</td>
                                  <td className="px-4 py-2">{doc.line_status || 'N/A'}</td>
                                  <td className="px-4 py-2">{doc.claim_status || 'N/A'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )} */}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && batches.length > 0 && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-secondary text-white rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-secondary text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        <OutboundCallBatchDetail isOpen={isCallLogModalOpen} onClose={closeCallLogModal} calls={callLogs} batch={batchDetail} />

        {/* Call details modal */}
      </div>
    </div>
  );
};

export default OutboundCalls;
