import { describe, it, after, before } from 'node:test'
import assert from 'node:assert'
import { createTestClient } from '../helpers.ts'
import { Client } from '@modelcontextprotocol/sdk/client'

describe('Customer Prompts', () => {
    let client: Client

    before(async () => {
        client = await createTestClient()
    })

    after(async () => {
        await client.close()
    })

    it('should return the find_customer_prompt', async () => {
        const result = await client.getPrompt({
            name: 'find_customer_prompt',
            arguments: { name: 'John'},
        })
        const text = result.messages[0].content
        assert.ok('text' in text && text.text.includes('get_customer'), 'Prompt should reference the get_customer tool')
        assert.ok('text' in text && text.text.includes('John'), 'Prompt should include the query')
    })

    it('should return the create_customer_prompt', async () => {
        const customer = {
            name: "Test",
            phone: "000000999"
        }

        const result = await client.getPrompt({
            name: 'create_customer_prompt',
            arguments: customer,
        })
        const text = result.messages[0].content
        assert.ok('text' in text && text.text.includes('create_customer'), 'Prompt should reference the create_customer tool')
        assert.ok('text' in text && text.text.includes('Test'), 'Prompt should include the customer')
    }) 
    
    it('should return the update_customer_prompt', async () => {
        const customerToUpdate = {
            _id: "123456",
            name: "Test",
            phone: "000000999"
        }

        const result = await client.getPrompt({
            name: 'update_customer_prompt',
            arguments: customerToUpdate,
        })
        const text = result.messages[0].content
        assert.ok('text' in text && text.text.includes('update_customer'), 'Prompt should reference the update_customer tool')
        assert.ok('text' in text && text.text.includes('Test'), 'Prompt should include the customer')
    })
})

   