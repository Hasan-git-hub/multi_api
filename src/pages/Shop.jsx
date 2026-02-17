import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";

const SHOP_API = "https://fortniteapi.io/v2/shop?lang=en";
const SHOP_TOKEN = "8433a990-ea7d2f64-6d7e4e69-2fb02efc";

const Shop = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getShop = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.get(SHOP_API, {
        headers: {
          Authorization: SHOP_TOKEN,
        },
      });

      setItems(data.shop || []);
    } catch {
      setError("Toy Shop API dan ma'lumot olishda xatolik bo'ldi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getShop();
  }, []);

  return (
    <section className="section">
      <Header
        title="Toy Shop API Page"
        description="Fortnite Shop API orqali itemlar ko'rsatiladi."
      />

      <div className="control-bar">
        <button className="app-btn" type="button" onClick={getShop}>
          Refresh Shop
        </button>
      </div>

      {loading && <p className="status-text">Yuklanmoqda...</p>}
      {!loading && error && <p className="status-text error">{error}</p>}

      <div className="grid">
        {items.slice(0, 16).map((item, index) => {
          const image =
            item.displayAssets?.[0]?.url || item.granted?.[0]?.images?.icon;
          const price = item.price?.finalPrice ?? item.price?.regularPrice ?? "N/A";

          return (
            <article
              className="card"
              key={`${item.mainId || item.displayName || "shop-item"}-${index}`}
            >
              {image ? (
                <img src={image} alt={item.displayName || "Shop item"} />
              ) : (
                <div className="poster-fallback">Rasm mavjud emas</div>
              )}
              <div className="card-body">
                <h3>{item.displayName || item.mainId || "Noma'lum item"}</h3>
                <p>Narx: {price}</p>
                <p>
                  Rarity: {item.rarity?.name || item.rarity || "Noma'lum"}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Shop;
