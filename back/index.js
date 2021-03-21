require('dotenv').config();
const express = require('express')
const app = express()
const Twit = require ('twit');
const { getConnection } = require("./db");

app.use(require('cors')());
app.use(require('body-parser').json());

const performQuery = async (query, params) => {
    let connection;
    console.log(query)

    try {
        connection = await getConnection();

        const [result] = await connection.query(query, params)

        return result;
    } catch (e) {
        throw new Error('database-error')
    } finally {
        if (connection) {
            connection.release()
        }
    }
}

app.get ('/tweets', (req, res) => {
    const T = new Twit({
        consumer_key: process.env.consumer_key,
        consumer_secret: process.env.consumer_secret,
        access_token: process.env.access_token,
        access_token_secret: process.env.access_token_secret,
    });
    T.get('search/tweets', { q: '#covid', count: 100 }, function async (err, data, response) {
        for (i = 0; i < data.statuses.length; i++) {
            const author = data.statuses[i].user.name
            const message = data.statuses[i].text
            const date = data.statuses[i].created_at

                async function main() {
                    let connection;
            
                        // connection = await getConnection();
            
                        const query =
                            `INSERT INTO tweets (author, message, date) VALUES (?, ?)`
                        const params = [author, message, date]
                        
                        await performQuery(query, params)
                }
                (async () => {
                    await main()
                })()
        }
        res.send(data)
    });
})

// Servidor de .env
const envPort = process.env.PORT
// Servidor por defecto
const defaultPort = 3002

const currentPort = envPort || defaultPort

app.listen(currentPort)
console.log(`Running on port ${currentPort}`)