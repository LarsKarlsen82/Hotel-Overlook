import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../../Providers/SupabaseProvider';
import testCityImage from '../../Assets/images/Hotels_bg_img.jpg';

const Hotels = () => {
  const { supabase } = useSupabase();
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const { data, error } = await supabase
          .from('countries')
          .select('*');

        if (error) {
          console.error('Error fetching countries:', error.message);
          return;
        }

        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error.message);
      }
    }

    fetchCountries();
  }, [supabase]);

  const handleCountrySelect = async (country) => {
    setSelectedCountry(country);
    setSelectedCity(null);
    fetchCitiesByCountry(country.id);
  };

  const fetchCitiesByCountry = async (countryId) => {
    try {
      const { data: citiesData, error: citiesError } = await supabase
        .from('cities')
        .select('*')
        .eq('country_id', countryId);

      if (citiesError) {
        console.error('Error fetching cities:', citiesError.message);
        return;
      }

      setCities(citiesData);
    } catch (error) {
      console.error('Error fetching cities:', error.message);
    }
  };

  const handleCitySelect = async (city) => {
    setSelectedCity(city);
    navigate(`/hotels/${city.name}`, { state: { city } });
  };

  const fetchHotelsByCity = async (cityId) => {
    try {
      const { data: hotelsData, error: hotelsError } = await supabase
        .from('hotels')
        .select('*')
        .eq('city_id', cityId);

      if (hotelsError) {
        console.error('Error fetching hotels:', hotelsError.message);
        return;
      }

      setHotels(hotelsData);
    } catch (error) {
      console.error('Error fetching hotels:', error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        {/* Hero Section */}
        <div className="relative bg-gray-900 overflow-hidden">
          <img className="w-full h-1/2" src={testCityImage} alt="Test City" />
        </div>
        {/* Overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-20 opacity-100 transition-transform duration-1000 ease-in-out transform-x-0">
          <h2 className="bg-black bg-opacity-50 text-white text-left uppercase relative inline-block bottom-24 sm:mr-96 sm:right-64 w-full sm:w-3/4 rounded-tr-none rounded-br-full rounded-bl-none rounded-tl-none opacity-100 transition-transform duration-1000 ease-in-out transform-x-0 p-3">
            Hoteller & destinationer
          </h2>
          <div className="bg-red-600 bg-opacity-50 relative inline-block bottom-24 sm:mr-96 sm:right-64 w-full sm:w-96 rounded-tr-none rounded-br-full rounded-bl-none rounded-tl-none p-3"></div>
        </div>
      </div>

      <div className="mt-8 px-4 lg:px-12 xl:px-24"> {/* Padding */}
        {/* Countries List */}
        <div className="text-center mt-8">
          <div className="relative inline-block w-1/2">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white"></div>
            <div className="relative z-10 bg-gray-100 p-2 rounded-lg shadow-md">
              {countries.map(country => (
                <a key={country.id} onClick={() => handleCountrySelect(country)} className="cursor-pointer hover:text-red-500 mx-2 inline-block">
                  <p className="inline-block">{country.name}</p>
                </a>
              ))}
            </div>
          </div>
        </div>



        {/* Display cities */}
        {selectedCountry && (
          <div className="cities mt-4">
            <h2 className="text-xl font-bold mb-2">Vores byer i {selectedCountry.name}</h2>
            <p>{selectedCountry.description}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {cities.map(city => (
                <div key={city.id} onClick={() => handleCitySelect(city)} className="cursor-pointer p-2 rounded-lg border border-gray-300 hover:bg-gray-100">
                  <img src={`https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/${city.image_id}.jpg`} alt={city.title} className="w-full h-40 object-cover rounded-lg" />
                  <p className="mt-2 text-center">{city.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display hotels */}
        {selectedCity && (
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold mb-4">Hotels in {selectedCity.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {hotels.map(hotel => (
                <div key={hotel.id} className="cursor-pointer p-2 rounded-lg border border-gray-300 hover:bg-gray-100">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-64 object-cover rounded-lg mb-4" />
                  <h3 className="text-xl font-bold">{hotel.title}</h3>
                  <p>{hotel.teaser}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hotels;

