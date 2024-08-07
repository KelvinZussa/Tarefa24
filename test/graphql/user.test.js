// test.js
const { spec } = require('pactum');
const { eachLike, like } = require('pactum-matchers');

let token;
beforeEach(async () => {
  token = await spec()
  .post('http://lojaebac.ebaconline.art.br/graphql')
    .withGraphQLQuery(`
      mutation AuthUser($email: String, $password: String) {
  authUser(email: $email, password: $password) {
    success
    token
  }
}
    `)
    .withGraphQLVariables({
      "email": "admin@admin.com",
      "password": "admin123"
    })
    .returns('data.authUser.token')
})

it('listagem de usuarios', async () => {
    await spec()
    .post('http://lojaebac.ebaconline.art.br/graphql')
    .withGraphQLQuery(`
      query {
  Users {
    id
    email
    profile {
      firstName
    }
  }
}
    `)
    .expectStatus(200)
    .expectJsonMatch({
        data: {
            Users: eachLike({
               id: like("66a1b82a07423f2f18c1fc08"),
               email: like ("cliente@ebac.art.br"),
               profile: {
                firstName: like("Josimari")
               }
            })
        }
    })
       
});
