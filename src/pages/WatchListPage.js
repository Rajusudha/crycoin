import React, { useEffect, useState } from "react";
import Header from "../components/common/Header/Header";
import Search from "../components/DashboardComponent/Search/Search";
import Tabs from "../components/DashboardComponent/Tabs/Tabs";
import Footer from "../components/common/Footer/Footer";
import { getCoins } from "../function/getCoins";
// import TopButton from "../components/common/TopButton/topButton";
import Button from "../components/common/Button/Button";
import TopButton from "../components/common/TopButton/TopButton";

function WatchListPage() {
  const watchlist = localStorage.getItem("watchlist")
    ? localStorage.getItem("watchlist").split(",")
    : [];

  const [coins, setCoins] = useState([]);

  useEffect(() => {
    console.log("watchlist was changed");
  }, [watchlist]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await getCoins();
    var myCoins = response.filter((coins) => watchlist.includes(coins.id));
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