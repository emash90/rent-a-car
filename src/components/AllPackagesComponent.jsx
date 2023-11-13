import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { API, Storage, Auth } from 'aws-amplify';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


const AllPackagesComponent = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photoUrls, setPhotoUrls] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const user = await Auth.currentAuthenticatedUser();
        const data = await API.get('cars', '/vehicle');
        setCars(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleDetails = async (data) => {
    const user = await Auth.currentAuthenticatedUser();
    const response = await API.get('cars', `/vehicle/object/${data.user_id}/${data.reg_number}`);
    navigate('/cars/details', { state: response });
  };

  const getPhotoUrl = async (key) => {
    try {
      const url = await Storage.get(key);
      console.log("url now", url);
      return url;
    } catch (error) {
      console.log('error', error);
    }
  };

  // Fetch photo URLs after cars are loaded
  useEffect(() => {
    const fetchPhotoUrls = async () => {
      const urls = await Promise.all(cars.map((car) => getPhotoUrl(car.vehicle_photo[0])));
      setPhotoUrls(urls);
    };

    if (cars.length > 0) {
      fetchPhotoUrls();
    }
  }, [cars]);

  if (loading) {
    return (
      <div className='main_page'>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='main_page'>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  return (
    <div className='main_page'>
      <h1 className='page-title'>My Vehicles</h1>
      { cars && cars.length > 0 ? cars.map((car, index) => (
        <Card key={index} style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
          <div style={{ width: '200px' }}>
            <Card.Img src={photoUrls[index]} style={{ width: '200px', height: '200px' }} />
          </div>
          <div style={{ width: '350px' }}>
            <Card.Body>
              <Card.Title>{car.make.toUpperCase()} <span>{car.model.toUpperCase()}</span></Card.Title>
              <Card.Text>
                {car.available === 'yes' ? 'Available' : 'Not Available'}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>passengers: {car.num_of_pass}</ListGroup.Item>
              
            </ListGroup>
            </div>
            <div style={{ width: '500px' }}>
            <Card.Body>
              <Card.Text>Vehicle Details</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Engine Rating: {car.engine_rating} cc</ListGroup.Item>
              <ListGroup.Item>Vehicle Type: {car.vehicle_type}</ListGroup.Item>
            </ListGroup>
          </div>
          <div style={{ width: '100px' }}>
            <ListGroup className="list-group-flush" style={{ display: 'flex', flexDirection: 'column' }}>
              <Button style={{marginTop: '100px'}} variant="secondary" onClick={() => handleDetails(car)}>View</Button>
            </ListGroup>
          </div>
        </Card>
      )) : <p> You don't have any vehicles added. Go to <Link to='/add-car'>Add a Car</Link> to add one</p>}
    </div>
  );
}

export default AllPackagesComponent;
