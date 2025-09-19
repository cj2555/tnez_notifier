import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;
    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: message || "Hello from Next.js API 🚀",
      }),
    });

    if (!discordRes.ok) {
      throw new Error(`Discord API error: ${discordRes.statusText}`);
    }

    return NextResponse.json({ success: true, sent: message });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
