
import axios from "axios";

export interface CallData {
  id: string;
  first_name: string | null;
  phone: string;
  line_status: string;
  call_end_reason: string;
  call_recording_link: string;
  call_status: string;
  summary: string;
  call_seconds: number;
  transcript: string;
}

// Function to fetch call logs from the API
export const fetchCallLogs = async (page: number = 1, pageSize: number = 10): Promise<{ calls: CallData[], totalPages: number }> => {
  try {
    const response = await axios.get(
      `https://voiceassistant.demo.zinniax.com/getAllCallDetails?page=${page}&page_size=${pageSize}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

    if (response.data && Array.isArray(response.data.callDetails)) {
      return {
        calls: response.data.callDetails,
        totalPages: response.data.totalPages || Math.ceil(response.data.callDetails.length / pageSize),
      };
    } else {
      throw new Error("Invalid data format received from API");
    }
  } catch (error) {
    console.error("Error fetching call logs:", error);
    throw error;
  }
};

// Utility function to format seconds into MM:SS format
export const formatDuration = (seconds: number): string => {
  if (!seconds) return "N/A";
  
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
};

// Map API call data to our internal CallLog format
export const mapApiDataToCallLog = (data: CallData[]): any[] => {
  return data.map(item => ({
    callId: item.id,
    assistantId: item.id, // Using same ID as we don't have specific assistant ID
    assistant: item.first_name || "AI Assistant",
    assistantPhone: "+1 (844) 748 5913", // Default number as not provided in API
    customerPhone: item.phone,
    direction: item.line_status.toLowerCase().includes("inbound") ? "inbound" : "outbound",
    endReason: mapEndReason(item.call_end_reason),
    success: mapSuccessStatus(item.call_status),
    startTime: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }),
    duration: formatDuration(item.call_seconds),
    transcript: item.transcript,
    summary: item.summary,
    recordingUrl: item.call_recording_link,
  }));
};

// Map API end reason to our internal format
const mapEndReason = (reason: string): "Customer Ended Call" | "Twilio Connection Failed" | "Silence Timed Out" => {
  const lowerReason = reason.toLowerCase();
  if (lowerReason.includes("customer") || lowerReason.includes("hung up")) {
    return "Customer Ended Call";
  } else if (lowerReason.includes("failed") || lowerReason.includes("error")) {
    return "Twilio Connection Failed";
  } else {
    return "Silence Timed Out";
  }
};

// Map API success status to our internal format
const mapSuccessStatus = (status: string): "success" | "fail" | "n/a" => {
  const lowerStatus = status.toLowerCase();
  if (lowerStatus.includes("success")) {
    return "success";
  } else if (lowerStatus.includes("fail")) {
    return "fail";
  } else {
    return "n/a";
  }
};
