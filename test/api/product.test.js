const {spec, request} = require('pactum')

request.setBaseUrl('http://lojaebac.ebaconline.art.br/');

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

it('Adicionar Produto', async () => {
    await spec ()
    .post('api/addProduct')
    .withHeaders('Authorization', token)
    .withJson({
        "name": "Kelvin PRODUTO",
        "price": 34,
        "quantity": 100
  .expectJson('success', true)
        
    })

})

it('Editar Produto', async () => {
    await spec ()
    .put('api/addProduct/66b144a007423f2f18c27870')
    .withHeaders('Authorization', token)
    .withJson({
    "name": "TESTE",
    "price": "34"
    })
  

})

it('Deletar Produto', async () => {
    await spec ()
    .delete('api/addProduct/66b144a007423f2f18c27870')
    .withHeaders('Authorization', token)
    

})
