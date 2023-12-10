const sampleProducts = [
    {
      name: "Laptop",
      title: "PowerBook Pro",
      colors: [
        {
          name: "Silver",
          value: "#c0c0c0",
        },
        {
          name: "Space Gray",
          value: "#808080",
        },
      ],
      sizes: [
        {
          name: "13-inch",
          value: "13.3 Inches",
        },
        {
          name: "15-inch",
          value: "15.6 Inches",
        },
      ],
      description: "Powerful laptop for professionals and creatives.",
      price: "1200",
      quantity: "50",
      variantEnabled: true,
      variants: [
        {
          variantId: 1,
          color: "#c0c0c0",
          size: "13-inch",
          price: "1200",
          quantity: "25",
          isEnabled: true,
        },
        {
          variantId: 2,
          color: "#808080",
          size: "15-inch",
          price: "1400",
          quantity: "25",
          isEnabled: true,
        },
      ],
    },
    {
      name: "Smartphone",
      title: "TechPhone X",
      colors: [
        {
          name: "Black",
          value: "#000000",
        },
        {
          name: "Gold",
          value: "#ffd700",
        },
      ],
      sizes: [
        {
          name: "64GB",
          value: "64 Gigabytes",
        },
        {
          name: "128GB",
          value: "128 Gigabytes",
        },
      ],
      description: "Flagship smartphone with advanced features.",
      price: "800",
      quantity: "30",
      variantEnabled: true,
      variants: [
        {
          variantId: 1,
          color: "#000000",
          size: "64GB",
          price: "800",
          quantity: "15",
          isEnabled: true,
        },
        {
          variantId: 2,
          color: "#ffd700",
          size: "128GB",
          price: "1000",
          quantity: "15",
          isEnabled: true,
        },
      ],
    },
  ];
  
  export default sampleProducts;
  