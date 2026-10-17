import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { type CustomerQuery, CustomerQuerySchema } from "../../domain/customer";

export function registerFindCustomerPrompt(server: McpServer) {
    server.registerPrompt(
        "find_customerPrompt",
        {
            description: "Prompt to search a customer using any combination of _id, name or phone",
            argsSchema: {
                query: CustomerQuerySchema
            },
        },
        ({ query }) => ({
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `Please find the customer matching the following query using the get_customer or list_customers tool.\nQuery: ${query}`,
                    }
                }
            ]
        })
    )
}