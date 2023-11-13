import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import { Storage, API } from 'aws-amplify';

const ViewVehicleDetails = () => {
  const [photoUrls, setPhotoUrls] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const navigate = useNavigate();

  // Get details of the vehicle from the navigation state
  const details = useLocation().state;
  console.log('details', details);

  // Fetch photo URLs for the vehicle
  
 useEffect(() => {
    const fetchPhotoUrls = async () => {
      const urls = await Promise.all(details.vehicle_photo.map((photo) => getPhotoUrl(photo)));
      setPhotoUrls(urls);
    };
    fetchPhotoUrls();
  }, []);

    // Get s3 bucket url
    const getPhotoUrl = async (key) => {
        try {
            const url = await Storage.get(key);
            return url;
        } catch (error) {
            console.log('error', error);
        }
        };
        

  // Get photo URL for the current index
  const getCurrentPhotoUrl = () => {
    return photoUrls[currentPhotoIndex];
  };

  // Move to the next photo
  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photoUrls.length);
  };

  // Move to the previous photo
  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photoUrls.length) % photoUrls.length);
  };

const handleGoBack = () => {
    navigate('/home');
}
const getOwnerDetails = async (user_id) => {
    console.log("user_id", user_id);
}

  return (
    <div className='main_page'>
      <h1 className='page-title'>Vehicle Details</h1>
      {details && (
        <Card style={{ width: '100%', height: '100vh', position: 'relative' }}>
          <span
            className='arrow left-arrow'
            onClick={prevPhoto}
            style={{ position: 'absolute', top: '25%', left: '10px', cursor: 'pointer' }}
          >
            {'<'}
          </span>
          <span
            className='arrow right-arrow'
            onClick={nextPhoto}
            style={{ position: 'absolute', top: '25%', right: '10px', cursor: 'pointer' }}
          >
            {'>'}
          </span>
          <Card.Img
            variant='top'
            src={getCurrentPhotoUrl()}
            style={{ height: '60%', objectFit: 'contain' }}
            alt={`Car ${details.reg_number}`}
            onClick={nextPhoto}
          />
          <Card.Body style={{ height: '50%', overflowY: 'auto' }}>
            <Card.Title>{details.reg_number}</Card.Title>
            <Card.Text>Vehicle Make: {details.make.toUpperCase()}</Card.Text>
            <Card.Text>Vehicle Model: {details.model}</Card.Text>
            <Card.Text>Vehicle Color: {details.color ? details.color : 'N/A'} </Card.Text>
            <Card.Text>Vehicle Type: {details.vehicle_type}</Card.Text>
            <Card.Text>
              Vehicle Available?:{' '}
              <span>
                {details.available === 'yes' ? (
                  <span style={{ color: 'green' }}> Yes </span>
                ) : (
                  <span style={{ color: 'red' }}> No </span>
                )}
              </span>
            </Card.Text>
            <Card.Text>Vehicle Type: {details.vehicle_type}</Card.Text>
            <Button variant='secondary' onClick={handleGoBack}>
              Back
            </Button>
            <Button variant='primary' onClick={() => getOwnerDetails(details.user_id)} style={{ marginLeft: '10px' }}>
              Get Owner Details
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ViewVehicleDetails;
