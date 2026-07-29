import type { UIMessage } from "ai";
import type { ToolCallPart } from "./types";

export function getMessageText(message: UIMessage): string {
  if (!message.parts || message.parts.length === 0) {
    return "";
  }
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => (part as { type: "text"; text: string }).text)
    .join("\n");
}

export function getToolParts(message: UIMessage): ToolCallPart[] {
  if (!message.parts || message.parts.length === 0) {
    return [];
  }
  return message.parts
    .filter((part) => part.type.startsWith("tool-"))
    .map((part) => part as unknown as ToolCallPart);
}

export function getToolDisplayName(toolName: string): string {
  const toolNames: Record<string, string> = {
    searchProducts: "Searching products",
    getMyOrders: "Getting your orders",
  };
  return toolNames[toolName] || toolName;
}
