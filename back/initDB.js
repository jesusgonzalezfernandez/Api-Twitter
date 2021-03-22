const { getConnection } = require("./db");

async function main() {
            let connection;
    
            try {
                connection = await getConnection();
    
                await connection.query("DROP TABLE IF EXISTS tweets");
    
                await connection.query(`
                CREATE TABLE if not exists tweets (
                    id int unsigned auto_increment primary key,
                    author varchar(500) not null,
                    message varchar(500) not null,
                    date date
                    );
                  `);
    
    
                await connection.query(
                    `insert into tweets (author, message) values (?, ?)`,
                )
            } catch (e) {
                console.log('Some error ocurred:', e)
            } finally {
                if (connection) {
                    connection.release();
                }
                process.exit();
            }
        }
        (async()=>{
            await main()
        })()