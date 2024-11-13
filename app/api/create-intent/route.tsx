// import Stripe from "stripe"; // for server-side code
// // Ensure you have @types/stripe for TypeScript support

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   // Set the API version
//   typescript: true,
//   apiVersion:"2023-10-16"
// });

// export async function POST(request:any) {
//     const data:any=await request.json() ;
//     const amount = data.amount;
//     try{
//         const paymentIntent = await stripe.paymentIntents.create({
//             amount:Number(amount)*100,
//             currency:'USD'
//         })
//     }
// }
import Stripe from "stripe"; // for server-side code
// Ensure you have @types/stripe for TypeScript support

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16", // Set the API version
  typescript: true,
});

export async function POST(request: Request) {
  const data = await request.json();
  const amount = data.amount;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100), // Convert amount to cents
      currency: 'usd',
    });

    return new Response(
      JSON.stringify({ client_secret: paymentIntent.client_secret }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create payment intent" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}