# Usar Node.js como base
FROM node:20

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Copiar arquivos do projeto
COPY package*.json ./
COPY . .

# Instalar dependências
RUN npm install

# Expor a porta usada pela API
EXPOSE 3333

# Comando para iniciar a aplicação
CMD ["npm", "dev"]
