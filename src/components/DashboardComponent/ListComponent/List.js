import React, { useState } from "react";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import "./list.css";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { motion } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import IconButton from "@mui/material/IconButton";
import { addToWatchlist, removeFromWatchlist } from "../../../function/watchlist";
import { Link } from "react-router-dom";

function List({ coin, delay }) {
  const isWatchlist = localStorage.getItem("watchlist")
    ? localStorage.getItem("watchlist").includes(coin.id)
    : false;

  const [isAdded, setIsAdded] = useState(false);

  return (
    <motion.tr
      className="list-row"
      initial={{ x: -10, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: delay }}
    >

      <Link to={`/coin/${coin.id}`}>
        <td className="td-img">
          <Tooltip title="Logo">
            <img src={coin.image} className="coin-logo" alt={`${coin.name} logo`} />
          </Tooltip>
        </td>
      </Link>

      <Link to={`/coin/${coin.id}`}>
        <td className="td-name-flex">
          <div className="name-flex">
            <Tooltip title="Symbol">
              <p className="coin-symbol name-text">{coin.symbol}</p>
            </Tooltip>
            <Tooltip title="Name">
              <p className="coin-name name-text">{coin.name}</p>
            </Tooltip>
          </div>
        </td>
      </Link>

      <Link to={`/coin/${coin.id}`}>
        <td className="td-chip-flex">
          {coin.price_change_percentage_24h > 0 ? (
            <Tooltip title="Percentage Change in 24 Hours">
              <div className="chip-flex">
                <div className="coin-chip percentage-text">
                  {coin.price_change_percentage_24h.toFixed(2) + " %"}
                </div>
                <TrendingUpRoundedIcon className="icon chip-icon" />
              </div>
            </Tooltip>
          ) : (
            <Tooltip title="Percentage Change in 24 Hours">
              <div className="chip-flex">
                <div className="coin-chip chip-red percentage-text">
                  {coin.price_change_percentage_24h.toFixed(2) + " %"}
                </div>
                <TrendingDownRoundedIcon className="icon chip-red chip-icon" />
              </div>
            </Tooltip>
          )}
        </td>
      </Link>

      <Link to={`/coin/${coin.id}`}>
        <td>
          <Tooltip title="Price">
            <p
              className="coin-price name-text"
              style={{
                color:
                  coin.price_change_percentage_24h < 0
                    ? "var(--red)"
                    : "var(--green)",
              }}
            >
              $ {coin.current_price.toLocaleString()}
            </p>
          </Tooltip>
        </td>
      </Link>

      <Link to={`/coin/${coin.id}`}>
        <td className="td-mkt-cap">
          <Tooltip title="Total Volume">
            <p>${coin.total_volume.toLocaleString()}</p>
          </Tooltip>
        </td>
      </Link>

      <Link to={`/coin/${coin.id}`}>
        <td className="td-mkt-cap">
          <Tooltip title="Market Capital">
            <p>${coin.market_cap.toLocaleString()}</p>
          </Tooltip>
        </td>
      </Link>

      <td>
        {isWatchlist || isAdded ? (
          <div
            className="bookmark-icon-div"
            onClick={() => {
              setIsAdded(false);
              removeFromWatchlist(coin.id);
            }}
          >
            <IconButton>
              <BookmarkRoundedIcon className="bookmark-icon" />
            </IconButton>
          </div>
        ) : (
          <div
            className="bookmark-icon-div"
            onClick={() => {
              setIsAdded(true);
              addToWatchlist(coin.id);
            }}
          >
            <IconButton>
              <BookmarkBorderRoundedIcon className="bookmark-icon" />
            </IconButton>
          </div>
        )}
      </td>
    </motion.tr>
  );
}

export default List;
