# 在线问卷系统

一个现代化的在线问卷调查系统，支持创建、发布、填写和统计问卷。

## 技术栈

### 前端
- **框架**: React 19
- **状态管理**: 
  - Redux Toolkit
  - React Redux
- **路由**: React Router DOM v6
- **UI组件**: 
  - 自定义组件
  - ECharts (数据可视化)
- **表单处理**: 
  - React Hook Form
  - Yup (表单验证)
- **HTTP请求**: Axios
- **安全性**: DOMPurify (防XSS攻击)
- **其他工具**:
  - React Helmet (文档头管理)

### 开发工具
- **构建工具**: Vite
- **包管理器**: npm/yarn
- **代码质量**:
  - ESLint
  - 各种 ESLint 插件

### 后端 Mock
- **Mock服务**: json-server
- **Mock数据生成**: Mockjs

## 主要功能

1. **用户系统**
   - 用户注册
   - 用户登录
   - 权限控制

2. **问卷管理**
   - 创建问卷
   - 编辑问卷
   - 发布问卷
   - 删除问卷

3. **题目类型支持**
   - 单选题
   - 多选题
   - 填空题
   - 打分题
   - 定位题
   - 更多题型开发中...

4. **数据统计**
   - 问卷结果统计
   - 数据可视化展示

5. **其他特性**
   - 路由懒加载
   - 响应式设计
   - 表单验证
   - XSS 防护

## 项目结构

```
my-survey/
├── src/                # 源代码目录
│   ├── components/     # 组件
│   ├── pages/         # 页面
│   ├── store/         # Redux store
│   ├── router/        # 路由配置
│   └── api/           # API 接口
├── public/            # 静态资源
├── dist/             # 构建输出目录
└── vite.config.js    # Vite 配置
```

## 开发环境设置

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 启动 Mock 服务器：
```bash
npm run serve:db
```

## 构建部署

构建生产版本：
```bash
npm run build
```

## 注意事项

- 确保 Node.js 版本兼容
- 需要同时运行前端开发服务器和 Mock 服务器
- 默认 Mock 服务器端口为 3000
