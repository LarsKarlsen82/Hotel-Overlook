import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSupabase } from '../../Providers/SupabaseProvider';

const HotelCity = () => {
  const { supabase } = useSupabase();
  const location = useLocation();
  const selectedCity = location.state?.city;
  const [hotels, setHotels] = useState([]);

  // Fetch hotels for the selected city on component mount
  useEffect(() => {
    async function fetchHotelsByCity() {
      try {
        if (selectedCity) {
          const { data, error } = await supabase
            .from('hotels')
            .select('*')
            .eq('city_id', selectedCity.id);

          if (error) {
            console.error('Error fetching hotels:', error.message);
            return;
          }

          setHotels(data);
        }
      } catch (error) {
        console.error('Error fetching hotels:', error.message);
      }
    }

    fetchHotelsByCity();
  }, [supabase, selectedCity]);

  return (
    <div>
      {/* Hero Section */}
      {selectedCity && (
        <div className="relative bg-gray-900 overflow-hidden">
          {/* Display city image */}
          <img className="w-full h-80 object-cover object-center" src={`https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/${selectedCity.image_id}.jpg`} alt={selectedCity.title} />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold tracking-wide text-white">{`Vores hoteller i ${selectedCity.name}`}</h1>
          </div>
        </div>
      )}

      {/* City description */}
      {selectedCity && (
        <div className="left-0 mt-8">
          <h2 className="text-xl font-bold mb-2">Om {selectedCity.name}</h2>
          <p>{selectedCity.description}</p>
        </div>
      )}
{/* Hotels */}
<div className="left-0 mt-8">
  <h2 className="text-2xl font-bold mb-4">Hoteller i {selectedCity && selectedCity.name}</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
    {hotels.map(hotel => (
      <div key={hotel.id} className="cursor-pointer p-2 rounded-lg border border-gray-300 hover:bg-gray-100">
        {/* Set the image source dynamically */}
        <img src={`https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/${hotel.image_id}.jpg`} alt={hotel.name} className="w-full h-64 object-cover rounded-lg mb-4" />
        <h3 className="text-xl font-bold">{hotel.title}</h3>
        <p>{hotel.teaser}</p>
      </div>
    ))}
  </div>
</div>


    </div>
  );
};

export default HotelCity;
