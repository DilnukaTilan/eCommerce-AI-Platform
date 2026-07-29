export interface ToolCallPart {
  type: string;
  toolName?: string;
  toolCallId?: string;
  args?: Record<string, unknown>;
  result?: unknown;
  output?: unknown;
  state?: "partial-call" | "call" | "result";
}
