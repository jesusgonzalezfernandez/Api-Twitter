import Moment from 'react-moment';
import { useEffect, useState } from 'react';
import './GetTweets.css'
import { Bar } from 'react-chartjs-2'
import {Doughnut} from 'react-chartjs-2';


function GetTweets() {

    const [data, setData] = useState([])
    const english = data.filter(e => e.lang === 'en')
    const spanish = data.filter(e => e.lang === 'es')
    const portuguese = data.filter(e => e.lang === 'pt')
    const french = data.filter(e => e.lang === 'fr')
    const italian = data.filter(e => e.lang === 'it')
    const retweet = data.filter(r => r.retweeted === true)
    const notretweet = data.filter(r => r.retweeted === false)
    console.log(notretweet.length)

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

    const VerticalBar = () => (
        <div><Bar
            data={info}
            />
            </div>
    )

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
        <main className="tweet main" key={data.id}>
            {data.length >= 1 &&
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
                    <VerticalBar/>
                    <Doughnut data={donut} />
                </div>
            }
        </main>
    )
}

export default GetTweets;