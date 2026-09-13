"use server";

import { connectDb, ContactMessage } from "@workspace/db";

export async function sendMessageAction(data: { name: string; email: string; subject?: string; message: string }) {
  try {
    await connectDb();
    
    const message = new ContactMessage({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      read: false,
    });
    
    await message.save();
    return { success: true };
  } catch (error) {
    console.error("Error saving contact message:", error);
    return { success: false, error: "Failed to send message" };
  }
}
