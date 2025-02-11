function executeWebSocket(command: string) {
  const websocketUrl = 'wss://aarias.qa.rancher.space';
  const namespace = '';
  const podName = '';
  const containerName = '';
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

describe('Connection with Websockets', { tags: ['@setup'] }, () => {
  it('should create a new folder', () => {
    executeWebSocket('mkdir test-directory && echo "Directory created successfully"').then((messages) => {
      expect(messages[2]).to.include('Directory created successfully');
    });
  });

  it('should validate the folder name', () => {
    executeWebSocket('ls').then((messages) => {
      expect(messages[2]).to.include('test-directory');
    });
  });

  it('should delete the folder', () => {
    executeWebSocket('rm -rf test-directory && echo "Directory deleted successfully"').then((messages) => {
      expect(messages[2]).to.include('Directory deleted successfully');
    });
  });
});
