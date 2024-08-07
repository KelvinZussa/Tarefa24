// test.js
const { spec, request } = require('pactum');
const { eachLike, like } = require('pactum-matchers');


request.setBaseUrl('http://lojaebac.ebaconline.art.br');

let token;
beforeEach(async () => {
    token = await spec ()
    await spec()
    .post('/public/authUser')
    .withJson({
        "email": "admin@admin.com",
        "password": "admin123"
    })
    .returns('data.token')
    
})

it('API - listagem de usuarios', async () => {
    await spec()
    .get('/api/getUsers')
    .expectStatus(200)
    .expectJsonMatch({
               Users: eachLike({
               "_id": like("66a1b82a07423f2f18c1fc08"),
               email: like ("cliente@ebac.art.br"),
               profile: {
                firstName: like("Cliente")
               }
            })
        
    })
       
});
