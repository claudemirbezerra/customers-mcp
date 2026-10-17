import z from "zod";

export const CustomerSchema = z.object({
    _id: z.string().optional(),
    name: z.string(),
    phone: z.string()
})

export type Customer = z.infer<typeof CustomerSchema>

export const CustomerQuerySchema = z.object({
    _id: z.string().optional().describe("MongoDb objectId of the customer"),
    name: z.string().optional().describe('Full name of the customer'),
    phone: z.string().optional().describe('phone number of the customer')
})

export type CustomerQuery = z.infer<typeof CustomerQuerySchema>

export type CreatedCustomer = { message: string, id: string }