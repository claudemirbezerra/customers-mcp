import { describe, it, after, before } from 'node:test'
import assert from 'node:assert'
import { createTestClient } from '../helpers.ts'
import { Client } from '@modelcontextprotocol/sdk/client'
import { type CreatedCustomer, type Customer } from '../../src/domain/customer.ts'

type CustomersResult = { structuredContent: { customers: Customer[] }}
type CustomerResult = { structuredContent: { customer: Customer }}
type CreateCustomerResult = { structuredContent: CreatedCustomer }

describe('Customer MCP Suite', () => {
    let client: Client

    before(async () => {
        client = await createTestClient()
    })
    
    after(async () => {
        await client.close()
    })

    it('should list all clients', async () => {
        const result = await client.callTool({
            name: 'list_customers',
            arguments: {}
        }) as unknown as CustomersResult

        assert.ok(
            Array.isArray(result.structuredContent.customers),
            'should return an array of customers'
        )
    })

    it('should create a customer', async () => {
        const customer = {
                name: 'Ana',
                phone: '9999-9999'
            }
        const result = await client.callTool({
            name: 'create_customer',
            arguments: customer
        }) as unknown as CreateCustomerResult

        assert.ok(
            result.structuredContent.id,
            'Should contain id'
        )

        assert.deepStrictEqual(
            result.structuredContent.message,
            `user ${customer.name} created!`,
            'Should contain message'
        )
    })

    it('should create a customer', async () => {
        const customer = {
                name: 'Claudemir',
                phone: '9999-9999'
            }

        await client.callTool({
            name: 'create_customer',
            arguments: customer
        }) as unknown as CreateCustomerResult

        const result = await client.callTool({
            name: 'get_customer',
            arguments: {
                name: 'Clau'
            }
        }) as unknown as CustomerResult

        assert.ok(
            result.structuredContent.customer._id,
            'Should contain id'
        )

        assert.deepStrictEqual(
            result.structuredContent.customer.name,
            customer.name,
            'Should have the correct name'
        )
    })
})
