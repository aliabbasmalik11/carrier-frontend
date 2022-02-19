import axios from 'axios';

let baseUrl = process.env.REACT_APP_BASE_API_URL;
baseUrl = baseUrl.endsWith('/')
  ? baseUrl.substring(0, baseUrl.length - 1)
  : baseUrl;


const request = async ({
  path,
  opts = {},
  onSuccess = () => { },
  onFailure = () => { },
  onFinally = () => { },
}) => {
  try {
    const res = await axios({
      url: `${baseUrl}/api/${path}`,
      ...opts,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    onSuccess();
    onFinally();
    return res.data;
  } catch(err){
    onFailure(err);
    onFinally();
  }
}

export default request;
