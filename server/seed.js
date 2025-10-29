const { db } = require("./db");

function seedLocalProducts() {
  const existing = db.prepare("SELECT COUNT(*) as c FROM products").get().c;
  if (existing > 0) {
    console.log("Products exist — skipping local seed.");
    return;
  }

  const products = [
    {
      id: 101,
      title: "Classic Leather Wallet",
      price: 29.99,
      description: "Premium wallet",
      image:
        "https://4.imimg.com/data4/CU/PH/MY-3627727/men-s-stylish-leather-wallet-500x500-500x500.jpg",
    },
    {
      id: 102,
      title: "Business Backpack",
      price: 59.99,
      description: "Laptop friendly",
      image:
        "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/tumi/0196670CARM/0/2TpTIwPQx2-000000410523801001_1_2714.webp",
    },
    {
      id: 103,
      title: "Wireless Headphones",
      price: 89.99,
      description: "Noise-cancelling",
      image:
        "https://hottipsusa.com/cdn/shop/products/Pro_Overear_Wireless_Headphones_Main_White_websize_1024x1024.jpg?v=1670266033",
    },
    {
      id: 104,
      title: "Desk Lamp",
      price: 24.99,
      description: "Adjustable LED",
      image:
        "https://www.ikea.com/in/en/images/products/roedflik-desk-lamp-grey-green__1327045_pe944344_s5.jpg",
    },
    {
      id: 105,
      title: "Running Shoes",
      price: 74.99,
      description: "Comfort fit",
      image:
        "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/25503846/2023/10/16/ec5703c0-e5fc-4618-927f-d23bcf52af081697472495838NikeInteractRunMenRoadRunningShoes1.jpg",
    },
  ];

  const insert = db.prepare(
    "INSERT INTO products (id, title, price, description, image) VALUES (@id, @title, @price, @description, @image)"
  );
  const insertMany = db.transaction((rows) => {
    for (const r of rows) insert.run(r);
  });

  insertMany(products);
  console.log("Seeded local products.");
}

function seedMockUser() {
  const user = db.prepare("SELECT * FROM users LIMIT 1").get();
  if (!user) {
    db.prepare("INSERT INTO users (name, email) VALUES (?, ?)").run(
      "Mock User",
      "mock@local"
    );
    console.log("Inserted mock user.");
  } else {
    console.log("Mock user exists.");
  }
}

(async () => {
  seedMockUser();
  seedLocalProducts();
  console.log("Seeding finished.");
})();
