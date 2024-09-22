import type { VercelRequest, VercelResponse } from "@vercel/node";
import { StreamClient } from "@stream-io/node-sdk";
import { createClerkClient } from "@clerk/clerk-sdk-node";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method === "POST") {
    try {
      const { user_id } = request.body;
      if (!user_id) {
        return response.status(400).json({ message: "Missing userId in request body" });
      }

      const apiKey = process.env.STREAM_API_KEY;
      const secret = process.env.STREAM_API_SECRET;

      if (!apiKey || !secret) {
        return response.status(500).json({ message: "Stream API credentials are missing" });
      }

      const client = new StreamClient(apiKey, secret, { timeout: 6000 });
      const validity_in_seconds = 60 * 60; // 1 hour

      const token = client.generateUserToken({user_id, validity_in_seconds});

      return response.status(200).json({
        token,
        message: "Token generated successfully",
        user_id,
      });
    } catch (error) {
      console.error("Error generating token:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  if (request.method === "GET") {
    try {
      let { limit = 10, offset = 0 } = request.query;

      limit = parseInt(limit as string, 10);
      offset = parseInt(offset as string, 10);

      const publishableKey = process.env.CLERK_PUBLISHABLE_KEY;
      const secretKey = process.env.CLERK_SECRET_KEY;

      if (!publishableKey || !secretKey) {
        return response.status(500).json({ message: "Clerk API credentials are missing" });
      }

      const clerkClient = createClerkClient({
        publishableKey,
        secretKey,
      });
      const users = await clerkClient.users.getUserList({
        limit,
        offset,
      });
      const totalOffset = Math.ceil(users.totalCount / limit);
      return response.status(200).json({
        users,
        totalOffset,
        totalPages: users.totalCount,
        message: "Users fetched successfully",
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      return response.status(500).json({ message: "Internal Server Error" });
    }
  }

  return response.status(405).json({ message: "Method Not Allowed" });
}
