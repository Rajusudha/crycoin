import React, { useEffect, useState, useMemo } from "react";
import Header from "../components/common/Header/Header";
import Tabs from "../components/DashboardComponent/Tabs/Tabs";
import Footer from "../components/common/Footer/Footer";
import { getCoins } from "../function/getCoins";
import Button from "../components/common/Button/Button";
import TopButton from "../components/common/TopButton/TopButton";

function WatchListPage() {
  const watchlist = useMemo(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? saved.split(",") : [];
  }, []);

  const [coins, setCoins] = useState([]);

  useEffect(() => {
    console.log("watchlist was initialized");
  }, [watchlist]);

  useEffect(() => {
    getData();
  }, [watchlist]);

  const getData = async () => {
    const response = await getCoins();
    const myCoins = response.filter((coin) => watchlist.includes(coin.id));
    setCoins(myCoins);
  };

  return (
    <div>
      <Header />
      <div>
        {coins.length > 0 ? (
          <Tabs data={coins} />
        ) : (
          <div>
            <h1 style={{ textAlign: "center" }}>
              Your watchlist is Currently Empty
            </h1>
            <p style={{ textAlign: "center", color: "var(--grey)" }}>
              Please Add Coins in your watchlist
            </p>
            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <a href="/dashboard">
                <Button text="Dashboard" />
              </a>
            </div>
          </div>
        )}
      </div>
      <TopButton />
      <Footer />
    </div>
  );
}

export default WatchListPage;
