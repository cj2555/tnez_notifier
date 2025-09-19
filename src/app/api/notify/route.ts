import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    let discordmessage = `@everyone ${message}`;
    const webhookUrl = "https://discord.com/api/webhooks/1399473650448728085/D0T91KtFnwf612BPs24JrcvBZGRNejcPOtcZBsAsn4rJC6u8yvqoE3LukGSfMQEO4J_i";
    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: discordmessage || "Hello from Next.js API 🚀",
      }),
    });

    if (!discordRes.ok) {
      throw new Error(`Discord API error: ${discordRes.statusText}`);
    }

    return NextResponse.json({ success: true, sent: message });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
