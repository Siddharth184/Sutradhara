// import Stripe from "stripe";
// import Transaction from "../models/Transaction.js";
// import User from "../models/User.js";


// export const stripeWebhooks = async (request, response) => {
//   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//   const sig = request.headers["stripe-signature"];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       request.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );

//     switch (event.type) {
//       // case "paymentIntent = event.data.object": {
//       //   const sessionList = await stripe.checkout.sessions.list({
//       //     payment_intent: paymentIntent.id,
//       //   });

//       //   const session = sessionList.data[0];
//       //   const { transactionId, appId } = session.metadata;

//       //   if (appId === "quickgpt") {
//       //     const transaction = await Transaction.findOne({
//       //       _id: transactionId,
//       //       isPaid: false,
//       //     });

//       //     // Update Credits in user account
//       //     await User.updateOne(
//       //       { _id: transaction.userId },
//       //       { $inc: { credits: transaction.credits } }
//       //     );

//       //     // Update credit Payments status
//       //     transaction.isPaid = true;
//       //     await transaction.save();
//       //   } else {
//       //     return response.json({
//       //       received: true,
//       //       message: "Ignored event: Invalid app",
//       //     });
//       //   }
//       //   break;
//       // }
//       case "payment_intent.succeeded": {
//   const paymentIntent = event.data.object;

//   // Fetch the checkout session to get metadata
//   const sessions = await stripe.checkout.sessions.list({
//     payment_intent: paymentIntent.id,
//   });

//   const session = sessions.data[0];
//   if (!session) break;

//   const { transactionId, appId } = session.metadata;

//   if (appId === "quickgpt") {
//     const transaction = await Transaction.findOne({
//       _id: transactionId,
//       isPaid: false,
//     });

//     if (transaction) {
//       await User.updateOne(
//         { _id: transaction.userId },
//         { $inc: { credits: transaction.credits } }
//       );

//       transaction.isPaid = true;
//       await transaction.save();
//     }
//   }
//   break;
// }


//       default: {
//         console.log("Unhandled event type:", event.type);
//         break;
//       }
//     }

//     response.json({ received: true });
//   } catch (error) {
//     console.error("Webhook Processing Error:", error);
//     response.status(500).send("Internal Server Error");
//   }
// };

import Stripe from "stripe";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("➡️ Stripe Event:", event.type);

    // ✅ Handle payment intent succeeded
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;

      // find the checkout.session using the intent
      const sessions = await stripe.checkout.sessions.list({
        payment_intent: paymentIntent.id,
      });

      const session = sessions.data[0];
      if (!session) {
        console.error("⚠️ No session found for payment intent", paymentIntent.id);
        return res.json({ received: true });
      }

      const { transactionId, appId } = session.metadata || {};

      if (appId === "quickgpt" && transactionId) {
        const transaction = await Transaction.findOne({
          _id: transactionId,
          isPaid: false,
        });

        if (transaction) {
          // Increment credits for user
          await User.updateOne(
            { _id: transaction.userId },
            { $inc: { credits: transaction.credits } }
          );

          // Mark as paid
          transaction.isPaid = true;
          await transaction.save();

          console.log(
            `✅ Transaction ${transactionId} marked paid & ${transaction.credits} credits added`
          );
        }
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook Processing Error:", error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};
