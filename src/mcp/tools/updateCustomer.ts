import { type McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CustomerService } from "../../application/customerService.ts";
import z from "zod";
import { CustomerMutationSchema, CustomerUpdateSchema } from "../../domain/customer.ts";

export function registerUpdateCustomerTool(
    server: McpServer,
    service: CustomerService
) {
    server.registerTool(
        "update_customer",
        {
            description: "update a customer",
            inputSchema: CustomerUpdateSchema.shape,
            outputSchema: CustomerMutationSchema.shape
        },
        async (customerToUpdate) => {
            try {
                const customer = await service.updateCustomer(customerToUpdate)
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