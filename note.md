1. [TypeScript library starter](https://github.com/alexjoverm/typescript-library-starter): 它是一个开源的 TypeScript 开发基础库的脚手架工具，可以帮助我们快速初始化一个 TypeScript 项目.使用方式：

   ```shell
      git clone https://github.com/alexjoverm/typescript-library-starter.git ts-axios
      cd ts-axios
      npm install
   ```
2. 看看AxiosError这个在types/index.ts中定义了类型，真实的定义是在helpers/error.ts上。在src/index.ts中定义然后导出是为了在非源码的时候引入这个类型（如果TS不能中自动推断，它最后统一在index.ts中向外导出），在helpers/error.ts的真实定义是就是为了在源码中去使用
3. 留意下这里axios成为混合对象（本身是方法，然后又定义了很多方法），注意：

   1. 类型（AxiosInstance）的ts定义是如何写的
   2. axios混合对象的真实实现
