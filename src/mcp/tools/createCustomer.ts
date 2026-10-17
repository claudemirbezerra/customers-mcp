import { type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CustomerService } from "../../application/customerService.ts";
import z from "zod";
import { CustomerSchema } from "../../domain/customer.ts";

export function registerCreateCustomerTool(
    server: McpServer,
    service: CustomerService
) {
    server.registerTool(
        "create_customer",
        {
            description: "create a customer",
            inputSchema: {
                name: z.string().describe('Full name of the customer'),
                phone: z.string().describe('phone number of the customer')
            },
            outputSchema: {
                id: z.string().describe('MongoDB object id of newerly created customer'),
                message: z.string().describe('Confirmation message')
            }
        },
        async ({ name, phone }) => {
            try {
                const customer = await service.createCustomer({ name, phone})
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
                            text: `Failed to list customers. Error ${error instanceof Error ? error.message : String(error)}`
                        }
                    ]
                }
            }
        }
    )
}