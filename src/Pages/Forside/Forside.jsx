import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../../Providers/SupabaseProvider';

const Forside = () => {
  const { supabase } = useSupabase();
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const [cities, setCities] = useState([]);
  const [roomImages, setRoomImages] = useState([]);

  useEffect(() => {
    const getRandomItems = (array, n) => {
      const shuffled = array.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, n);
    };

    const fetchRandomCityImage = async () => {
      try {
        const { data, error } = await supabase
          .from('cities')
          .select('id, name, description, image_id');

        if (error) {
          console.error('Error fetching cities:', error.message);
          return;
        }

        const randomCity = data[Math.floor(Math.random() * data.length)];
        const imageUrl = `https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/${randomCity.image_id}.jpg`;

        setBackgroundImageUrl(imageUrl);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setBackgroundImageUrl('https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/Error.jpg');
      }
    };

    const fetchRandomCitiesAndRoomImages = async () => {
      try {
        const { data: citiesData, error: citiesError } = await supabase
          .from('news')
          .select('id, title, teaser, image_id, content');

        if (citiesError) {
          console.error('Error fetching cities:', citiesError.message);
          return;
        }

        const randomCities = getRandomItems(citiesData, 3);
        setCities(randomCities);

        const { data: roomsData, error: roomsError } = await supabase
          .from('rooms')
          .select('id, description, image_id, title');

        if (roomsError) {
          console.error('Error fetching room data:', roomsError.message);
          return;
        }

        const shuffledRoomImages = getRandomItems(roomsData, 3);
        setRoomImages(shuffledRoomImages);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchRandomCityImage();
    fetchRandomCitiesAndRoomImages();
    
    const intervalId = setInterval(() => {
      fetchRandomCityImage();
      fetchRandomCitiesAndRoomImages();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [supabase]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden p-8">
      {backgroundImageUrl && (
        <div
          className="absolute bottom-3/4 left-0 w-full h-customHeight top-0 bg-cover bg-center bg-no-repeat z-0 opacity-100 transition-opacity duration-1000 ease-in-out"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        ></div>
      )}
      <div className="absolute top-96 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 opacity-100 transition-transform duration-1000 ease-in-out transform-x-0">
        <h2 className="bg-black bg-opacity-50 text-white text-left uppercase relative inline-block bottom-48 sm:mr-64 sm:right-64 w-full sm:w-3/4 rounded-tr-none rounded-br-full rounded-bl-none rounded-tl-noneopacity-100 transition-transform duration-1000 ease-in-out transform-x-0 p-3">
          Velkommen til hotel overlook online
        </h2>

        <div className="bg-red-600 bg-opacity-50 relative inline-block bottom-48 sm:mr-96 sm:right-64 w-full sm:w-96 rounded-tr-none rounded-br-full rounded-bl-none rounded-tl-none p-3"></div>
      </div>
      <div className="absolute left-0 ml-0 mt-2 md:mt-0 z-10" style={{ top: '40rem' }}>
  <h2 className="text-2xl">Sidste nyt</h2>
    </div>

      <div className="relative mt-custom grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {cities.map(city => (
          <div
            key={city.id}
            className="city-card bg-white shadow-md p-6 relative overflow-hidden transition-opacity hover:opacity-100"
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
            className="bg-white shadow-md p-6 relative overflow-hidden"
          >
            <img
              src={`https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/${room.image_id}.jpg`}
              alt={room.title}
              className="w-full h-40 object-cover mb-4 rounded-lg"
            />
            <h3 className='text-xl'>{room.title}</h3>
            <br />
            <p className="text-gray-700">{room.description}</p>
            <br />
            <Link to={`/rooms/`} className="underline">Mere info</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forside;
