const controller = require('../controller/accountController');

jest.setTimeout(15000); // Set timeout to 15 seconds

describe('Timeout testing', () =>{
    it('should return error after 10000s', async ()=>{
        
            const mockReq = {
                params: {
                    // ... 
                },
            };
        
            const mockRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
        
            // console.log('Starting test...');
            await controller.getAllAccounts(mockReq, mockRes);
             // console.log('Test completed, response:', mockRes.json.mock.calls[0][0]);
        
            const accounts = mockRes.json.mock.calls[0][0];
        
            expect(Array.isArray(accounts)).toBe(false);
        
            expect(accounts).toHaveProperty('error')
       

    })
})

