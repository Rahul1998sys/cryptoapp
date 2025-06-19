import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Coin from "./components/Coin";

function App() {
  const [ListOfCoins, setListOfCoins] =useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    Axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd").then((response) => {
        setListOfCoins(response.data); // log the data
        // console.log(response.data)
      })
  }, []);

  const filteredCoins = ListOfCoins.filter((coin) =>{
    return coin.name.toLowerCase().includes(searchWord.toLowerCase())
  })

  return (
    <div className="App">
      <div className="cryptoHeader">
        <input type="text" placeholder="enter bitcoin name" onChange={(event)=>{
          setSearchWord(event.target.value)
        }} />
      </div>
      <div className="cryptoDisplay">{filteredCoins.map((coin, idx)=>{
        return <Coin key= {idx} name={coin.name} image={coin.image} current_price={coin.current_price} symbol={coin.symbol} />
      })}</div>
    </div>
  );
}

export default App;
