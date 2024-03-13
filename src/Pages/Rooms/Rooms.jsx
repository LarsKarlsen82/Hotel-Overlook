import React, { useEffect, useState } from 'react';
import { useSupabase } from '../../Providers/SupabaseProvider';

const Rooms = () => {
  const { supabase } = useSupabase();
  const [roomImages, setRoomImages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Adjust the fetchRoomImages function to match your Supabase schema and column names
  const fetchRoomImages = async (roomId) => {
    try {
      setIsLoading(true);

      const { data, error } = await supabase
        .from('images')
        .select('filename') // Replace 'filename' with your actual column name for image filenames
        .eq('id', roomId); // Adjust the condition based on your data structure

      if (error) {
        throw new Error('Error fetching room images');
      }

      if (data) {
        const roomImage = data.length > 0 ? data[0].filename : null;
        setRoomImages(roomImage ? [roomImage] : []);
      }
    } catch (error) {
      console.error(error.message);
      setFetchError('An error occurred while fetching data.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate an array of room IDs from 62 to 78
  const roomIds = Array.from({ length: 17 }, (_, index) => index + 62);

  useEffect(() => {
    if (selectedRoom) {
      const roomId = parseInt(selectedRoom);
      fetchRoomImages(roomId);
    }
  }, [supabase, selectedRoom]);

  return (
    <div>
      {/* Your room selection UI here */}
      {/* For example, a dropdown to select room type */}
      <select onChange={(e) => setSelectedRoom(e.target.value)}>
        <option value="">Select a room</option>
        {roomIds.map((roomId) => (
          <option key={roomId} value={roomId}>
            Room {roomId}
          </option>
        ))}
      </select>

      {/* Display room images */}
      <div>
        <h2>Room Images</h2>
        {isLoading && <p>Loading...</p>}
        {fetchError && <p>{fetchError}</p>}
        {roomImages.map((image, index) => (
          <img key={index} src={`https://ouxemfujuurkzesgdrsu.supabase.co/storage/v1/object/public/Test_storage/${image}.jpg`} alt={`Room ${selectedRoom}`} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
