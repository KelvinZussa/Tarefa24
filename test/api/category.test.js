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

it('Adicionar categoria', async () => {
    await spec ()
    .post('/api/addCategory')
    .withHeaders('Authorization', token)
    .withJson({
            "name": "Nova Categoria"
        .expectStatus(200)
        .expectJson('success', true)
    })
});

it('Editar categoria', async () => {
    await spec ()
    .put('/api/editCAtegory/{66aabaf707423f2f18c2448b}')
    .withHeaders('Authorization', token)
    .withJson({
        "name": "Categoria editada Kelvin"
        .expectStatus(200)
        .expectJson('success', true)
        
    })
    
});

it('Deletar categoria', async () => {
    await spec ()
    .delete ('/api/deleteCAtegory/{66aabaf707423f2f18c2448b}')
    .withHeaders('Authorization', token)
    .expectJson('success', true) 
        
});
