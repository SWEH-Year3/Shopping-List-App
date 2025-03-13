// import React,{ useState, useEffect, PureComponent } from "react";
// import { Flex, Button, Text, Strong} from '@radix-ui/themes';
// import { QRCodeSVG } from "qrcode.react";
// import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Html5QrcodeScanner } from "html5-qrcode";
// import './App.css';
// import logo from "./assets/Logo.jpeg";

// const App = () =>
// {

//     let [counter, setCounter] = useState(0);
//     let [scannedData, setScannedData] = useState(0);
//     let [Scanner, setScanner] = useState(null);
//     let inc = () => { setCounter(counter + 1); }
//     let dec = () => { setCounter(counter - 1); }
//     const stopScanning = () => {
//       if (Scanner) {
//         Scanner.clear();
//         setScanner(null);
//       }
//     };
    
//     useEffect(() => {
//         let scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
//         setScanner(scanner);
//     //   const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
//     //   setScanner(scanner);

//         if (scanner) {
//             scanner.render(
//                 (decodedText) => {
//                     setScannedData(decodedText);
          
//                 },
//                 (errorMessage) => {
//                     console.log("QR Code Scan Error: ", errorMessage);
            
//                 }
//             );
//         }
//         // if (scanner) {
//         //     scanner.render(
//         //         (decodedText) => {
//         //             setScannedData(decodedText);
          
//         //         },
//         //         (errorMessage) => {
//         //             console.log("QR Code Scan Error: ", errorMessage);
            
//         //         }
//         //     );
//         // }
//       return () => scanner.clear();
//     }, []);
    

//     return (
//       <>
//         <div
//           id="Card"
//                 style={{
//                 margin: "1em",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             height: "100dvh",
//             alignItems: "center",
//           }}
//         >
//           <TestGraph count={counter} /><br/>
//           <hr />
//           <QRCodeSVG
//             value={JSON.stringify({ ID: Math.round(counter) })}
//             size="250"
//             imageSettings={{
//               // eslint-disable-next-line no-undef
//               src: logo,
//               height: 50,
//               width: 50,
//               excavate: true,
//                     }}
            
//           />
//           <hr />
//           <Text>Result: </Text>
//                 <div id="reader" width="600px"></div>
//                 <br />
//                 <br />
//                 <br />
//                 <div>{ scannedData }</div>
//           <hr />
//           <Flex direction="column" gap="2">
//             <Text className="Title">
//               <Strong>Counter: </Strong> {counter}
//             </Text>

//             <Button onClick={inc} className="btn">
//               +
//             </Button>

//             <Button onClick={dec} className="btn">
//               -
//             </Button>
//             <Button onClick={stopScanning} className="btn">
//               Stop Scan
//             </Button>
//           </Flex>
//         </div>
//       </>
//     );
// }

// class TestGraph extends PureComponent {
//   render() {
//     return (
//       <ResponsiveContainer width="50%" height="50%">
//         <BarChart
//           width={500}
//           height={300}
//           data={[{counts: this.props.count, name:"Counter"}]}
//           margin={{
//             top: 5,
//             right: 0,
//             left: 0,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar
//             dataKey="counts"
//             fill="#82ca9d"
//             activeBar={<Rectangle fill="gold" stroke="purple" />}
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     );
//   }
// }
// export default App;



const App = () => {
  return (
    <div>
      <h1>App</h1>
    </div>
  );
};

export default App;