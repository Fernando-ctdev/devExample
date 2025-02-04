export interface Explanation {
  id?: number;
  tech: string;
  tech_id: string;
  explanation: string;
  created_at?: Date;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}
