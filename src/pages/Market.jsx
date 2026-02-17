import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const MARKET_API =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=usd";

const coinLabels = {
  bitcoin: "Bitcoin",
  ethereum: "Ethereum",
  tether: "Tether",
  binancecoin: "Binance Coin",
};

const Market = () => {
  const [market, setMarket] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getMarket = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get(MARKET_API);
      setMarket(data || {});
    } catch {
      setError("Market API dan ma'lumot olishda xatolik bo'ldi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMarket();
  }, []);

  return (
    <section className="section">
      <Header
        title="Market API Page"
        description="CoinGecko API orqali kripto narxlari USD ko'rinishida chiqadi."
      />

      <div className="control-bar">
        <button className="app-btn" type="button" onClick={getMarket}>
          Refresh Market
        </button>
      </div>

      {loading && <p className="status-text">Yuklanmoqda...</p>}
      {!loading && error && <p className="status-text error">{error}</p>}

      <div className="grid">
        {Object.entries(market).map(([coin, value]) => (
          <article className="card" key={coin}>
            <div className="card-body">
              <h3>{coinLabels[coin] || coin}</h3>
              <p>USD: ${Number(value.usd || 0).toLocaleString()}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Market;
