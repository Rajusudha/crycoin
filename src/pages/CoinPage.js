import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loading from "../components/common/Loading/Loading";
import Header from "../components/common/Header/Header";
import Footer from "../components/common/Footer/Footer";
import List from "../components/DashboardComponent/ListComponent/List";
import { getCoinData } from "../function/getCoinData";
import { getCoinPrices } from "../function/getCoinPrices";

import LineChart from "../components/Coin/LineChart";
import CoinInfo from "../components/Coin/CoinInfo";
import SelectDays from "../components/Coin/SelectDays";
import TogglePrice from "../components/Coin/Toggle/Toggle";

import { setChartDataFunction } from "../function/setChartDataFunction";
import { setCoinDataFunction } from "../function/setCoinDataFunction";

function CoinPage() {
  const { id } = useParams();

  const [coin, setCoin] = useState({});
  const [days, setDays] = useState(120);
  const [loading, setLoading] = useState(true);
  const [priceType, setPriceType] = useState("prices");

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{}],
  });

  useEffect(() => {
    if (!id) return;

    const getData = async () => {
      const data = await getCoinData(id);
      const prices = await getCoinPrices(id, days, priceType);

      if (data) {
        setCoinDataFunction(setCoin, data);
        setLoading(false);
      }

      if (prices) {
        setChartDataFunction(setChartData, prices);
      }
    };

    getData();
  }, [id, days, priceType]); // ✅ All dependencies declared

  const handleDaysChange = async (event) => {
    const value = event.target.value;
    setDays(value);
    const prices = await getCoinPrices(id, value, priceType);
    if (prices) {
      setChartDataFunction(setChartData, prices);
    }
  };

  const handlePriceChange = async (event) => {
    const value = event.target.value;
    setPriceType(value);
    const prices = await getCoinPrices(id, days, value);
    if (prices) {
      setChartDataFunction(setChartData, prices);
    }
  };

  return (
    <div>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="grey-container">
            <List coin={coin} delay={0.5} />
          </div>
          <div className="grey-container">
            <SelectDays days={days} handleChange={handleDaysChange} />
            <TogglePrice priceType={priceType} handleChange={handlePriceChange} />
            <LineChart chartData={chartData} priceType={priceType} />
          </div>
          <div className="grey-container" style={{ marginBottom: "2rem" }}>
            <CoinInfo name={coin.name} desc={coin.desc} />
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default CoinPage;
