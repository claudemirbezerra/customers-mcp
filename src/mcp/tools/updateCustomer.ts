import { type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CustomerService } from "../../application/customerService.ts";
import z from "zod";

export function registerUpdateCustomerTool(
    server: McpServer,
    service: CustomerService
) {
    server.registerTool(
        "update_customer",
        {
            description: "update a customer",
            inputSchema: {
                _id: z.string().describe('MongoDb identifier of the customer'),
                name: z.string().describe('Full name of the customer'),
                phone: z.string().describe('phone number of the customer')
            },
            outputSchema: {
                id: z.string().describe('MongoDB object id of newerly created customer'),
                message: z.string().describe('Confirmation message')
            }
        },
        async ({ _id, name, phone }) => {
            try {
                const customer = await service.updateCustomer({ _id, name, phone})
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(customer)
                        }
                    ],
                    structuredContent: customer
                }
            } catch (error) {
                return {
                    isError: true,
                    content: [
                        {
                            type: "text",
                            text: `Failed to update customer. Error ${error instanceof Error ? error.message : String(error)}`
                        }
                    ]
                }
            }
        }
    )
}