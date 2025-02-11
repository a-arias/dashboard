describe('Connection with Websockets', { tags: ['@setup'] }, () => {
  const CATTLE_TEST_URL = '';
  const NAMESPACE = '';
  const POD_NAME = '';
  const CONTAINER_NAME = '';
  const firstCommand = 'mkdir test-directory && echo "Directory created successfully"';
  const secondCommand = 'ls | sed \'s/\x1b\\[([0-9,A-Z]{1,2}(;[0-9,A-Z]{1,2})?(;[0-9,A-Z]{3})?)?[m|K]//g\'\n';
  const thirdCommand = 'rm -rf test-directory6 && echo "Directory deleted successfully"';
  const BEARER_TOKEN = '';

  it('should create a new folder', () => {
    cy.setupWebSocket(CATTLE_TEST_URL, NAMESPACE, POD_NAME, CONTAINER_NAME, firstCommand, BEARER_TOKEN).then((messages) => {
      cy.log('Received messages:', messages);
      // ##Asserts the create new directory command was successful.
      expect(messages[2]).to.include('Directory created successfully');
    });
  });
  it('should validate the folder name', () => {
    cy.setupWebSocket(CATTLE_TEST_URL, NAMESPACE, POD_NAME, CONTAINER_NAME, secondCommand, BEARER_TOKEN).then((messages) => {
      cy.log('Received messages:', messages);
      // ##Asserts that the folder created on test one exists.
      expect(messages[2]).to.include('test-directory');
    });
  });
  it('should delete the folder', () => {
    cy.setupWebSocket(CATTLE_TEST_URL, NAMESPACE, POD_NAME, CONTAINER_NAME, thirdCommand, BEARER_TOKEN).then((messages) => {
      cy.log('Received messages:', messages);
      // ##Asserts the delete command was successful.
      expect(messages[2]).to.include('Directory deleted successfully');
    });
  });
});
