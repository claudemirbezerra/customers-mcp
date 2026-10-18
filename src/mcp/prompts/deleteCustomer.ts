import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CustomerSchema } from "../../domain/customer.ts";
import z from "zod";

export function registerDeleteCustomerPrompt(server: McpServer) {
    server.registerPrompt(
        "delete_customer_prompt",
        {
            description: "Prompt to create a customer using _id, name or phone",
            argsSchema:  {
                _id: z.string().describe('MongoDB id to delete a user')
            },
        },
        (id) => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Please delete the customer matching the following id using the delete_customer tool.\Id: ${JSON.stringify(id)}`,
                    }
                }
            ]
        })
    )
}