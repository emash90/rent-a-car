import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { API, Auth, Storage } from 'aws-amplify';
import { Link, useNavigate } from 'react-router-dom';

const AvailableCarsComponent = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photoUrls, setPhotoUrls] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        // get all cars
        const data = await API.get('cars', '/vehicle', {
          // query parameters
          queryStringParameters: {
            make: 'toyota',
          },
        });
        console.log("Api response", data);
        setCars(data);

        // Fetch photo URLs concurrently
        const urls = await Promise.all(data.map((car) => getPhotoUrl(car.vehicle_photo[0])));
        setPhotoUrls(urls);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) {
    return (
      <div className='main_page'>
        <p>Loading...</p>
      </div>
    );
  }

  const handleDetails = async (data) => {
    // get details for one car
    const user = await Auth.currentAuthenticatedUser();
    const response = await API.get('cars', `/vehicle/object/${data.user_id}/${data.reg_number}`);
    console.log("response", response);
    navigate('/cars/details', { state: response });
  };

  // get s3 bucket url
  const getPhotoUrl = async (key) => {
    try {
      const url = await Storage.get(key);
      console.log("url", url);
      return url;
    } catch (error) {
      console.error("Error fetching S3 image URL:", error);
      return null;
    }
  };

  return (
    <div>
      <div className='main_page'>
        <h1 className='page-title'>Available Cars</h1>
        {cars && cars.length > 0 ? (
          cars.map((car, index) => (
            <Link onClick={(e) => handleDetails(car)} style={{textDecoration: 'none'}}>
            <Card key={index} style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
              <div style={{ width: '250px' }}>
                {/* Use the photo URL from the array */}
                <Card.Img src={photoUrls[index]} alt={`Car ${index}`} style={{ width: '100%', height: '100%'}} />
              </div>
              <Card.Title>{car.reg_number}</Card.Title>
              <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Card.Text>
                  {car.make.toUpperCase()} {car.model.toUpperCase()}
                </Card.Text>
                <Card.Text>{car.available === 'yes' ? 'Available' : <p style={{color: 'red'}}>Not Available</p>}</Card.Text>
                <Button onClick={(e) => handleDetails(car)} variant="primary">
                  View Details
                </Button>
              </Card.Body>
            </Card>
            </Link>
          ))
        ) : (
          <p>No cars available</p>
        )}
      </div>
    </div>
  );
};

export default AvailableCarsComponent;
