const { getConnection } = require("./db");

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

const tweetsQuery = async (author, message) => {
    async function main() {
        let connection;

        // try {
        //     connection = await getConnection();

            const query =
                `INSERT INTO tweets (author, message) VALUES (?, ?)`
            const params = [author, message]
            
            await performQuery(query, params)
    }
    (async () => {
        await main()
    })()
}

module.exports = tweetsQuery