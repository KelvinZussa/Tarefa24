const { reporter, flow, handler, mock } = require('pactum');
const pf = require('pactum-flow-plugin');


function addFlowReporter() {
    pf.config.url = 'http://localhost:8080'; // pactum flow server url
    pf.config.projectId = 'Tarefa-24-Product-API';
    pf.config.projectName = 'Tarefa-24 Product API';
    pf.config.version = '1.0.0';
    pf.config.username = 'scanner';
    pf.config.password = 'scanner';
    reporter.add(pf.reporter);
}

// global before
before(async () => {
    addFlowReporter();
    await mock.start(4000);
});

// global after
after(async () => {
    await mock.stop();
    await reporter.end();
});

it('API - Adicionar Produto', async () => {
    await spec ()
    .post('http://lojaebac.ebaconline.art.br/api/addProduct/api/addProduct')
    .withHeaders('Authorization', token)
    .withJson({
        "name": "Kelvin PRODUTO",
        "price": 34,
        "quantity": 100
  .expectJson('success', true)
        
    })

})