Feature('Selected Name Details', { retries: 3 });

Scenario('user edits name details for unprotected', function*(I) {
  I.login();
  const newUnprotectedName = yield I.createFakeName();
  I.createNewUnprotectedName(newUnprotectedName);

  const editName = yield I.createFakeName();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editName');
    I.fillField('firstName', editName.firstName);
    I.fillField('lastName', editName.lastName);
    I.fillField('phone', editName.phone);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitToHide('.names__overlay');
  I.waitForElement('#unprotectedNamesList');
  I.waitForVisible('#appNotification');
  within('#unprotectedNamesList .name:nth-of-type(1)', () => {
    I.see(editName.firstName);
    I.see(editName.lastName);
    I.see(editName.phone);
  });
});

Scenario('user edits name details for protected', function*(I) {
  I.login();
  const newProtectedName = yield I.createFakeName();
  I.createProtectedName(newProtectedName);

  const editName = yield I.createFakeName();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editName');
    I.fillField('phone', editName.phone);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitToHide('.names__overlay');
  I.waitForElement('#protectedNamesList');
  I.waitForVisible('#appNotification');
  within('#protectedNamesList .name:nth-of-type(1)', () => {
    I.see(editName.phone);
  });
});

Scenario('user edits name details for met with protected', function*(I) {
  I.login();
  const newMetWithProtectedName = yield I.createFakeName();
  I.createMetWithProtectedName(newMetWithProtectedName);

  const editName = yield I.createFakeName();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editName');
    I.fillField('phone', editName.phone);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitToHide('.names__overlay');
  I.waitForElement('#metWithProtectedNamesList');
  I.waitForVisible('#appNotification');
  within('#metWithProtectedNamesList .name:nth-of-type(1)', () => {
    I.see(editName.phone);
  });
});

Scenario('user edits name details for client', function*(I) {
  I.login();
  const newClient = yield I.createFakeName();
  I.createClient(newClient);

  const editName = yield I.createFakeName();
  I.waitForVisible('#selectedName');
  within('#selectedName', () => {
    I.click('#editName');
    I.fillField('phone', editName.phone);
    I.click('#standardSubmit[type="submit"]');
  });

  I.waitToHide('.names__overlay');
  I.waitForElement('#clientsNamesList');
  I.waitForVisible('#appNotification');
  within('#clientsNamesList .name:nth-of-type(1)', () => {
    I.see(editName.phone);
  });
});
