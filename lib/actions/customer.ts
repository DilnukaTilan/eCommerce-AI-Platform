"use server";

import Stripe from "stripe";
import { client, writeClient } from "@/sanity/lib/client";
import { CUSTOMER_BY_EMAIL_QUERY } from "@/lib/sanity/queries/customers";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-06-24.dahlia",
});

export async function getOrCreateStripeCustomer(
  email: string,
  name: string,
  clerkUserId: string,
): Promise<{ stripeCustomerId: string; sanityCustomerId: string }> {
  const existingCustomer = await client.fetch(CUSTOMER_BY_EMAIL_QUERY, {
    email,
  });

  if (existingCustomer?.stripeCustomerId) {
    return {
      stripeCustomerId: existingCustomer.stripeCustomerId,
      sanityCustomerId: existingCustomer._id,
    };
  }

  const existingStripeCustomers = await stripe.customers.list({
    email,
    limit: 1,
  });

  let stripeCustomerId: string;

  if (existingStripeCustomers.data.length > 0) {
    stripeCustomerId = existingStripeCustomers.data[0].id;
  } else {
    const newStripeCustomer = await stripe.customers.create({
      email,
      name,
      metadata: {
        clerkUserId,
      },
    });
    stripeCustomerId = newStripeCustomer.id;
  }

  if (existingCustomer) {
    await writeClient
      .patch(existingCustomer._id)
      .set({ stripeCustomerId, clerkUserId, name })
      .commit();
    return {
      stripeCustomerId,
      sanityCustomerId: existingCustomer._id,
    };
  }

  const newSanityCustomer = await writeClient.create({
    _type: "customer",
    email,
    name,
    clerkUserId,
    stripeCustomerId,
    createdAt: new Date().toISOString(),
  });

  return {
    stripeCustomerId,
    sanityCustomerId: newSanityCustomer._id,
  };
}
