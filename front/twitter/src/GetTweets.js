import Moment from 'react-moment';
import 'moment/locale/es';
import { useEffect, useState } from 'react';
import './GetTweets.css'
import { Bar } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2';


function GetTweets() {

    const [data, setData] = useState([])
    // Configuración de los gráficos
    const english = data.filter(e => e.lang === 'en')
    const spanish = data.filter(e => e.lang === 'es')
    const portuguese = data.filter(e => e.lang === 'pt')
    const french = data.filter(e => e.lang === 'fr')
    const italian = data.filter(e => e.lang === 'it')
    const retweet = data.filter(r => r.retweeted === true)
    const notretweet = data.filter(r => r.retweeted === false)

    const info = {
        labels: ['Inglés', 'Español', 'Portugués', 'Francés', 'Italiano'],
        datasets: [
            {
                label: 'Tweets por lenguaje',
                backgroundColor: 'rgba(155,89,12,0.8)',
                data: [english.length, spanish.length, portuguese.length, french.length, italian.length]
            }
        ]
    }

    const donut = {
        labels: ['Sí', 'No'],
        datasets: [{
            data: [retweet.length, notretweet.length],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
            ]
        }]
    }
    // Recibir datos de la api
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
        }
        fetchData()
    }, [])

    if (!data) return 'Cargando'

    return (
        <main className="tweet-main" key={data.id}>
            {data.length >= 1 &&
                <div>
                    <div>
                        <h2>Tweets más recientes:</h2>
                        <div className="tweet-card">
                            <span className="tweet-card-author">
                                <p>{data[0].user.name} ha twitteado <Moment fromNow>{data.created_at}</Moment>:</p>
                            </span>
                            <span className="tweet-card-message">
                                {data[0].text}
                            </span>
                        </div>
                        <div className="tweet-card">
                            <span className="tweet-card-author">
                                <p>{data[1].user.name} ha twitteado <Moment fromNow>{data.created_at}</Moment>:</p>
                            </span>
                            <span className="tweet-card-message">
                                {data[1].text}
                            </span>
                        </div>
                        <div className="tweet-card">
                            <span className="tweet-card-author">
                                <p>{data[2].user.name}ha twitteado <Moment fromNow>{data.created_at}</Moment>:</p>
                            </span>
                            <span className="tweet-card-message">
                                {data[2].text}
                            </span>
                        </div>
                    </div>
                    <div>
                        {data &&
                            <div>
                                <div className="get-tweets">
                                    <h2>Últimos 100 tweets:</h2>
                                    {data.map(tweet =>
                                        <table className="tweet-box">
                                            <tr className="tweet-box-header">
                                                <th>Fecha:</th>
                                                <th>Usuario</th>
                                                <th>Mensaje</th>
                                            </tr>
                                            <tr className="tweet-content">
                                                <td><Moment format='DD/MM/YYYY'>{tweet.created_at}</Moment></td>
                                                <td className="tweet-box-author"> {tweet.user.name}</td>
                                                <td>{tweet.text}</td>
                                            </tr>
                                        </table>
                                    )}
                                </div>
                            </div>
                        }
                    </div>
                    <h2>Gráficos:</h2>
                    <Bar data={info} />
                    <h5>Tweets retweetados<Doughnut data={donut} /></h5>
                </div>
            }
        </main>
    )
}

export default GetTweets;