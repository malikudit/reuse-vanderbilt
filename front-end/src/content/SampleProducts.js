import Couch from "../assets/Couch.jpg";
import Bike from "../assets/Bike.jpg";
import iPad from "../assets/iPad.jpg";
import Skateboard from "../assets/Skateboard.jpg";
import Textbook from "../assets/Textbook.jpg";

export const SampleProducts = [
  {
    image: Couch,
    itemName: "New Couch",
    description: "New Couch",
    condition: "Brand New",
    location: "Seller Delivery",
    currentBid: "$100",
    buyNow: "$250",
    timeLeft: "2 days 12 hours 10 minutes",
    category: "Furniture",
    buying: true,
  },
  {
    image: Bike,
    itemName: "Bike",
    description: "Bike",
    condition: "Slightly Used",
    location: "Buyer and Seller Meet at Common Point",
    currentBid: "$150",
    buyNow: "$200",
    timeLeft: "1 days 8 hours 32 minutes",
    category: "Transportation",
    buying: false,
  },
  {
    image: iPad,
    itemName: "Used iPad",
    description: "Used iPad",
    condition: "Used",
    location: "Buyer Will Come to Seller",
    currentBid: "$500",
    buyNow: "$700",
    timeLeft: "12 hours 10 minutes",
    category: "Electronics",
    buying: true,
  },
  {
    image: Skateboard,
    itemName: "Skateboard",
    description: "Skateboard",
    condition: "Like New",
    location: "Seller Delivery",
    currentBid: "$120",
    buyNow: "N/A",
    timeLeft: "3 days 3 hours 53 minutes",
    category: "Transportation",
    buying: false,
  },
  {
    image: Textbook,
    itemName: "Unused Textbook",
    description: "Unused Textbook",
    condition: "Brand New",
    location: "Seller Delivery",
    currentBid: "$50",
    buyNow: "$100",
    timeLeft: "6 hours 14 minutes",
    category: "Books",
    buying: true,
  },
];