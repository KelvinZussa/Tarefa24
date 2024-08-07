const { reporter, flow, handler, mock } = require('pactum');
const pf = require('pactum-flow-plugin');

function addFlowReporter() {
    pf.config.url = 'http://localhost:8080'; // pactum flow server url
    pf.config.projectId = 'Tarefa-24-Category-FRONT';
    pf.config.projectName = 'Tarefa-24 Category FRONT';
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

handler.addInteractionHandler('Category Response', () => {
    return {
        provider: 'Tarefa-24-Category-API',
        flow: 'Adicionar Categoria',
        request: {
            method: 'POST',
            path: 'http://lojaebac.ebaconline.art.br/api/addCategory',
                body: {
                "authorization": token,
                "name": "Nova Categoria TESTE",
            }
        },
        response: {
            status: 200,
            body: {
                "success": true,
                "message": "category added",
                "data": {
                    "name": "Nova Categoria Teste",
               }
            }
        }
    }
})

it('FRONT - Adicionar categoria', async () => {
    await flow("Adicionar Categoria")
    .useInteraction('Category Response')
    .post('http://lojaebac.ebaconline.art.br/api/addCategory')
    .withHeaders('Authorization', token)
    .withJson({
            "name": "Nova Categoria"
        .expectStatus(200)
        .expectJson('success', true)
    })
});

