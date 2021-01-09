FROM nikolaik/python-nodejs:latest

WORKDIR /app/src

COPY . .

RUN pip install --no-cache-dir -r requirements.txt && npm install

CMD ["node", "index.js"]