import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CallLog } from '@/types/calls';
import React, { useRef, useState } from 'react';

interface CallDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  call: CallLog | null;
}

const CallDetailModal: React.FC<CallDetailModalProps> = ({ isOpen, onClose, call }) => {
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

  if (!call) return null;

  // Split transcript into conversation-like format
  const formattedTranscript = call.transcript
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

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent
        className="fixed right-0 inset-y-0 max-w-2xl w-full bg-white shadow-xl z-50 animate-none translate-y-0"
        style={{ margin: 0 }}
      >
        <div className="gap-2">
          <DialogHeader>
            <div className="flex items-center justify-between p-2 border-b border-secondary">
              <div className="flex items-center justify-end gap-2">
                <span className="p-1 bg-secondary rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" y1="19" x2="12" y2="23"></line>
                    <line x1="8" y1="23" x2="16" y2="23"></line>
                  </svg>
                </span>
                <h2 className="text-lg font-semibold">Call Log Details</h2>
              </div>
            </div>
          </DialogHeader>

          <div className="p-2">
            <div className="pb-4">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">Recording</h3>
              </div>

              <div className="mb-5">
                {/* Custom Audio Player */}
                {call.recording ? (
                  <div className="flex items-center gap-4">
                    <audio
                      ref={audioRef}
                      src={call.recording}
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
                ) : (
                  <div className="text-muted-foreground">No recording available.</div>
                )}
              </div>
            </div>

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
                    {call.summary ? (
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallDetailModal;
