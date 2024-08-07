const {spec} = require('pactum')

it('API - deve autenticar o usuario corretamente', async () => {
    await spec()
    .post('/public/authUser')
    .withJson({
        "email": "admin@admin.com",
        "password": "admin123"
    })
    .expectStatus(200)
    .expectJson('success', true)
});