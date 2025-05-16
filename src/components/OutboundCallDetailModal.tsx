import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Calendar, FileText, Info, Phone } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export interface OutboundCallLogDTO {
  _id: string;
  claim_number: string;
  phone: string;
  batch_id: string;
  created_at: string;
  completed_at: string;
  line_status: string;
  claim_status: string;
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
  call?: OutboundCallLogDTO;
}

const OutboundCallDetailModal: React.FC<OutboundCallDetailModalProps> = ({ isOpen, onClose, call }) => {
  if (!call) return null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((currentTime / duration) * 100);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const seekTime = (parseFloat(e.target.value) / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
    }
  };

  const formattedTranscript =
    call.transcript && call.transcript !== ''
      ? call.transcript
          .split(/\n|\r|\s{2,}/)
          .filter(line => line.trim() !== '')
          .map((chat: string) => {
            const splited = chat.split(':');
            if (splited[0] === 'AI') {
              return {
                line: splited[1],
                isAI: true,
                isUser: false
              };
            } else {
              return {
                line: splited[1],
                isAI: false,
                isUser: true
              };
            }
          })
      : [];

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

  const renderTranscript = () => {
    return formattedTranscript.map((chat, index) => {
      if (chat.isAI) {
        return (
          <div className="justify-self-end max-w-[25vw]">
            <div className="text-right text-gray text-sm mr-1">Zinniax AI</div>
            <div key={index} className={`p-2 rounded-md ${'bg-secondary/20 text-right'}`}>
              {chat.line}
            </div>
          </div>
        );
      } else {
        return (
          <div className="justify-self-start max-w-[25vw]">
            <div className="text-left text-sm ml-1">User</div>
            <div key={index} className={`p-2 rounded-md ${'bg-success/20 text-left'}`}>
              {chat.line}
            </div>
          </div>
        );
      }
    });
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
                <h3 className="text-md font-medium mb-2">Primary Information</h3>
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
                        {new Date(new Date(call.created_at).getTime() - 4 * 60 * 60 * 1000).toLocaleString('en-US', {
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
                </div>
              </div>

              <Separator className="my-2" />

              {/* Call Details */}
              <div>
                <h3 className="text-md font-medium mb-2">Call Details</h3>
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

              {call.call_recording_link ? (
                <div className="py-2">
                  <div className="pb-4">
                    <div className="flex justify-between mb-4">
                      <h3 className="text-lg font-semibold">Recording</h3>
                    </div>

                    <div className="mb-5">
                      {/* Custom Audio Player */}

                      <div className="flex items-center gap-4">
                        <audio
                          ref={audioRef}
                          src={call.call_recording_link}
                          onTimeUpdate={handleTimeUpdate}
                          onEnded={() => setIsPlaying(false)}
                          className="hidden"
                        ></audio>

                        {/* Play Button */}
                        <button
                          onClick={handlePlay}
                          disabled={isPlaying}
                          className={`p-2 rounded-full transition-colors ${
                            isPlaying ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-500/20 hover:bg-teal-500/30'
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </button>

                        {/* Pause Button */}
                        <button
                          onClick={handlePause}
                          disabled={!isPlaying}
                          className={`p-3 rounded-full transition-colors ${
                            !isPlaying ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500/20 hover:bg-red-500/30'
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="6" y="6" width="12" height="12" />
                          </svg>
                        </button>

                        {/* Progress Bar */}
                        <input type="range" min="0" max="100" value={progress} onChange={handleSeek} className="w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-black">No recording available.</div>
              )}

              {call.summary !== '' || call.transcript !== '' ? (
                <div className="mt-5">
                  <Tabs defaultValue="summary">
                    <div className="w-full">
                      <TabsList className="bg-white mb-4 flex justify-around !w-full border-b-2 border-slate-200 pb-0">
                        <TabsTrigger
                          value="summary"
                          className="text-black data-[state=active]:border-b-2 border-primary flex-grow text-center !w-1/2"
                        >
                          Summary
                        </TabsTrigger>
                        <TabsTrigger
                          value="transcripts"
                          className="text-black data-[state=active]:border-b-2 border-primary flex-grow text-center !w-1/2"
                        >
                          Transcripts
                        </TabsTrigger>
                      </TabsList>
                    </div>

                    {/* Summary Tab */}
                    <TabsContent value="summary" className="mt-0">
                      <div className="p-5 overflow-y-auto max-h-[67vh]">
                        {call.summary && call.summary !== '' ? (
                          <div className="text-200 pt-s">{call.summary}</div>
                        ) : (
                          <div className="text-muted-foreground pt-5">No summary available.</div>
                        )}
                      </div>
                    </TabsContent>
                    {/* Transcripts Tab */}
                    <TabsContent value="transcripts" className="mt-0">
                      <div className="p-5 overflow-y-auto rounded-md max-h-[67vh]">
                        {formattedTranscript.length > 0 ? (
                          <div className="space-y-2 pt-2">{renderTranscript()}</div>
                        ) : (
                          <div className="text-muted-foreground">No transcript available.</div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OutboundCallDetailModal;
