import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CustomerSchema } from "../../domain/customer.ts";

export function registerCreateCustomerPrompt(server: McpServer) {
    server.registerPrompt(
        "create_customer_prompt",
        {
            description: "Prompt to create a customer using _id, name or phone",
            argsSchema:  CustomerSchema.shape,
        },
        (values) => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Please create the customer matching the following values using the create_customer tool.\nValues: ${JSON.stringify(values)}`,
                    }
                }
            ]
        })
    )
}