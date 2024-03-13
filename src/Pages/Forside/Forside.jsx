// Forside.jsx
import React, { useState, useEffect } from 'react';
import RandomCities from '../../Components/RandomCities/RandomCities';
import { useSupabase } from '../../Providers/SupabaseProvider';

const Forside = () => {
  const { supabase } = useSupabase();
  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

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

  useEffect(() => {
    fetchRandomCityImage();
    const intervalId = setInterval(fetchRandomCityImage, 10000);

    return () => clearInterval(intervalId);
  }, [supabase]);
  
  return (
    <div className="relative w-full sm:h-[250vh] h-[200vh] overflow-hidden p-8">
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
      <RandomCities />
    </div>
  );
};

export default Forside;
