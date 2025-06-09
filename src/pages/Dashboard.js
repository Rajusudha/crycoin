
import React, { useEffect, useState } from "react";
import Header from "../components/common/Header/Header";
import Search from "../components/DashboardComponent/Search/Search";
import Tabs from "../components/DashboardComponent/Tabs/Tabs";
import Loading from "../components/common/Loading/Loading";
import PaginationComponent from "../components/DashboardComponent/paginationComponent/pagination";
import Footer from "../components/common/Footer/Footer";
import { getCoins } from "../function/getCoins";
// import TopButton from "../components/common/TopButton/topButton";
import Button from "../components/common/Button/Button";
import TopButton from "../components/common/TopButton/TopButton";

function Dashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCoins, setPageCoins] = useState([]);

  const filteredCoins = data.filter(
  (item) =>
    item.symbol.toLowerCase().includes(search.toLowerCase()) ||
    item.name.toLowerCase().includes(search.toLowerCase())
);


  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await getCoins();
    if (response) {
      setData(response);
      setLoading(false);
      setPageCoins(response.slice(0, 10));
    }
  };

  const handleChange = (event, value) => {
    setPageNumber(value);
    setPageCoins(data.slice((value - 1) * 10, (value - 1) * 10 + 10));
  };

  return (
    <div>
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <>
          <Search search={search} setSearch={setSearch} />
          {search && filteredCoins.length === 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                minHeight: "80vh",
              }}
            >
              <h1 style={{ textAlign: "center" }}>No Results Found</h1>
              <p style={{ textAlign: "center", color: "var(--grey)" }}>
                Could not find what you were looking for...
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
                  <Button text="Clear Search" onClick={() => setSearch("")} />
                </a>
              </div>
            </div>
          ) : (
            <Tabs data={search ? filteredCoins : pageCoins} />
          )}
          {!search && (
            <PaginationComponent
              pageNumber={pageNumber}
              handleChange={handleChange}
            />
          )}
          <Footer />
        </>
      )}
      <TopButton />
    </div>
  );
}

export default Dashboard;
