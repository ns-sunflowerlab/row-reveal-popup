
import React, { useState } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CallLog } from '@/types/calls';

interface CallDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  call: CallLog | null;
}

const CallDetailModal: React.FC<CallDetailModalProps> = ({ isOpen, onClose, call }) => {
  const [playbackRate, setPlaybackRate] = useState("1.0x");

  if (!call) return null;

  // Generate fake waveform data
  const generateWaveformData = (length: number, variance: number) => {
    return Array.from({ length }, () => Math.random() * variance);
  };

  const userWaveform = generateWaveformData(50, 1);
  const assistantWaveform = generateWaveformData(50, 0.8);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background border-secondary">
        <div className="flex items-center justify-between bg-card p-4 border-b border-secondary">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-secondary rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            </span>
            <h2 className="text-lg font-semibold">Call Log Details</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">{call.callId}</span>
            <button onClick={() => {}} className="p-1 hover:bg-secondary rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </button>
            <button onClick={() => {}} className="p-1 hover:bg-secondary rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </button>
            <button onClick={() => {}} className="p-1 hover:bg-secondary rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                <rect x="9" y="9" width="6" height="6" />
                <line x1="9" y1="1" x2="9" y2="4" />
                <line x1="15" y1="1" x2="15" y2="4" />
                <line x1="9" y1="20" x2="9" y2="23" />
                <line x1="15" y1="20" x2="15" y2="23" />
                <line x1="20" y1="9" x2="23" y2="9" />
                <line x1="20" y1="14" x2="23" y2="14" />
                <line x1="1" y1="9" x2="4" y2="9" />
                <line x1="1" y1="14" x2="4" y2="14" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Recording</h3>
            <div className="flex items-center gap-2">
              <div className="text-xl font-medium">{playbackRate}</div>
              <button onClick={() => setPlaybackRate(prev => prev === "1.0x" ? "1.5x" : "1.0x")} className="p-1 hover:bg-secondary rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>
              <button onClick={() => setPlaybackRate(prev => prev === "1.0x" ? "0.5x" : "1.0x")} className="p-1 hover:bg-secondary rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mb-10">
            {/* Audio waveforms visualization */}
            <div className="relative w-full h-24 mb-1">
              {/* Assistant waveform (orange) */}
              <div className="absolute top-0 left-0 right-0 h-8 flex items-end space-x-1">
                {assistantWaveform.map((value, index) => (
                  <div
                    key={index}
                    className="bg-orange-500/80 w-1.5 rounded-t-sm"
                    style={{ height: `${value * 100}%` }}
                  ></div>
                ))}
              </div>
              
              {/* User waveform (teal) */}
              <div className="absolute bottom-0 left-0 right-0 h-8 flex items-start space-x-1">
                {userWaveform.map((value, index) => (
                  <div
                    key={index}
                    className="bg-teal-500/80 w-1.5 rounded-b-sm"
                    style={{ height: `${value * 100}%` }}
                  ></div>
                ))}
              </div>

              {/* Time markers */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground mt-1">
                <div>0</div>
                <div>5</div>
                <div>10</div>
                <div>15</div>
                <div>20</div>
              </div>
            </div>
            
            <div className="flex gap-2 items-center">
              {/* Play button */}
              <button className="p-3 bg-teal-500/20 hover:bg-teal-500/30 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </button>
              
              <div className="font-mono text-muted-foreground">00:22</div>
              
              <div className="ml-auto">
                <button className="px-4 py-1 flex items-center gap-2 bg-secondary hover:bg-secondary/70 transition-colors rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                  Audio
                </button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="transcripts">
            <TabsList className="bg-secondary mb-4">
              <TabsTrigger value="transcripts" className="data-[state=active]:bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Transcripts
              </TabsTrigger>
              <TabsTrigger value="logs" className="data-[state=active]:bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
                Logs
              </TabsTrigger>
              <TabsTrigger value="analysis" className="data-[state=active]:bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                Analysis
              </TabsTrigger>
              <TabsTrigger value="messages" className="data-[state=active]:bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <line x1="9" y1="9" x2="15" y2="9" />
                  <line x1="9" y1="13" x2="15" y2="13" />
                  <line x1="9" y1="17" x2="13" y2="17" />
                </svg>
                Messages
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="transcripts" className="mt-0">
              <div className="p-5 border border-secondary rounded-md">
                <h3 className="text-lg font-semibold mb-4">Transcript</h3>
                
                {/* AI message */}
                <div className="mb-6">
                  <div className="text-teal-400 font-medium mb-1">AI</div>
                  <div className="text-gray-200">
                    Neuromonitoring Associates. This is Zen. How can I help you?
                  </div>
                </div>
                
                {/* User message */}
                <div className="mb-6">
                  <div className="text-blue-400 font-medium mb-1">User</div>
                  <div className="text-gray-200">
                    Alan, how are you?
                  </div>
                </div>
                
                {/* AI message */}
                <div className="mb-6">
                  <div className="text-teal-400 font-medium mb-1">AI</div>
                  <div className="text-gray-200">
                    Thank you for asking, Alan. I'm here and ready to assist you. Would you like to schedule, reschedule, or cancel a case today?
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="logs">
              <div className="border border-secondary rounded-md p-5">
                <div className="text-sm text-muted-foreground">
                  <p>System logs will be displayed here.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="analysis">
              <div className="border border-secondary rounded-md p-5">
                <div className="text-sm text-muted-foreground">
                  <p>Call analysis will be displayed here.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="messages">
              <div className="border border-secondary rounded-md p-5">
                <div className="text-sm text-muted-foreground">
                  <p>Message details will be displayed here.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallDetailModal;
