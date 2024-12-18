import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email/email-template";
import { getApiBaseUrl } from "../get-api-url";

const resend = new Resend(process.env.RESEND_API_KEY);

const baseURL = getApiBaseUrl();


export async function POST(req: Request) {
  try {
    const url = `http://localhost:3000/updatePassword`;
    const { email } = await req.json();
    console.log(email);
    const { data, error } = await resend.emails.send({
      from: "Acme <wtr@resend.dev>",
      to: [email],
      subject: "Hello world",
      react: EmailTemplate({  resetPasswordLink: url,
      }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
