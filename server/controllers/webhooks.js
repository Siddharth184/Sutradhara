// import Stripe from "stripe";
// import Transaction from "../models/Transaction.js";
// import User from "../models/User.js";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const stripeWebhooks = async (request, response) => {
//   const sig = request.headers["stripe-signature"];

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       request.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET // ✅ only used here
//     );

//     switch (event.type) {
//       case "checkout.session.completed": {
//         const session = event.data.object;

//         const { transactionId, appId } = session.metadata;

//         if (appId === "quickgpt") {
//           const transaction = await Transaction.findOne({
//             _id: transactionId,
//             isPaid: false,
//           });

//           if (transaction) {
//             // ✅ Update user credits
//             await User.updateOne(
//               { _id: transaction.userId },
//               { $inc: { credits: transaction.credits } }
//             );

//             // ✅ Mark transaction as paid
//             transaction.isPaid = true;
//             await transaction.save();
//           }
//         }
//         break;
//       }

//       default:
//         console.log("Unhandled event type:", event.type);
//     }

//     response.json({ received: true });
//   } catch (error) {
//     console.error("Webhook Processing Error:", error);
//     response.status(400).send(`Webhook Error: ${error.message}`);
//   }
// };
import Stripe from "stripe";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // ✅ use secret key

export const stripeWebhooks = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET // ✅ use webhook secret only for verify
    );

    // ✅ handle checkout completed
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const { transactionId, appId } = session.metadata;

      if (appId === "quickgpt") {
        const transaction = await Transaction.findOne({
          _id: transactionId,
          isPaid: false,
        });

        if (transaction) {
          // ✅ Add credits to user
          await User.updateOne(
            { _id: transaction.userId },
            { $inc: { credits: transaction.credits } }
          );

          // ✅ Mark transaction as paid
          transaction.isPaid = true;
          await transaction.save();
        }
      }
    }

    response.json({ received: true });
  } catch (error) {
    console.error("Webhook Processing Error:", error);
    response.status(400).send(`Webhook Error: ${error.message}`);
  }
};
