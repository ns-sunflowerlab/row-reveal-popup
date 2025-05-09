import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

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

interface OutboundCallDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  call: OutboundCallLog | null;
}

const OutboundCallDetailModal: React.FC<OutboundCallDetailModalProps> = ({ isOpen, onClose, call }) => {
  if (!call) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-6 bg-background border-l border-secondary">
        <h2 className="text-lg font-semibold mb-4">Outbound Call Details</h2>
        <div className="space-y-4">
          <div>
            <strong>Claim Number:</strong> {call.claim_number}
          </div>
          <div>
            <strong>Phone:</strong> {call.phone}
          </div>
          <div>
            <strong>Batch ID:</strong> {call.batch_id}
          </div>
          <div>
            <strong>Line Status:</strong> {call.line_status}
          </div>
          <div>
            <strong>Created At:</strong>{' '}
            {new Date(call.created_at).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </div>
          <div>
            <strong>Call Status:</strong> {call.call_status}
          </div>
          {call.call_end_reason && (
            <div>
              <strong>Call End Reason:</strong> {call.call_end_reason}
            </div>
          )}
          {call.call_recording_link && (
            <div>
              <strong>Recording:</strong>{' '}
              <a href={call.call_recording_link} target="_blank" rel="noopener noreferrer">
                Listen
              </a>
            </div>
          )}
          {call.summary && (
            <div>
              <strong>Summary:</strong> {call.summary}
            </div>
          )}
          {call.transcript && (
            <div>
              <strong>Transcript:</strong> {call.transcript}
            </div>
          )}
          {call.call_seconds && (
            <div>
              <strong>Duration:</strong> {call.call_seconds}s
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutboundCallDetailModal;