FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# Copy everything else (Vite needs the code)
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
