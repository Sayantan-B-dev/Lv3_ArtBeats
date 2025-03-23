const data = [
  {
    title: "Test Graffiti 1",
    description: "A colorful test graffiti wall.",
    location: "Mumbai",
    artist_name: "Test Artist 1",
    date_created: new Date("2023-01-01"),
    geometry: { type: "Point", coordinates: [72.8777, 19.0760] },
    images: [],
    comments: []
  },
  {
    title: "Test Mural 2",
    description: "A mural depicting a beautiful sunset.",
    location: "Goa",
    artist_name: "Test Artist 2",
    date_created: new Date("2023-02-01"),
    geometry: { type: "Point", coordinates: [73.9580, 15.2993] },
    images: [],
    comments: []
  },
  {
    title: "Test Abstract 3",
    description: "Abstract shapes and colors colliding.",
    location: "Bangalore",
    artist_name: "Test Artist 3",
    date_created: new Date("2023-03-01"),
    geometry: { type: "Point", coordinates: [77.5946, 12.9716] },
    images: [],
    comments: []
  },
  {
    title: "Test Graffiti 4",
    description: "Graffiti inspired by the city’s hustle.",
    location: "Delhi",
    artist_name: "Test Artist 4",
    date_created: new Date("2023-04-01"),
    geometry: { type: "Point", coordinates: [77.2090, 28.6139] },
    images: [],
    comments: []
  },
  {
    title: "Test Calligraphy 5",
    description: "Elegant calligraphy on a city wall.",
    location: "Jaipur",
    artist_name: "Test Artist 5",
    date_created: new Date("2023-05-01"),
    geometry: { type: "Point", coordinates: [75.7873, 26.9124] },
    images: [],
    comments: []
  },
  {
    title: "Test Pop Art 6",
    description: "Bright pop art style work.",
    location: "Chennai",
    artist_name: "Test Artist 6",
    date_created: new Date("2023-06-01"),
    geometry: { type: "Point", coordinates: [80.2785, 13.0827] },
    images: [],
    comments: []
  },
  {
    title: "Test Nature 7",
    description: "A mural of nature scenes.",
    location: "Hyderabad",
    artist_name: "Test Artist 7",
    date_created: new Date("2023-07-01"),
    geometry: { type: "Point", coordinates: [78.4747, 17.3850] },
    images: [],
    comments: []
  },
  {
    title: "Test Cityscape 8",
    description: "A vibrant cityscape mural.",
    location: "Kolkata",
    artist_name: "Test Artist 8",
    date_created: new Date("2023-08-01"),
    geometry: { type: "Point", coordinates: [88.3639, 22.5726] },
    images: [],
    comments: []
  },
  {
    title: "Test Vintage Cars 9",
    description: "Retro cars painted on a city wall.",
    location: "Pune",
    artist_name: "Test Artist 9",
    date_created: new Date("2023-09-01"),
    geometry: { type: "Point", coordinates: [73.8490, 18.5204] },
    images: [],
    comments: []
  },
  {
    title: "Test Animal Art 10",
    description: "Street art featuring wild animals.",
    location: "Ahmedabad",
    artist_name: "Test Artist 10",
    date_created: new Date("2023-10-01"),
    geometry: { type: "Point", coordinates: [72.5714, 23.0225] },
    images: [],
    comments: []
  },
  {
    title: "Test Graffiti 11",
    description: "Vibrant graffiti with funky patterns.",
    location: "Lucknow",
    artist_name: "Test Artist 11",
    date_created: new Date("2023-11-01"),
    geometry: { type: "Point", coordinates: [80.9462, 26.8467] },
    images: [],
    comments: []
  },
  {
    title: "Test Mural 12",
    description: "A modern city-inspired mural.",
    location: "Chandigarh",
    artist_name: "Test Artist 12",
    date_created: new Date("2023-12-01"),
    geometry: { type: "Point", coordinates: [76.7794, 30.7333] },
    images: [],
    comments: []
  },
  {
    title: "Test Abstract 13",
    description: "Abstract street art with geometric patterns.",
    location: "Bhopal",
    artist_name: "Test Artist 13",
    date_created: new Date("2024-01-01"),
    geometry: { type: "Point", coordinates: [77.4126, 23.2599] },
    images: [],
    comments: []
  },
  {
    title: "Test Graffiti 14",
    description: "Graffiti inspired by city nightlife.",
    location: "Indore",
    artist_name: "Test Artist 14",
    date_created: new Date("2024-02-01"),
    geometry: { type: "Point", coordinates: [75.8577, 22.7196] },
    images: [],
    comments: []
  },
  {
    title: "Test Calligraphy 15",
    description: "Artistic calligraphy work with vibrant colors.",
    location: "Patna",
    artist_name: "Test Artist 15",
    date_created: new Date("2024-03-01"),
    geometry: { type: "Point", coordinates: [85.8245, 25.5941] },
    images: [],
    comments: []
  },
  {
    title: "Test Pop Art 16",
    description: "Pop art with bold colors and shapes.",
    location: "Surat",
    artist_name: "Test Artist 16",
    date_created: new Date("2024-04-01"),
    geometry: { type: "Point", coordinates: [72.8278, 21.1702] },
    images: [],
    comments: []
  },
  {
    title: "Test Nature 17",
    description: "Nature-inspired street art piece.",
    location: "Vadodara",
    artist_name: "Test Artist 17",
    date_created: new Date("2024-05-01"),
    geometry: { type: "Point", coordinates: [73.1812, 22.3070] },
    images: [],
    comments: []
  },
  {
    title: "Test Cityscape 18",
    description: "A vibrant city mural depicting urban life.",
    location: "Jaipur",
    artist_name: "Test Artist 18",
    date_created: new Date("2024-06-01"),
    geometry: { type: "Point", coordinates: [75.7873, 26.9124] },
    images: [],
    comments: []
  },
  {
    title: "Test Vintage Cars 19",
    description: "Street art of classic vintage cars.",
    location: "Coimbatore",
    artist_name: "Test Artist 19",
    date_created: new Date("2024-07-01"),
    geometry: { type: "Point", coordinates: [77.0209, 11.0168] },
    images: [],
    comments: []
  },
  {
    title: "Test Animal Art 20",
    description: "Wild animal murals on city walls.",
    location: "Trivandrum",
    artist_name: "Test Artist 20",
    date_created: new Date("2024-08-01"),
    geometry: { type: "Point", coordinates: [76.9366, 8.5241] },
    images: [],
    comments: []
  }
];

module.exports = data;
