describe('Basic Tests', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should be ok', async () => {
    await waitFor(element(by.id('example-screen'))).toExist().withTimeout(5000);
  });

  it('should fail', async () => {
    await expect(element(by.id('does-not-exist'))).toExist();
  });
});
