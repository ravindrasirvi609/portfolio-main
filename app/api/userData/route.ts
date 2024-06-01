import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import userData from "../../../model/userModel";
import { Resend } from "resend";

connect();

export async function POST(req: NextRequest) {
  try {
    const userDataFromBody = await req.json();
    const newUser = new userData(userDataFromBody);

    await newUser.save();
    const apiKey = process.env.RESEND_API_KEY;
    console.log("API KEY: ", apiKey);

    if (!apiKey) {
      throw new Error(
        "Missing Resend API key. Set the RESEND_API_KEY environment variable."
      );
    }
    const resend = new Resend(apiKey);
    console.log(resend);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "dev@ravindrachoudhary.in",
        to: ["ravi.sirvi609@gmail.com"],
        subject: `${newUser.name} wants to connect with you!`,
        html: `<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h1 style="font-size: 24px; color: #333;">Connection Request</h1>
         <p style="font-size: 18px;">Hi,</p>
         <p style="font-size: 18px;"><strong>${newUser.name}</strong> wants to connect with you!</p>
         <p style="font-size: 18px;">Here are their details:</p>
         <ul style="font-size: 18px;">
           <li>Email: ${newUser.email}</li>
           <li>Message: ${newUser.message}</li>
           <li>Mobile No: ${newUser.mobileNo}</li>
           <li>Created At: ${newUser.createdAt}</li>
         </ul>
       </div>`,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
    } else {
      console.error("Error sending email:", res.status);
    }
    const newResend = new Resend(apiKey);
    console.log(newResend);
    const newRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "dev@ravindrachoudhary.in",
        to: `${newUser.email}`,
        subject: `Thanks for Connecting, ${newUser.name}`,
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
        <h1 style="font-size: 24px; color: #333; text-align: center; margin-bottom: 20px;">Connection Request</h1>
        <p style="font-size: 18px;">Hi ${newUser.name},</p>
        <p style="font-size: 18px;">
          Thank you for reaching out! I have received your request and will get back to you soon.
        </p>
        <p style="font-size: 18px;">
          If you need to contact me directly, please feel free to call me at <strong>8107199052</strong>.
        </p>
        <p style="font-size: 18px;">Best regards,</p>
        <p style="font-size: 18px; font-weight: bold;">Ravindra Choudhary</p>
      </div>
      <style>
        @media only screen and (max-width: 600px) {
          div {
            padding: 15px;
            font-size: 16px;
          }
          h1 {
            font-size: 22px;
          }
          p {
            font-size: 16px;
          }
        }
      </style>
    `,
      }),
    });

    if (newRes.ok) {
      const data = await newRes.json();
      console.log(data);
    } else {
      console.error("Error sending email:", newRes.status);
    }

    return NextResponse.json({
      message: "User added successfully",
      user: newUser,
    });
  } catch (error: any) {
    console.error("Error adding user:", error);
    return NextResponse.error(); // Remove the argument from the function call
  }
}
