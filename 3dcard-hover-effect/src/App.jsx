import './App.css'
import Card3D from './components/Card3D'

/**
 * Demo data for multiple cards.
 * Each card has an image, title, and description.
 * Using Unsplash source URLs for reliable, high-quality images.
 */
const cards = [
  {
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=350&fit=crop&q=80',
    title: 'Mountain Peaks',
    description:
      'Experience the breathtaking views of snow-capped mountain peaks at sunrise.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=350&fit=crop&q=80',
    title: 'Ocean Breeze',
    description:
      'Feel the calming ocean breeze on pristine tropical beaches with crystal waters.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&h=350&fit=crop&q=80',
    title: 'Starry Nights',
    description:
      'Gaze upon the endless stars in the crystal clear night sky far from city lights.',
  },
  {
    image:
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&h=350&fit=crop&q=80',
    title: 'Green Valleys',
    description:
      'Wander through lush green valleys and rolling countryside hills at dawn.',
  },
  {
    image: 'https://images.unsplash.com/photo-1621795307430-3ff25aa08945?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Desert Dunes',
    description: 'Explore the golden sands and ever-shifting dunes under a blazing sun.',
  },
  {
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&h=350&fit=crop&q=80',
    title: 'Forest Trails',
    description: 'Walk through serene forest paths surrounded by towering trees.',
  },
  {
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&h=350&fit=crop&q=80',
    title: 'City Lights',
    description: 'Experience the vibrant energy of a city illuminated at night.',
  },
  {
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=350&fit=crop&q=80',
    title: 'Foggy Hills',
    description: 'Misty hills creating a mysterious and calming atmosphere.',
  },
  {
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&h=350&fit=crop&q=80',
    title: 'Waterfalls',
    description: 'Feel the power and beauty of cascading waterfalls in nature.',
  },
  {
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=500&h=350&fit=crop&q=80',
    title: 'Autumn Leaves',
    description: 'Enjoy the vibrant colors of fall foliage in full bloom.',
  },
  {
    image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=500&h=350&fit=crop&q=80',
    title: 'Snowy Forest',
    description: 'A quiet winter wonderland covered in fresh snow.',
  },
  {
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&h=350&fit=crop&q=80',
    title: 'Deep Jungle',
    description: 'Discover the lush greenery and life deep within jungles.',
  },
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=350&fit=crop&q=80',
    title: 'Calm Lake',
    description: 'A peaceful lake reflecting mountains and skies like a mirror.',
  },
  {
    image: 'https://images.unsplash.com/photo-1474524955719-b9f87c50ce47?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Sunset Glow',
    description: 'Warm sunset hues painting the sky in orange and pink.',
  },
  {
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&h=350&fit=crop&q=80',
    title: 'Countryside Roads',
    description: 'Peaceful drives through scenic countryside landscapes.',
  },
  {
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=500&h=350&fit=crop&q=80',
    title: 'River Streams',
    description: 'Flowing streams cutting through rocks and forests.',
  },
  {
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=350&fit=crop&q=80',
    title: 'Wild Meadows',
    description: 'Open fields filled with colorful wildflowers and fresh air.',
  },
  {
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&h=350&fit=crop&q=80',
    title: 'Urban Skyline',
    description: 'Modern architecture rising high against the skyline.',
  },
  {
    image: 'https://images.unsplash.com/photo-1503264116251-35a269479413?w=500&h=350&fit=crop&q=80',
    title: 'Cliff Views',
    description: 'Dramatic cliffs overlooking vast oceans and horizons.',
  },
  {
    image: 'https://plus.unsplash.com/premium_photo-1663945779273-ebc45569fb9f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Golden Fields',
    description: 'Fields glowing under the golden light of sunset.',
  },
  {
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=500&h=350&fit=crop&q=80',
    title: 'Spring Blossoms',
    description: 'Fresh blooms signaling the arrival of spring.',
  },
  {
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=350&fit=crop&q=80',
    title: 'Night City',
    description: 'A bustling city alive with lights and movement.',
  },
  {
    image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=500&h=350&fit=crop&q=80',
    title: 'Island Escape',
    description: 'A remote island surrounded by turquoise waters.',
  },
  {
    image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=500&h=350&fit=crop&q=80',
    title: 'Cloudy Skies',
    description: 'Dramatic clouds forming stunning patterns in the sky.',
  },
   {
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&h=350&fit=crop&q=80',
    title: 'Neon Streets',
    description: 'Bright neon lights reflecting off wet streets in a cyberpunk city.',
  },
  {
    image: 'https://plus.unsplash.com/premium_photo-1682320426935-f0614a9a6517?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Bridge View',
    description: 'A stunning architectural bridge stretching across calm waters.',
  },
  {
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&h=350&fit=crop&q=80',
    title: 'Aurora Sky',
    description: 'Northern lights dancing across the dark arctic sky.',
  },
  {
    image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=500&h=350&fit=crop&q=80',
    title: 'Rainy Window',
    description: 'Raindrops trickling down glass with blurred city lights behind.',
  },
  {
    image: 'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?w=500&h=350&fit=crop&q=80',
    title: 'Rocky Shore',
    description: 'Waves crashing against rugged coastal rocks.',
  },
  {
    image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Farm Lands',
    description: 'Expansive farmlands stretching under a clear blue sky.',
  },
  {
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=350&fit=crop&q=80',
    title: 'Metro Life',
    description: 'Fast-paced metro stations filled with moving crowds.',
  },
  {
    image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=500&h=350&fit=crop&q=80',
    title: 'Storm Clouds',
    description: 'Dark storm clouds gathering before a heavy downpour.',
  },
  {
    image: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=500&h=350&fit=crop&q=80',
    title: 'Sunlit Forest',
    description: 'Sun rays piercing through dense forest canopies.',
  },
  {
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=500&h=350&fit=crop&q=80',
    title: 'Crystal River',
    description: 'Clear river water flowing over smooth stones.',
  },
  {
    image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&h=350&fit=crop&q=80',
    title: 'Jungle Path',
    description: 'A hidden path leading deep into a lush jungle.',
  },
  {
    image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&h=350&fit=crop&q=80',
    title: 'Golden Road',
    description: 'A long road glowing under the golden sunset.',
  },
  {
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=500&h=350&fit=crop&q=80',
    title: 'Bloom Garden',
    description: 'A vibrant garden full of colorful blooming flowers.',
  },
  {
    image: 'https://images.unsplash.com/photo-1503264116251-35a269479413?w=500&h=350&fit=crop&q=80',
    title: 'High Cliffs',
    description: 'Standing atop cliffs with breathtaking ocean views.',
  },
  {
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&h=350&fit=crop&q=80',
    title: 'Mountain Trail',
    description: 'A scenic trail leading through rugged mountain terrain.',
  },
  {
    image: 'https://plus.unsplash.com/premium_photo-1673697239909-e11521d1ba94?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Evening Glow',
    description: 'Soft evening light fading into a peaceful night.',
  },
  {
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=350&fit=crop&q=80',
    title: 'Tropical Shore',
    description: 'Palm trees swaying beside a turquoise ocean.',
  },
  {
    image: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=500&h=350&fit=crop&q=80',
    title: 'Hidden Island',
    description: 'A secret island paradise far from civilization.',
  },
  {
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&h=350&fit=crop&q=80',
    title: 'Falling Water',
    description: 'A powerful waterfall hidden within dense greenery.',
  },
  {
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=350&fit=crop&q=80',
    title: 'Misty Mountains',
    description: 'Clouds wrapping around mountain peaks at dawn.',
  },
  {
  image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=500&h=350&fit=crop&q=80',
  title: 'Moonlit Desert',
  description: 'A शांत desert landscape glowing softly under the moonlight and stars.',
}
]

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>3D Card Hover Effect</h1>
        <p>
          Move your mouse over the cards below to see the interactive 3D tilt
          effect with dynamic lighting.
        </p>
      </header>

      <main className="app__grid">
        {cards.map((card, index) => (
          <Card3D
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
          />
        ))}
      </main>

      <footer className="app__footer">
        <p>
          Built with React, CSS transforms, and requestAnimationFrame for
          smooth performance.
        </p>
      </footer>
    </div>
  )
}

export default App

