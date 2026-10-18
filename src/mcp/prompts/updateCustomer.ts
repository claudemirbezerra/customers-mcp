import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CustomerUpdateSchema } from "../../domain/customer.ts";

export function registerUpdateCustomerPrompt(server: McpServer) {
    server.registerPrompt(
        "update_customer_prompt",
        {
            description: "Prompt to create a customer using _id, name or phone",
            argsSchema:  CustomerUpdateSchema.shape,
        },
        (values) => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Please update the customer matching the following values using the update_customer tool.\nValues: ${JSON.stringify(values)}`,
                    }
                }
            ]
        })
    )
}