import { createAgentUIStreamResponse, type UIMessage } from "ai";
import { auth } from "@clerk/nextjs/server";
import { createShoppingAgent } from "@/lib/ai/shopping-agent";

export async function POST(request: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await request.json();
    const { userId } = await auth();
    const agent = createShoppingAgent({ userId });

    return createAgentUIStreamResponse({
      agent,
      uiMessages: messages,
    });
  } catch (error: any) {
    console.error("Error in POST /api/chat:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Failed to process chat request",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
