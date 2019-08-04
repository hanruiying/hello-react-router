# hello-react-router<br>
## react-router的开发文档：https://reacttraining.com/react-router/web/api/matchPath/pathname<br>
## 配套视频文档：https://www.qiuzhi99.com/movies/react-router-4/498.html<br>
```
  // 解析?name='dasdg'&a='daaf'的数据结构
  方法一：
  // const params = new URLSearchParams(props.location.search);
  // console.log(params.get("name"));
  // console.log(params.get("a"));
  方法二：
  import queryString from 'query-string';
  // const values = queryString.parse(props.location.search);
  // console.log(values.name);
  // console.log(values.a);
  
```
