import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session | Stripe.Invoice;

  if (event.type === "checkout.session.completed") {
    // Handle successful payment
    console.log("Payment successful:", session.id);
  }

  if (event.type === "invoice.payment_succeeded") {
    // Handle subscription payment
    console.log("Subscription payment succeeded:", session.id);
  }

  return NextResponse.json({ received: true });
}
