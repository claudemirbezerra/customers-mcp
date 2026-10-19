import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { CustomerService } from "../application/customerService.ts";
import { registerListCustomersTool } from "./tools/listCustomers.ts";
import { registerGetCustomerTool } from "./tools/getCustomer.ts";
import { registerCreateCustomerTool } from "./tools/createCustomer.ts";
import { registerUpdateCustomerTool } from "./tools/updateCustomer.ts";
import { registerDeleteCustomerTool } from "./tools/deleteCustomer.ts";
import { registerApiInfoResource } from "./resources/apiInfo.ts";
import { registerFindCustomerPrompt } from "./prompts/findCustomer.ts";
import { registerDeleteCustomerPrompt } from "./prompts/deleteCustomer.ts";
import { registerUpdateCustomerPrompt } from "./prompts/updateCustomer.ts";
import { registerCreateCustomerPrompt } from "./prompts/createCustomer.ts";

const BASE_URL = "http://localhost:9999/v1";
const SERVICE_TOKEN = process.env.SERVICE_TOKEN!
const service = new CustomerService(BASE_URL, SERVICE_TOKEN);

export const server = new McpServer({
    name: "@erickwendel/ew-customers-mcp",
    version: "0.0.1",
});

registerListCustomersTool(server, service);
registerGetCustomerTool(server, service);
registerCreateCustomerTool(server, service);
registerUpdateCustomerTool(server, service);
registerDeleteCustomerTool(server, service);
registerApiInfoResource(server, BASE_URL);
registerFindCustomerPrompt(server);
registerDeleteCustomerPrompt(server);
registerUpdateCustomerPrompt(server);
registerCreateCustomerPrompt(server);
