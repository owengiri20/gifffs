import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import "./App.css";

const key = "gViuaMipCmarAjXSqD858yTKyXSwC269";
const gf = new GiphyFetch(key);

const App = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState("");
  const [explode, setExplode] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setExplode(false);
    }, 8000);
  }, [explode]);

  // fetches gifs
  const fetchGifs = (offset: number) =>
    gf.search(search || "hasbullah", { offset, limit: 10 });

  // gif click handler
  const onGifClick = (gif: any) => {
    setExplode(true);
    console.log(gif);
    setSelected(gif.images.downsized.url);
  };

  return (
    <div style={{ margin: "1rem" }}>
      {/* Search  */}
      <input
        placeholder="Type Something!"
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
        type="text"
        style={{
          margin: "3rem auto",
          display: "flex",
          fontSize: "3rem",
          border: 0,
          borderBottom: "1px solid white",
          color: "white",
        }}
      />

      {selected && (
        <div>
          <div>
            <img
              style={{ height: 300, margin: "3rem auto", display: "flex" }}
              src={selected}
              key={selected}
              alt=""
            />
            {explode && <ConfettiExplosion />}
          </div>
        </div>
      )}
      {/* Picker */}
      <div
        style={{
          margin: "auto",
          height: "400px",
          width: "740px",
          overflow: "auto",
        }}
      >
        <Grid
          hideAttribution
          key={search}
          onGifClick={(g, e) => {
            onGifClick(g);
          }}
          className="gif-thing"
          width={700}
          noLink
          columns={5}
          fetchGifs={fetchGifs}
        />
      </div>
    </div>
  );
};

export default App;
