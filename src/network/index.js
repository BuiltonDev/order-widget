import agent from 'superagent';
import {ShareActor} from 'src/utils';

const API_URL = process.env.production ? 'https://api.shareactor.io' : 'https://qa.shareactor.io';

const authenticate = (idToken, profile) => {
  // TODO Remove mock
  return Promise.resolve();
  /*
  return agent
    .post(`${API_URL}/v2/users`)
    .set('Authorization', 'Bearer ' + idToken)
    .set('X-Share-Api-Key', ShareActor().apiKey)
    .send(profile);*/
};

export {
  authenticate
};
