import Taro from '@tarojs/taro'

const session: string = "psqgaLC6HfQGkuwoSqhonIgR_vi0C5XGwr2hF93N9COxn3SijoDJLHWc5kaq011j";
let Server: any = async function (obj: any) {
  try {
    Taro.showLoading({
      title: 'loading',
      mask: true,
    });
    let result = await Taro.request({
      url: obj.url,
      method: 'POST',
      mode:'no-cors',
      data: {...obj.data, 'access-token': session},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      }
    });
    if (+result.data.code) {
      throw result.data.msg
    }
    return result;
  } catch (err) {
    console.log(`err is is ${err}`);
    throw err
  } finally {
    Taro.hideLoading();
  }
};
export {Server}
