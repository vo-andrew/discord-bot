FROM nikolaik/python-nodejs:latest

WORKDIR /app/src

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY package.json .

RUN npm install

COPY . .

CMD ["node", "index.js"]