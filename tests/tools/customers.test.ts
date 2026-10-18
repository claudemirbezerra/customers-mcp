import { describe, it, after, before } from 'node:test'
import assert from 'node:assert'
import { createTestClient } from '../helpers.ts'
import { Client } from '@modelcontextprotocol/sdk/client'
import { type CustomerMutation, type Customer } from '../../src/domain/customer.ts'

type CustomersResult = { structuredContent: { customers: Customer[] }}
type CustomerResult = { structuredContent: { customer: Customer }}
type CustomerMutationResult = { structuredContent: CustomerMutation }

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
        }) as unknown as CustomerMutationResult

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

    it('should get a customer', async () => {
        const customer = {
                name: 'Claudemir',
                phone: '9999-9999'
            }

        await client.callTool({
            name: 'create_customer',
            arguments: customer
        }) as unknown as CustomerMutationResult

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

    it('should update a customer', async () => {
        const customerToCreate = {
                name: 'Ana',
                phone: '9999-9999'
            }
        const result = await client.callTool({
            name: 'create_customer',
            arguments: customerToCreate
        }) as unknown as CustomerMutationResult


        const customerToUpdate = {
            _id: result.structuredContent.id,
            name: 'Ana Novo',
            phone: '9999-9999'
        }

        const resultUpdate = await client.callTool({
            name: 'update_customer',
            arguments: customerToUpdate
        }) as unknown as CustomerMutationResult

        const resultGet = await client.callTool({
            name: 'get_customer',
            arguments: {
                _id: result.structuredContent.id
            }
        }) as unknown as CustomerResult


        assert.deepStrictEqual(
            resultGet.structuredContent.customer.name,
            customerToUpdate.name,
            'Should have the same name'
        )
    
        assert.deepStrictEqual(
            resultUpdate.structuredContent.message,
            `User ${customerToUpdate._id} updated!`,
            'Should contain message'
        )
    })
})
