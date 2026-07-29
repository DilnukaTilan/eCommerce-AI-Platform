import { createAgentUIStreamResponse, type UIMessage } from "ai";
import { auth } from "@clerk/nextjs/server";
import { createShoppingAgent } from "@/lib/ai/shopping-agent";

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();
  const { userId } = await auth();
  const agent = createShoppingAgent({ userId });

  return createAgentUIStreamResponse({
    agent,
    uiMessages: messages,
  });
}
