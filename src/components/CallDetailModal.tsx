import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CallLog } from '@/types/calls';

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
    ? call.transcript.split(/\n|\r|\s{2,}/).filter((line) => line.trim() !== "")
    : [];

  return (
<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()} >
<DialogContent className="max-w-2xl p-0 overflow-hidden bg-background border-l border-secondary flex-end" style={{ marginLeft: "18em" }}>

  <div className="flex items-center justify-between bg-card p-4 border-b border-secondary">
      <div className="flex items-center justify-end gap-2">
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
      </div>
    </div>

    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
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
          isPlaying ? "bg-gray-400 cursor-not-allowed" : "bg-teal-500/20 hover:bg-teal-500/30"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </button>

        {/* Pause Button */}
        <button
          onClick={handlePause}
          disabled={!isPlaying}
          className={`p-3 rounded-full transition-colors ${
          !isPlaying ? "bg-gray-400 cursor-not-allowed" : "bg-red-500/20 hover:bg-red-500/30"
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="6" width="12" height="12" />
          </svg>
        </button>

        {/* Progress Bar */}
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-full"
        />
        </div>
      ) : (
        <div className="text-muted-foreground">No recording available.</div>
      )}
      </div>

      <Tabs defaultValue="transcripts">
      <TabsList className="bg-secondary mb-4">
        <TabsTrigger value="transcripts" className="data-[state=active]:bg-primary/10">
        Transcripts
        </TabsTrigger>
        <TabsTrigger value="summary" className="data-[state=active]:bg-primary/10">
        Summary
        </TabsTrigger>
      </TabsList>

      {/* Transcripts Tab */}
      <TabsContent value="transcripts" className="mt-0">
        <div className="p-5 border border-secondary rounded-md h-64 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Transcript</h3>
        {formattedTranscript.length > 0 ? (
          <div className="space-y-2">
          {formattedTranscript.map((line, index) => (
            <div
            key={index}
            className={`p-2 rounded-md ${
               "bg-secondary/20 text-left" 
            }`}
            >
            {line}
            </div>
          ))}
          </div>
        ) : (
          <div className="text-muted-foreground">No transcript available.</div>
        )}
        </div>
      </TabsContent>

      {/* Summary Tab */}
      <TabsContent value="summary" className="mt-0">
        <div className="p-5 border border-secondary rounded-md">
        <h3 className="text-lg font-semibold mb-4">Summary</h3>
        {call.summary ? (
          <div className="text-gray-200">{call.summary}</div>
        ) : (
          <div className="text-muted-foreground">No summary available.</div>
        )}
        </div>
      </TabsContent>
      </Tabs>
    </div>
    </DialogContent>
    </Dialog>
  );
};

export default CallDetailModal;
