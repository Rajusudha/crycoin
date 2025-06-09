import React, { useEffect, useState, useCallback  } from "react";
// import { useParams } from "react-router-dom";

import Loading from "../components/common/Loading/Loading";
import Header from "../components/common/Header/Header";
import Footer from "../components/common/Footer/Footer";
import List from "../components/DashboardComponent/ListComponent/List";
import { getCoinData } from "../function/getCoinData";
import { getCoinPrices } from "../function/getCoinPrices";
import { getCoins} from "../function/getCoins";

import LineChart from "../components/Coin/LineChart";
import CoinInfo from "../components/Coin/CoinInfo";
import SelectDays from "../components/Coin/SelectDays";
import TogglePrice from "../components/Coin/Toggle/Toggle";





import { setChartDataFunction } from "../function/setChartDataFunction";
import { setCoinDataFunction } from "../function/setCoinDataFunction";


import SelectCoin from "../components/Coin/SelectCoin/SelectCoin";






function ComparePage() {
  const [coin1, setCoin1] = useState("bitcoin");
  const [coin2, setCoin2] = useState("ethereum");
  const [days, setDays] = useState(90);
  const [priceType, setPriceType] = useState("prices");
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coinData1, setCoinData1] = useState({});
  const [coinData2, setCoinData2] = useState({});

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{}],
  });
 const getCoinsData = useCallback(async () => {
  const response = await getCoins();
  setAllCoins(response);

  const data1 = await getCoinData(coin1);
  const data2 = await getCoinData(coin2);

  if (data1) setCoinDataFunction(setCoinData1, data1);
  if (data2) setCoinDataFunction(setCoinData2, data2);

  await getPrices(coin1, coin2, days, priceType);
  setLoading(false);
}, [coin1, coin2, days, priceType]);

useEffect(() => {
  getCoinsData();
}, [getCoinsData]);

  

  const getPrices = async (coin1, coin2, days, priceType) => {
    const prices1 = await getCoinPrices(coin1, days, priceType);
    const prices2 = await getCoinPrices(coin2, days, priceType);
    setChartDataFunction(setChartData, prices1, prices2);
  };

  const handleCoinChange = async (e, isCoin2) => {
    if (!isCoin2) {
      setCoin1(e.target.value);
      const data1 = await getCoinData(e.target.value);
      if (data1) {
        setCoinDataFunction(setCoinData1, data1);
        getPrices(e.target.value, coin2, days, priceType);
      }
    } else {
      setCoin2(e.target.value);
      const data2 = await getCoinData(e.target.value);
      if (data2) {
        setCoinDataFunction(setCoinData2, data2);
        getPrices(coin1, e.target.value, days, priceType);
      }
    }
  };

  const handlePriceChange = (event) => {
    setPriceType(event.target.value);
    getPrices(coin1, coin2, days, event.target.value);
  };

  return (
    <>
      <Header />
      <div className="div-flex">
        <p className="crypto-heading">Crypto 1</p>
        <SelectCoin
          coin={coin1}
          handleChange={(e) => handleCoinChange(e)}
          allCoins={allCoins.filter((coin) => coin.id !== coin2)}
        />
        <p className="crypto-heading">Crypto 2</p>
        <SelectCoin
          coin={coin2}
          handleChange={(e) => handleCoinChange(e, true)}
          allCoins={allCoins.filter((coin) => coin.id !== coin1)}
        />
        <SelectDays
          noText={true}
          days={days}
          handleChange={(e) => {
            setDays(e.target.value);
            getPrices(coin1, coin2, e.target.value, priceType);
          }}
        />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grey-container">
            <List coin={coinData1} />
          </div>
          <div className="grey-container">
            <List coin={coinData2} />
          </div>
          <div className="grey-container">
            <TogglePrice
              priceType={priceType}
              handleChange={handlePriceChange}
            />
            <LineChart
              chartData={chartData}
              mutliAxis={true}
              priceType={priceType}
            />
          </div>
          <div className="grey-container">
            <CoinInfo name={coinData1.name} desc={coinData1.desc} />
          </div>
          <div className="grey-container" style={{ marginBottom: "2rem" }}>
            <CoinInfo name={coinData2.name} desc={coinData2.desc} />
          </div>
        </>
      )}
      <Footer />
    </>
  );
}

export default ComparePage;