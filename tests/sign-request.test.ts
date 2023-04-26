import { api_sign_request } from '../src/index.js';

describe('sign-request', () => {
  it('should sign the request identically to the Cloudinary SDK', async () => {
    const params = {
      timestamp: 1682547265,
      public_id: 'path/to/file.jpg',
    };
    const secret = 'cloudinary-secret';
    expect(await api_sign_request(params, secret))
      .toEqual('e6045a1d46e916d6de6f335de0adff7eb174752a');
  })
});
