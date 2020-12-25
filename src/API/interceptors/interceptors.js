import {instance} from '../configs/instance';
instance.interceptors.request.use(function (configs) {
    console.log('configs', configs)
    return configs;
  }, function (error) {
    return Promise.reject(error);
  });

instance.interceptors.response.use(function (configs) {
  console.log('configs', configs)
  return configs;
}, function (error) {
  return Promise.reject(error);
});

