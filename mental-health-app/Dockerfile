# 使用Node.js镜像作为构建环境
FROM node:16 AS build

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json用于安装依赖
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制剩下的项目文件
COPY . .

# 构建React项目
RUN npm run build

# 使用Nginx来提供静态文件
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# 暴露80端口用于访问
EXPOSE 80

# 启动Nginx服务
CMD ["nginx", "-g", "daemon off;"]