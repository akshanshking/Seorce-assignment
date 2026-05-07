import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Changed to framer-motion as standard
import {
  FerrisWheel,
  Castle,
  RollerCoaster,
  Tent,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
} from "lucide-react";


// --- Data ---
const CATEGORIES = [
  { id: "land", name: "Land Rides", icon: FerrisWheel, angle: -38 },
  { id: "water", name: "Water Rides", icon: Castle, angle: -5 },
  { id: "thrill", name: "Thrill Rides", icon: RollerCoaster, angle: 28 },
  { id: "kids", name: "Kids Zone", icon: Tent, angle: 60 },
];


const CONTENT = {
  land: {
    name: "Land Rides",
    count: "24+ Rides",
    description:
      "From thrilling first rides to family favorites, Travita BLR's land rides in Mysore are designed for thrill-seekers and families of all ages. Twist, turn, and soar through our amusement park attractions that deliver unforgettable moments. Bring your loved ones and enjoy endless fun and laughter.",
    rides: [
      {
        id: "l1",
        title: "Giant Ferris Wheel",
        category: "Extreme Rides",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcJqeeQAPJ94fwHRnzq9XhFo7OFLkZ5Wzbyw&s"
      },
      {
        id: "l2",
        title: "Bumper Car Arena",
        category: "Fun Zone",
        image:
          "https://torq03.com/wp-content/uploads/2025/07/b6b7afb5dfdd0bd6c7ab22f2c0f64261876ba918.jpg"
      },
      {
        id: "l3",
        title: "Twist and Shout",
        category: "Land Rides",
        image:
          "https://a-us.storyblok.com/f/1018389/2880x1620/78895a6ce6/twist-shout-hero-2880-x-1620.jpg"
      },
    ],
  },
  water: {
    name: "Water Rides",
    count: "15+ Rides",
    description:
      "Dive into a world of excitement with our signature water attractions. Whether you want to experience the rush of high-speed slides or the relaxation of our wave pools, our water rides cater to every preference. Perfect for those looking to cool off and have a splashing good time.",
    rides: [
      {
        id: "w1",
        title: "Aqua Splash",
        category: "Extreme Rides",
        image:
          "https://t3.ftcdn.net/jpg/03/63/18/52/360_F_363185208_TUCcLEeexguEFn3ywy65gTPyKHK6zZfI.jpg"
      },
      {
        id: "w2",
        title: "Wave Pool Paradise",
        category: "Relaxation",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHAbFQywZj9T6yRRl9tAtQrbD2FZmemX2pXQ&s",
      },
      {
        id: "w3",
        title: "Rapid River Raft",
        category: "Thrill Rides",
        image:
          "https://visitadirondacks.com/sites/default/files/styles/960x540/public/2023-04/ROOST%20Raft%20adkadventures1.jpg?itok=-lADTjj0"
      },
    ],
  },
  thrill: {
    name: "Thrill Rides",
    count: "10+ Rides",
    description:
      "Experience the ultimate adrenaline rush with our collection of high-intensity thrill rides. Designed for the most daring guests, these attractions feature steep drops and gravity-defying maneuvers. Test your limits and feel the speed on our most popular extreme attractions.",
    rides: [
      {
        id: "t1",
        title: "Sky Drop Tower",
        category: "Extreme Thrills",
        image:
          "https://www.intamin.com/wp-content/uploads/2019/09/IMG_4787_ret-1920x1280.jpg"
      },
      {
        id: "t2",
        title: "Vertical Loop Coaster",
        category: "Extreme Thrills",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwNa0kg6RoqDE8Ks0d22DapGUXFJctGY7R5A&s"
      },
      {
        id: "t3",
        title: "Aftershock Spin",
        category: "Intensity",
        image:
          "https://media-cdn.tripadvisor.com/media/photo-s/05/da/d3/a9/silverwood-theme-park_rotated_90.jpg"
      },
    ],
  },
  kids: {
    name: "Kids Zone",
    count: "20+ Rides",
    description:
      "A magical land where our smallest visitors can have big adventures. Our Kids Zone is filled with gentle rides, interactive play areas, and colorful characters designed to delight and entertain children in a safe and vibrant environment.",
    rides: [
      {
        id: "k1",
        title: "Kiddies Wheel",
        category: "Kids Zone",
        image:
          "https://5.imimg.com/data5/SELLER/Default/2021/3/TQ/TN/PZ/67007676/baby-game-jhula.jpg"
      },
      {
        id: "k2",
        title: "Merry-Go-Round",
        category: "Kids Zone",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjbEaYlByHxy9eNvm2p6eQ64lbd5CZ1E1g9g&s"
      },
      {
        id: "k3",
        title: "Bumper Boats",
        category: "Kids Zone",
        image:
          "https://www.heatherton.co.uk/media/h50n5ui1/bumper-boats-3.jpg?width=1600&height=1200&v=1db605a83e90050&quality=75",
      },
    ],
  },
};


// --- Helper Components ---
const Badge = ({ children }) => (
  <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#F5F7FF] text-[#1D2445] font-semibold text-sm border border-indigo-100 shadow-sm">
    <span className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-[10px] text-white font-bold">
      +
    </span>
    {children}
  </div>
);


// --- Sub-components ---
const AnimatedCarousel = ({ rides }) => {
  const [activeRideIndex, setActiveRideIndex] = useState(0);
  const containerRef = useRef(null);


  // Logic to handle carousel movement without changing your CSS layout
  const next = () => setActiveRideIndex((prev) => (prev + 1) % rides.length);
  const prev = () =>
    setActiveRideIndex((prev) => (prev - 1 + rides.length) % rides.length);


  return (
    <div className="relative w-full h-full lg:px-4" ref={containerRef}>
      <div className="absolute -top-16 right-4 lg:right-0 flex gap-4 z-20">
        <button
          onClick={prev}
          className="w-12 h-12 cursor-pointer rounded-full bg-white border border-gray-100 text-[#A16207] flex items-center justify-center transition-all hover:bg-yellow-50 shadow-sm"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className="w-12 h-12 cursor-pointer rounded-full bg-[#FDE047] text-[#A16207] flex items-center justify-center transition-all hover:bg-[#FACC15] shadow-md"
        >
          <ChevronRight size={24} />
        </button>
      </div>


      <div className="relative w-full h-[350px] md:h-[400px] flex items-center overflow-visible lg:overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          {rides.map((ride, i) => {
            const isActive = i === activeRideIndex;
            // Only render current, next, and previous to maintain your UI flow
            if (
              Math.abs(i - activeRideIndex) > 1 &&
              !(activeRideIndex === 0 && i === rides.length - 1) &&
              !(activeRideIndex === rides.length - 1 && i === 0)
            )
              return null;


            return (
              <motion.div
                key={ride.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isActive ? 1 : 0.3,
                  scale: isActive ? 1 : 0.8,
                  x: (i - activeRideIndex) * 310, // Fixed the math here so they don't stack
                  zIndex: isActive ? 10 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute left-0"
                style={{ width: "290px", height: "100%" }}
              >
                <div className="relative w-full h-full rounded-[30px] md:rounded-[40px] overflow-hidden group shadow-2xl">
                  <img
                    src={ride.image}
                    alt={ride.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-yellow-400 text-[10px] uppercase tracking-wider text-black font-black">
                      {ride.category}
                    </span>
                  </div>
                  <div className="absolute bottom-10 left-6 right-6">
                    <h3 className="text-2xl font-black text-white mb-4">
                      {ride.title}
                    </h3>
                    <button className="px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold">
                      Know More
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};


const RideIconPath = () => (
  <div className="relative w-full max-w-lg mt-8 h-2 bg-gray-100 rounded-full">
    <div className="absolute left-0 top-0 h-full w-1/3 bg-yellow-400 rounded-full" />
    <div className="absolute left-1/3 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-2 rounded-xl shadow-lg border border-yellow-100">
      <img src="/assets/slide-icon.webp" className="w-10 h-10" alt="icon" />
    </div>
  </div>
);


// --- Main App ---
export default function App() {
  const [activeCategory, setActiveCategory] = useState("land");
  const radius = 340;


  return (
    <div className="min-h-screen bg-white text-[#1D2445] overflow-x-hidden">
      <header className="pt-16 pb-8 px-6 flex flex-col items-center text-center">
        <Badge>Discover 30+ Magical Rides</Badge>
        <h1 className="mt-8 text-3xl md:text-5xl font-black">
          Whether you crave{" "}
          <span className="text-[#5876F3]">speed, splash and height,</span> &{" "}
          <br /> Family <span className="text-orange-500">Magic</span>
        </h1>
        <RideIconPath />
      </header>


      <main className="mx-auto grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-8 items-start pb-24">
        {/* Left Side: The Circle */}
        <section className="relative h-[700px] flex items-center justify-center">
          {/* Circle */}
          <div
            className="absolute rounded-full border-[60px] border-[#5876F3]"
            style={{
              width: radius * 1.6,
              height: radius * 1.6,
              left: "-250px",
              clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
            }}
          />


          <div className="relative w-full h-full">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;


              const adjustedRadius = radius * 0.78; // smaller radius


              const radian = (cat.angle * Math.PI) / 180;


              const x = adjustedRadius * Math.cos(radian);
              const y = adjustedRadius * Math.sin(radian);


              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    position: "absolute",
                    left: `${x + 110}px`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  className="group cursor-pointer flex flex-col items-center z-30"
                >
                  <div
                    className={`rounded-full flex items-center justify-center shadow-xl border-4 transition-all duration-300 ${
                      isActive
                        ? "w-32 h-32 bg-white border-[#5876F3]"
                        : "w-14 h-14 bg-[#5876F3] border-white"
                    }`}
                  >
                    <cat.icon
                      size={isActive ? 56 : 22}
                      className={isActive ? "text-yellow-500" : "text-white"}
                    />
                  </div>


                  {isActive && (
                    <p className="mt-3 font-black text-blue-900 uppercase">
                      {cat.name}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </section>


        {/* Right Side: Content */}
        <section className="flex flex-col gap-12 pt-8 px-6">
          <div className="h-[400px]">
            <AnimatedCarousel rides={CONTENT[activeCategory].rides} />
          </div>


          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-black uppercase italic">
                {CONTENT[activeCategory].name}
              </h2>
              <span className="px-4 py-1 rounded-lg bg-indigo-600 text-white text-[10px] font-black">
                {CONTENT[activeCategory].count}
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed font-medium">
              {CONTENT[activeCategory].description}
            </p>
            <button className="flex items-center cursor-pointer gap-4 px-10 py-5 rounded-2xl bg-yellow-400 text-white font-black uppercase text-sm shadow-2xl">
              Explore Full Map{" "}
              <ArrowUp size={20} className="rotate-45 text-[#1D2445]" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
