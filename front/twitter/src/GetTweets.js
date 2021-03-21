import Moment from 'react-moment';
import { useEffect, useState } from 'react';
import './GetTweets.css'
import Charts from './Charts'

function GetTweets() {

    const [data, setData] = useState([])


    useEffect(() => {
        async function fetchData() {
            // Enviar consulta a la API
            const res = await fetch('http://localhost:3001/tweets',
                // Contenido
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'GET'
                })
            const data = await res.json()
            setData(data.statuses)
            console.log(data.statuses[0].text)
        }
        fetchData()
    }, [data])

    if (!data) return 'Cargando'

    return (
        <main className="tweet main" key={data.id}>
            {data.length >=1 &&
                <div>
                    <div>
                        <div className="tweet-card">
                            {data[0].user.name}
                            {data[0].text}
                        </div>
                        <div className="tweet-card">
                            {data[1].user.name}
                            {data[1].text}
                        </div>
                        <div className="tweet-card">
                            {data[2].user.name}
                            {data[2].text}
                        </div>
                    </div>
                    <div>
                        {data &&
                            <div>
                                <div className="get-tweets">
                                    {data.map(tweet =>
                                        <table className="tweet-box">
                                            <tr className="tweet-box-header">
                                                <th>Fecha:</th>
                                                <th>Usuario</th>
                                                <th>Mensaje</th>
                                            </tr>
                                            <tr className="tweet-content">
                                                <td><Moment format='DD/MM/YYYY'>{tweet.created_at}</Moment></td>
                                                <td> {tweet.user.name}</td>
                                                <td>{tweet.text}</td>
                                            </tr>
                                        </table>
                                    )}
                                </div>
                            </div>
                        }
                    </div>
                    <div><Charts></Charts></div>
                </div>
            }
        </main>
    )
}

export default GetTweets;