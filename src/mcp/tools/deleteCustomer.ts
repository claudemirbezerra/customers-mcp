import { type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CustomerService } from "../../application/customerService.ts";
import z from "zod";

export function registerDeleteCustomerTool(
    server: McpServer,
    service: CustomerService
) {
    server.registerTool(
        "delete_customer",
        {
            description: "delete a customer by id",
            inputSchema: {
                _id: z.string().describe('MongoDB id to delete a user')
            },
            outputSchema: {
                id: z.string().describe('MongoDB object id of newerly created customer'),
                message: z.string().describe('Confirmation message')
            }
        },
        async ({ _id }) => {
            try {
                const customer = await service.deleteCustomer(_id)
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
                            text: `Failed to create customer. Error ${error instanceof Error ? error.message : String(error)}`
                        }
                    ]
                }
            }
        }
    )
}