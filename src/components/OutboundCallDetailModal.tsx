import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Calendar, FileText, Headphones, Info, Phone } from 'lucide-react';
import React from 'react';

export interface OutboundCallLog {
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
  call?: OutboundCallLog;
}

const OutboundCallDetailModal: React.FC<OutboundCallDetailModalProps> = ({ isOpen, onClose, call }) => {
  if (!call) return null;

  // Function to render the status badge with the right color
  const renderStatusBadge = (status: string) => {
    let variant = 'outline';

    switch (status.toLowerCase()) {
      case 'pending':
        variant = 'secondary';
        break;
      case 'completed':
        variant = 'success';
        break;
      case 'failed':
        variant = 'destructive';
        break;
      default:
        variant = 'outline';
    }

    return <Badge className="ml-2 capitalize">{status}</Badge>;
  };

  // Format the date for display
  const formattedDate = new Date(call.created_at).toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  // Format seconds to minutes:seconds format
  const formatDuration = (seconds?: string) => {
    if (!seconds) return 'N/A';
    const secs = parseInt(seconds);
    if (isNaN(secs)) return 'N/A';

    if (secs < 60) return `${secs}s`;
    const minutes = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${minutes}m ${remainingSecs}s`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="fixed right-0 inset-y-0 max-w-2xl w-full bg-background shadow-xl z-50 animate-none translate-y-0 overflow-y-auto">
        <div className="items-center gap-2 pb-2">
          <DialogHeader className="pt-3 border-b-2 border-primary mb-4">
            <h2 className="text-lg font-semibold mb-4">Outbound Call Details</h2>
          </DialogHeader>
          <div className="flex items-center">
            <Info className="h-5 w-5 mr-2" />
            <h2 className="text-lg font-semibold">Claim {call.claim_number}</h2>
            {renderStatusBadge(call.call_status)}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-6">
            {/* Primary Information */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Primary Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-2 text-sm">
                    <Phone className="h-4 w-4 mt-0.5 " />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="">{call.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 text-sm">
                    <Calendar className="h-4 w-4 mt-0.5 " />
                    <div>
                      <p className="font-medium">Created At</p>
                      <p className="">
                        {new Date(call.created_at).toLocaleString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 text-sm">
                    <FileText className="h-4 w-4 mt-0.5 " />
                    <div>
                      <p className="font-medium">Line Status</p>
                      <p className="">{call.line_status}</p>
                    </div>
                  </div>

                  {call.call_recording_link && (
                    <div className="flex items-start space-x-2 text-sm">
                      <Headphones className="h-4 w-4 mt-0.5 " />
                      <div>
                        <p className="font-medium">Recording</p>
                        <a
                          href={call.call_recording_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Listen to call
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-2" />

              {/* Call Details */}
              <div>
                <h3 className="text-sm font-medium mb-2">Call Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Call Status</p>
                    <p className="">{call.call_status}</p>
                  </div>
                  <div>
                    <p className="font-medium">Call End Reason</p>
                    <p className="">{call.call_end_reason ? call.call_end_reason : '—'}</p>
                  </div>
                  {call.call_id && (
                    <div>
                      <p className="font-medium">Call ID</p>
                      <p className=" text-xs">{call.call_id}</p>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-2" />

              {/* Technical Details */}
              <div>
                <h3 className="text-sm font-medium mb-2">Technical Details</h3>
                <div className="text-sm">
                  <p className="font-medium">Batch ID</p>
                  <p className=" text-xs break-all">{call.batch_id}</p>
                </div>
              </div>

              {/* Content Section with Summary & Transcript */}
              {(call.summary || call.transcript) && (
                <>
                  <Separator className="my-2" />
                  <div>
                    <h3 className="text-sm font-medium mb-2">Content</h3>

                    {call.summary && (
                      <div className="mb-4">
                        <p className="font-medium text-sm">Summary</p>
                        <p className=" text-sm mt-1 bg-muted p-3 rounded-md">{call.summary}</p>
                      </div>
                    )}

                    {call.transcript && (
                      <div>
                        <p className="font-medium text-sm">Transcript</p>
                        <div className=" text-sm mt-1 max-h-60 overflow-y-auto bg-muted p-3 rounded-md">{call.transcript}</div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutboundCallDetailModal;
