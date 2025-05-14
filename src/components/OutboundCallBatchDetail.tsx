import { OutboundCallBatch } from '@/pages/OutboundCalls';
import { CircleCheckBig, CircleX, Clock4 } from 'lucide-react';
import React, { useState } from 'react';
import CallBadge from './CallBadge';
import OutboundCallDetailModal, { OutboundCallLogDTO } from './OutboundCallDetailModal';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';

interface OutboundCallBatchDetailType {
  calls?: OutboundCallLogDTO[];
  isOpen: boolean;
  onClose: () => void;
  batch: OutboundCallBatch;
}

const OutboundCallBatchDetail: React.FC<OutboundCallBatchDetailType> = ({ calls, isOpen, onClose, batch }) => {
  const [selectedCall, setSelectedCall] = useState<OutboundCallLogDTO | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleCallRowClick = (call: OutboundCallLogDTO) => {
    setSelectedCall(call);
    setIsDetailModalOpen(true);
  };

  return (
    // <div>
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="fixed right-0 inset-y-0 max-w-4xl w-full bg-background shadow-xl z-50 animate-none translate-y-0 overflow-y-auto">
        <div className="items-center gap-2 pb-2">
          <DialogHeader className="pt-3 border-b-2 border-primary mb-4">
            <h2 className="text-lg font-semibold mb-4">Outbound Batch Detail</h2>
          </DialogHeader>
          <div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Batch Id</p>
                <p className="">{batch?.batch_id}</p>
              </div>
              <div>
                <p className="font-medium">Date</p>
                <p className="">
                  {batch?.documents[0]?.created_at
                    ? new Date(batch?.documents[0].created_at).toLocaleString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      })
                    : 'N/A'}
                </p>
              </div>

              <div>
                <p className="font-medium">Batch Status</p>
                <div className="flex gap-2 my-2">
                  <CallBadge variant="success" className="flex items-center">
                    <CircleCheckBig size={12} />
                    Success: {batch?.success_calls}
                  </CallBadge>
                  <CallBadge variant="fail" className="flex items-center">
                    <CircleX size={12} />
                    Failed: {batch?.failed_calls}
                  </CallBadge>
                  <CallBadge variant="silence-timeout" className="flex items-center">
                    <Clock4 size={12} />
                    Pending: {batch?.pending_calls}
                  </CallBadge>
                </div>
                <CallBadge>Total: {batch?.total_calls}</CallBadge>
              </div>
            </div>
          </div>
          <div className="rounded-md overflow-hidden border border-secondary mt-5">
            <table className="table-auto w-full text-left">
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
                {calls?.length &&
                  calls.map(doc => (
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
          </div>
        </div>
      </DialogContent>
      <OutboundCallDetailModal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} call={selectedCall} />
    </Dialog>
  );
};

export default OutboundCallBatchDetail;
