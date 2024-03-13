import React, { useState, useEffect } from 'react';
import { useSupabase } from '../../Providers/SupabaseProvider';

const RandomCities = () => {
  const { supabase } = useSupabase();
  const [cities, setCities] = useState([]);
  const [roomImages, setRoomImages] = useState([]);

  useEffect(() => {
    const fetchRandomCities = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('id, title, teaser, image_id, content');

        if (error) {
          console.error('Error fetching cities:', error.message);
          return;
        }

        const randomCities = getRandomItems(data, 3);
        setCities(randomCities);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    const fetchRoomImages = () => {
      const roomImagesData = [
        { id: 1, imageUrl: 'https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/74.jpg', description: 'Room Single Description' },
        { id: 2, imageUrl: 'https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/71.jpg', description: 'Room Double Description' },
        { id: 3, imageUrl: 'https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/76.jpg', description: 'Room Plus Description' },
      ];

      setRoomImages(roomImagesData);
    };

    fetchRandomCities();
    fetchRoomImages();
  }, [supabase]);

  const getRandomItems = (array, n) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

return (
  <div className="relative mt-custom grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
    {/* Place h2 just above the grid images on the left side */}
    <div className="absolute top-0 left-0 ml-0 mt-2 md:mt-0">
      <h2 className="text-2xl">Sidste nyt</h2>
    </div>

    {cities.map(city => (
      <div
        key={city.id}
        className="city-card bg-white shadow-md p-6 mt-10 relative overflow-hidden transition-opacity hover:opacity-100"
      >
        <img
          src={`https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/${city.image_id}.jpg`}
          alt={city.title}
          className="w-full h-40 object-cover mb-4 rounded-lg"
        />
        <div className="text-center">
          <strong className="block text-lg mb-2 bg-white p-3">
            {city.title}
            <p className="text-gray-700 opacity-0 transition-opacity duration-300 hover:opacity-100 p-3">
              {city.teaser}
            </p>
          </strong>
        </div>
      </div>
    ))}

    {roomImages.map(room => (
      <div
        key={room.id}
        className="bg-white shadow-md p-6 transition-transform transform hover:scale-105 relative overflow-hidden"
      >
        <img
          src={room.imageUrl}
          alt={`Room Image ${room.id}`}
          className="w-full h-40 object-cover mb-4 rounded-lg"
        />
        <p className="text-gray-700">{room.description}</p>
      </div>
    ))}
  </div>
);
};

export default RandomCities;


