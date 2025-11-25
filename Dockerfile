FROM node:20-slim AS development

WORKDIR /app

# Copy package files
COPY package.json ./

# Cài dependencies
RUN yarn install --frozen-lockfile

# Copy toàn bộ source
COPY . .

# Build React
RUN yarn build

# Chỉ giữ lệnh shell mặc định
CMD ["sh"]
