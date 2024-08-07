'use strict';

const { Sequelize, DataTypes, Model } = require('sequelize');
const dotenv = require('dotenv');
const path = require('path');
const appleData = require('./apple.json');
const nokiaData = require('./nokia.json');
const samsungData = require('./samsung.json');
const sonyData = require('./sony.json');

// Load environment variables from .env file
const sequelize = new Sequelize("du_an_dt_1","postgres", "Chinam2004@", {
    host: "localhost",
    dialect: "postgres",
    // other options
  });



// Define the PhoneByBrand model
class PhoneByBrand extends Model {}
PhoneByBrand.init({
    phone_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
      },
  brand_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
  },
  brand_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price:{
    type:DataTypes.INTEGER
  },
  stock_quantity :{
    type:DataTypes.INTEGER
  },
  
}, {
  sequelize,
  modelName: 'PhoneByBrand',
  tableName: 'phone_by_brand',
  createdAt:"created_at",
  updatedAt:"updated_at"
});

// Data to insert into phoneByBrand table
const phonesData = [{
    "brand_id": 48,
    "brand_name": "Apple",
    "id": "apple_iphone_13_pro_max-12789",
    "phone_name": "iPhone 13 Pro Max",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max-.jpg",
    "description": "Apple iPhone 13 Pro Max smartphone. Announced Sep 2021. Features 6.7″ display, Apple A15 Bionic chipset, 4352 mAh battery, 1024 GB storage, 6 GB RAM, Scratch-resistant ceramic glass.",
    "price": 41990000,
    "stock_quantity": 25000
},
{
    "brand_id": 48,
    "brand_name": "Apple",
    "id": "apple_iphone_13_mini-12790",
    "phone_name": "iPhone 13 Mini",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-mini.jpg",
    "description": "Apple iPhone 13 Mini smartphone. Announced Sep 2021. Features 5.4″ display, Apple A15 Bionic chipset, 2438 mAh battery, 512 GB storage, 4 GB RAM, Scratch-resistant ceramic glass.",
    "price": 24490000,
    "stock_quantity": 30000
},
{
    "brand_id": 48,
    "brand_name": "Apple",
    "id": "apple_ipad_pro_13_(2024)-12987",
    "phone_name": "iPad Pro 13 (2024)",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-13-2024.jpg",
    "description": "Apple iPad Pro 13 (2024) tablet. Announced May 2024. Features 13.0″ display, Apple M4 chipset, 10290 mAh battery, 2048 GB storage, 16 GB RAM, Scratch-resistant glass.",
    "price": 153650000,
    "stock_quantity": 20000
},
{
    "brand_id": 48,
    "brand_name": "Apple",
    "id": "apple_ipad_pro_11_(2024)-12986",
    "phone_name": "iPad Pro 11 (2024)",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-11-2024.jpg",
    "description": "Apple iPad Pro 11 (2024) tablet. Announced May 2024. Features 11.0″ display, Apple M4 chipset, 8160 mAh battery, 2048 GB storage, 16 GB RAM, Scratch-resistant glass.",
    "price": 127520000,
    "stock_quantity": 15000
},
{
    "brand_id": 48,
    "brand_name": "Apple",
    "id": "apple_ipad_pro_12.9_(2022)-11939",
    "phone_name": "iPad Pro 12.9 (2022)",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/apple-ipad-pro-129-2022.jpg",
    "description": "Apple iPad Pro 12.9 (2022) tablet. Announced Oct 2022. Features 12.9″ display, Apple M2 chipset, 10758 mAh battery, 2048 GB storage, 16 GB RAM, Scratch-resistant glass.",
    "price": 111000000,
    "stock_quantity": 18000
},
{
    "brand_id": 9,
    "brand_name": "Samsung",
    "id": "samsung_galaxy_watch_fe-13112",
    "phone_name": "Galaxy Watch FE",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-watch-fe-r.jpg",
    "description": "Samsung Galaxy Watch FE Android watch. Announced Jun 2024. Features 1.2″ display, Exynos W920 chipset, 247 mAh battery, 16 GB storage, 1.5 GB RAM, MIL-STD-810H compliant, Sapphire crystal glass.",
    "price": 6500000,
    "stock_quantity": 5000
  },
  {
    "brand_id": 9,
    "brand_name": "Samsung",
    "id": "samsung_galaxy_m35-13006",
    "phone_name": "Galaxy M35",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m35-.jpg",
    "description": "Samsung Galaxy M35 Android smartphone. Announced May 2024. Features 6.6″ display, Exynos 1380 chipset, 6000 mAh battery, 256 GB storage, 8 GB RAM, Unspecified.",
    "price": 4800000,
    "stock_quantity": 8000
  },
  {
    "brand_id": 9,
    "brand_name": "Samsung",
    "id": "samsung_galaxy_f55-12885",
    "phone_name": "Galaxy F55",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-f55.jpg",
    "description": "Samsung Galaxy F55 Android smartphone. Announced May 2024. Features 6.7″ display, Snapdragon 7 Gen 1 chipset, 5000 mAh battery, 256 GB storage, 12 GB RAM.",
    "price": 8900000,
    "stock_quantity": 3000
  },
  {
    "brand_id": 9,
    "brand_name": "Samsung",
    "id": "samsung_galaxy_c55-12945",
    "phone_name": "Galaxy C55",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-c55.jpg",
    "description": "Samsung Galaxy C55 Android smartphone. Announced Apr 2024. Features 6.7″ display, Snapdragon 7 Gen 1 chipset, 5000 mAh battery, 256 GB storage, 12 GB RAM.",
    "price": 8700000,
    "stock_quantity": 4000
  },
  {
    "brand_id": 9,
    "brand_name": "Samsung",
    "id": "samsung_galaxy_m55-12896",
    "phone_name": "Galaxy M55",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m55.jpg",
    "description": "Samsung Galaxy M55 Android smartphone. Announced Mar 2024. Features 6.7″ display, Snapdragon 7 Gen 1 chipset, 5000 mAh battery, 256 GB storage, 12 GB RAM.",
    "price": 8600000,
    "stock_quantity": 7000
  },
  {
    "brand_id": 9,
    "brand_name": "Samsung",
    "id": "samsung_galaxy_tab_s6_lite_(2024)-12897",
    "phone_name": "Galaxy Tab S6 Lite (2024)",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s6-lite-2024.jpg",
    "description": "Samsung Galaxy Tab S6 Lite (2024) Android tablet. Announced Mar 2024. Features 10.4″ display, 7040 mAh battery, 128 GB storage, 4 GB RAM.",
    "price": 6000000,
    "stock_quantity": 9000
  },
  {
    "brand_id": 9,
    "brand_name": "Samsung",
    "id": "samsung_galaxy_a55-12824",
    "phone_name": "Galaxy A55",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a55.jpg",
    "description": "Samsung Galaxy A55 Android smartphone. Announced Mar 2024. Features 6.6″ display, Exynos 1480 chipset, 5000 mAh battery, 256 GB storage, 12 GB RAM, Corning Gorilla Glass Victus+.",
    "price": 7500000,
    "stock_quantity": 6000
  },
  {
    "brand_id": 9,
    "brand_name": "Samsung",
    "id": "samsung_galaxy_a35-12705",
    "phone_name": "Galaxy A35",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-a35.jpg",
    "description": "Samsung Galaxy A35 Android smartphone. Announced Mar 2024. Features 6.6″ display, Exynos 1380 chipset, 5000 mAh battery, 256 GB storage, 8 GB RAM, Corning Gorilla Glass Victus+.",
    "price": 5300000,
    "stock_quantity": 11000
  },
  {
    "brand_id": 9,
    "brand_name": "Samsung",
    "id": "samsung_galaxy_m15-12833",
    "phone_name": "Galaxy M15",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m15.jpg",
    "description": "Samsung Galaxy M15 Android smartphone. Announced Mar 2024. Features 6.5″ display, Dimensity 6100+ chipset, 6000 mAh battery, 256 GB storage, 8 GB RAM.",
    "price": 5400000,
    "stock_quantity": 9500
  },
  {
    "brand_id": 9,
    "brand_name": "Samsung",
    "id": "samsung_galaxy_m14_4g-12862",
    "phone_name": "Galaxy M14 4G",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-m14-4g.jpg",
    "description": "Samsung Galaxy M14 4G Android smartphone. Announced Mar 2024. Features 6.7″ display, Snapdragon 680 4G chipset, 5000 mAh battery, 128 GB storage, 6 GB RAM.",
    "price": 4800000,
    "stock_quantity": 8500
  },
  {
    "brand_id": 9,
    "brand_name": "Samsung",
    "id": "samsung_galaxy_f15-12831",
    "phone_name": "Galaxy F15",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-f15-5g.jpg",
    "description": "Samsung Galaxy F15 Android smartphone. Announced Mar 2024. Features 6.6″ display, Dimensity 6100+ chipset, 6000 mAh battery, 128 GB storage, 8 GB RAM.",
    "price": 5200000,
    "stock_quantity": 10500
  },
  {
    "brand_id": 9,
    "brand_name": "Samsung",
    "id": "samsung_galaxy_s24_ultra-12771",
    "phone_name": "Galaxy S24 Ultra",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-ultra-5g-sm-s928-stylus.jpg",
    "description": "Samsung Galaxy S24 Ultra Android smartphone. Announced Jan 2024. Features 6.8″ display, Snapdragon 8 Gen 3 chipset, 5000 mAh battery, 1024 GB storage, 12 GB RAM, Corning Gorilla Armor.",
    "price": 13000000,
    "stock_quantity": 3000
  },
  {
    "brand_id": 9,
    "brand_name": "Samsung",
    "id": "samsung_galaxy_s24+-12772",
    "phone_name": "Galaxy S24+",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s24-plus-5g-sm-s926.jpg",
    "description": "Samsung Galaxy S24+ Android smartphone. Announced Jan 2024. Features 6.7″ display, Snapdragon 8 Gen 3 chipset, 4900 mAh battery, 512 GB storage, 12 GB RAM, Corning Gorilla Glass Victus 2.",
    "price": 12000000,
    "stock_quantity": 5200
  },
  {
    "brand_id": 9,
    "brand_name": "Samsung",
    "id": "samsung_galaxy_s23+-12689",
    "phone_name": "Galaxy S23+",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s23-plus-5g.jpg",
    "description": "Samsung Galaxy S23+ Android smartphone. Announced Jan 2024. Features 6.6″ display, Snapdragon 7 Gen 2+ chipset, 4800 mAh battery, 256 GB storage, 12 GB RAM, Corning Gorilla Glass Victus 2.",
    "price": 11500000,
    "stock_quantity": 11700
  },
  {
    "brand_id": 9,
    "brand_name": "Samsung",
    "id": "samsung_galaxy_note22-12730",
    "phone_name": "Galaxy Note22",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTvXGF2vnm2dMOA33QSKwRWi2RZqE1i6g68g&s",
    "description": "Samsung Galaxy Note22 Android smartphone. Announced Jan 2024. Features 6.8″ display, Snapdragon 8 Gen 3 chipset, 4500 mAh battery, 256 GB storage, 8 GB RAM, Corning Gorilla Glass Victus 2.",
    "price": 12500000,
    "stock_quantity": 8000
  },
  {
    "brand_id": 9,
    "brand_name": "Samsung",
    "id": "samsung_galaxy_tab_s8_ultra-12649",
    "phone_name": "Galaxy Tab S8 Ultra",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s8-ultra.jpg",
    "description": "Samsung Galaxy Tab S8 Ultra Android tablet. Announced Jan 2024. Features 14.6″ display, Snapdragon 8 Gen 1+ chipset, 12000 mAh battery, 1024 GB storage, 16 GB RAM.",
    "price": 27990000,
    "stock_quantity": 12500
  },
  {
    "brand_id": 9,
    "brand_name": "Samsung",
    "id": "samsung_galaxy_tab_s8+_11-12650",
    "phone_name": "Galaxy Tab S8+ 11",
    "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyCiCR2NwZzKMTxKAbBezXxutncVwFvR73rw&s",
    "description": "Samsung Galaxy Tab S8+ 11 Android tablet. Announced Jan 2024. Features 11″ display, Snapdragon 8 Gen 1+ chipset, 11000 mAh battery, 1024 GB storage, 12 GB RAM.",
    "price": 24990000,
    "stock_quantity": 15200
  },{
    "brand_id": 7,
    "brand_name": "Sony",
    "id": "sony_xperia_10_iv-11522",
    "phone_name": "Xperia 10 IV",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-10-iv.jpg",
    "description": "Sony Xperia 10 IV Android smartphone. Announced May 2022. Features 6.0″ display, Snapdragon 695 5G chipset, 5000 mAh battery, 128 GB storage, 6 GB RAM, Corning Gorilla Glass Victus.",
    "price": 14000000,
    "stock_quantity": 15000
},
{
    "brand_id": 7,
    "brand_name": "Sony",
    "id": "sony_xperia_pro-i-11174",
    "phone_name": "Xperia Pro-I",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-pro-i.jpg",
    "description": "Sony Xperia Pro-I Android smartphone. Announced Oct 2021. Features 6.5″ display, Snapdragon 888 5G chipset, 4500 mAh battery, 512 GB storage, 12 GB RAM, Corning Gorilla Glass Victus.",
    "price": 30000000,
    "stock_quantity": 20000
},
{
    "brand_id": 7,
    "brand_name": "Sony",
    "id": "sony_xperia_1_iv-11521",
    "phone_name": "Xperia 1 IV",
    "image_url": "https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-1-iv-.jpg",
    "description": "Sony Xperia 1 IV Android smartphone. Announced May 2022. Features 6.5″ display, Snapdragon 8 Gen 1 chipset, 5000 mAh battery, 512 GB storage, 16 GB RAM, Corning Gorilla Glass Victus.",
    "price": 32000000,
    "stock_quantity": 18000
}]






// Sync the model with the database and insert data
sequelize.sync()
  .then(async () => {
    await PhoneByBrand.bulkCreate(phonesData);
    console.log('All phones have been successfully inserted.');
  })
  .catch(error => {
    console.error('An error occurred while inserting phones:', error);
  });
