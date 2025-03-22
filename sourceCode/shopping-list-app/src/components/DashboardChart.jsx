import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DashboardChart({ data }) {
    // 
    // let data2 = !data? data.map((item) => ({ created_at: item.name, Quantity: item.totalQuantity })):[];
    let data2 = [{
        created_at: 'Jan',
        Quantity: 10
    }, {
        created_at: 'Feb',
        Quantity: 20
    }, {
        created_at: 'Mar',
        Quantity: 30
    }];
    
    return (
        <>
            {data.length > 0 ? (<ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date_stamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Quantity" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>): ( <h3>no data</h3> ) }
      
    </>
    );
}
