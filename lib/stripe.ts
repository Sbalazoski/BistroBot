npm install stripe
npm install -D @types/stripe
﻿import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2025-12-01" });
