function executeWebSocket(command: string, podName: string, namespace: string, containerName: string) {
  const websocketUrl = Cypress.env('api').replace('https', 'wss');
  const bearerToken = '';

  return cy.setupWebSocket(
    websocketUrl,
    namespace,
    podName,
    containerName,
    command,
    bearerToken
  );
}

describe('Create node and pod', { tags: ['@adminUser', '@standardUser', '@explorer'] }, () => {
  before(() => {
    cy.login();
  });
  let podName = `e2e-test`;
  const projName = `project${ +new Date() }`;
  const nsName = `namespace${ +new Date() }`;

  it('should create a new pod', () => {
    // get user id
    cy.getRancherResource('v3', 'users?me=true').then((resp: Cypress.Response<any>) => {
      const userId = resp.body.data[0].id.trim();

      // create project
      cy.createProject(projName, 'local', userId).then((resp: Cypress.Response<any>) => {
        cy.wrap(resp.body.id.trim()).as('projId');

        // create ns
        cy.get<string>('@projId').then((projId) => {
          cy.createNamespaceInProject(nsName, projId);
        });

        // create pod
        // eslint-disable-next-line no-return-assign
        cy.createPod(nsName, podName, 'nginx:stable-alpine3.20-perl').then((resp) => {
          podName = resp.body.metadata.name;
          // eslint-disable-next-line
          cy.wait(2000);
        });
      });
    });
  });

  it('should create a new folder', () => {
    executeWebSocket('mkdir test-directory && echo "Directory created successfully"', podName, nsName, 'container-0').then((messages) => {
      expect(messages[2]).to.include('Directory created successfully');
    });
  });

  it('should validate the folder name', () => {
    executeWebSocket('ls', podName, nsName, 'container-0').then((messages) => {
      expect(messages[2]).to.include('test-directory');
    });
  });

  it('should delete the folder', () => {
    executeWebSocket('rm -rf test-directory && echo "Directory deleted successfully"', podName, nsName, 'container-0').then((messages) => {
      expect(messages[2]).to.include('Directory deleted successfully');
    });
  });
});
