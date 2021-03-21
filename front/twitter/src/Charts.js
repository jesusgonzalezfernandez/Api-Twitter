import { Bar } from 'react-chartjs-2'

function Charts() {

    const data = {
        labels: ['English', 'Spanish', 'Portuguese'],
        datasets: [
            {
                data: [0]
            }
        ]
    }

return (
    <div><Bar
        data={data}
        width={100}
        height={50}
        /></div>
)
}

export default Charts;