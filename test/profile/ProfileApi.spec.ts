import { expect } from 'chai';
import { WA_TEST_PASS, WA_TEST_USER } from '../../src/utils/config';
import { WolkREST } from '../../src/wolk-rest';
import { getAuthenticatedWolkRestInstance, getRandomString, isTypeofBoolean } from '../utils';

describe('Profile API', () => {
  let wolkRest: WolkREST;

  before(async () => {
    wolkRest = await getAuthenticatedWolkRestInstance();
  });

  context('[PUT] /api/users/me', async () => {
    it('Should update current user: first and last name', async () => {
      const userUpdateDto = {
        firstName: getRandomString(),
        lastName: getRandomString()
      };
      const { status } = await wolkRest.profile().userUpdateName(userUpdateDto);

      expect(status).to.equal(200);
    });
  });

  context('[GET] /api/users/me', async () => {
    it('Should get current user', async () => {
      const { status, data: userDetails } = await wolkRest.profile().getProfile();

      expect(status).to.equal(200);
      expect(userDetails.email).to.be.a('string');
      expect(userDetails.active).to.satisfy(isTypeofBoolean);
    });
  });

  context('[PUT] /api/users/me', async () => {
    it('Should update current user: first name, last name and email', async () => {
      const userUpdateDto = {
        firstName: getRandomString(),
        lastName: getRandomString(),
        email: WA_TEST_USER
      };
      const { status } = await wolkRest.profile().userUpdate(userUpdateDto);

      expect(status).to.equal(200);
    });
  });

  context('[GET] /api/users/me/endpoints', async () => {
    it('Should get list of endpoints', async () => {
      const { status, data: endpointsList } = await wolkRest.profile().myEndpoints('WEB_SOCKET');

      expect(status).to.equal(200);
      expect(endpointsList).to.be.an.instanceof(Array);
    });
  });

  context('[POST] /api/users/me/httpPublishingKey', async () => {
    it('Should get Access Key', async () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);
      const { status } = await wolkRest.profile().getAccessKey(futureDate.getTime());

      expect(status).to.equal(200);
    });
  });

  context('[PUT] /api/users/me/passwordChange', async () => {
    it('Should change current user password', async () => {
      const passwordChangeDto = {
        oldPassword: WA_TEST_PASS,
        newPassword: WA_TEST_PASS,
        username: WA_TEST_USER
      };
      const { status } = await wolkRest.profile().passwordChange(passwordChangeDto);

      expect(status).to.equal(200);
    });
  });

  context('[GET] /api/users/me/permissions', async () => {
    it('Should get current users permissions', async () => {
      const { status, data: permissionsList } = await wolkRest.profile().myPermissions();

      expect(status).to.equal(200);
      expect(permissionsList).to.be.an.instanceof(Array);
    });
  });
});
