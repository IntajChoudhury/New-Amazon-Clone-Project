import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

        <div className="home__row">
          <Product
            id="1232141"
            title="Casio G-Shock Analog Multicolor Dial Men's Watch-MTG-B3000FR-1ADR"
            image="https://m.media-amazon.com/images/I/71ElTIBadaL._SX679_.jpg"
            price={95281}
            rating={5}
          />
          <Product
            id="49538094"
            title="Apple 2022 12.9-inch iPad Pro (Wi-Fi + Cellular, 2TB) - Space Grey (6th Generation)"
            image="https://m.media-amazon.com/images/I/81hAx31maUL._SL1500_.jpg"
            price={150999}
            rating={5}
          />
        </div>

        <div className="home__row">
          <Product
            id="4903850"
            title="TACVASEN Men's Hooded Quilted Lined Flannel Shirt Jacket Plaid Button Down Shirts Zipper Jacket"
            image="https://m.media-amazon.com/images/I/713RuYrd0bL._SX679_.jpg"
            price={2200}
            rating={4}
          />
          <Product
            id="23445930"
            title="Glaceon Cat Beds for Indoor Cats - Cat Bed Cave with Removable Washable Cushioned Pillow, Soft Plush Premium Cotton No Deformation Pet Bed, Roomy Bear Cat House Design, Multiple Size"
            image="https://m.media-amazon.com/images/I/41usxqAcilL._SX300_SY300_QL70_FMwebp_.jpg"
            price={1300}
            rating={2}
          />
          <Product
            id="3254354345"
            title="Creed Aventus Perfume Spray for Men's (100ml)"
            image="https://m.media-amazon.com/images/I/519sP9WD+rL._SL1280_.jpg"
            price={22650}
            rating={4}
          />
        </div>

        <div className="home__row">
          <Product
            id="90829332"
            title="LG 45 Ultragear OLED Gaming Monitor, WQHD(3440 x 1440), Incredible Speed @240Hz & 0.03ms, DCI-P3 98.5%, Anti-Glare, G-SYNC Compatible, FreeSync Premium, RGP Lighting, PBP, PIP, HDMI, DP (45GR95QE)"
            image="https://m.media-amazon.com/images/I/71U39pazQqL._SX679_.jpg"
            price={84999}
            rating={3}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
