let baseUrl: string = '';
if (process.env.NODE_ENV === 'development') {
  baseUrl = '/api/';
} else {
  baseUrl = 'http://home.yuandingbang.cn/mini/';
}
export const examApi: string = `${baseUrl}exam`;
export const coursesApi: string = `${baseUrl}exam/courses`;
export const reportApi: string = `${baseUrl}report`;
