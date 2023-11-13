import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { API, Storage } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PackageDetails = () => {
  const [ vehicleDetails, setVehicleDetails ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const [photoUrls, setPhotoUrls] = useState([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    const data = window.history.state.usr
    console.log("data", data);
    const fetchVehicleDetails = async () => {
      setLoading(true);
      const response = await API.get('cars', `/vehicle/object/${data.user_id}/${data.reg_number}`);
      console.log("Api called", response);
      setVehicleDetails(response);
      setLoading(false);
    }
    fetchVehicleDetails();
  }, [])

  // Get s3 bucket url
  const getPhotoUrl = async (key) => {
    try {
      setLoading(true);
      const url = await Storage.get(key);
      setLoading(false);
      return url;
    } catch (error) {
      console.log('error', error);
    }
    };

  // Get photo URL for the current index
  const getCurrentPhotoUrl = () => {
    console.log("photoUrls", photoUrls);
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

  // Fetch photo URLs for the vehicle
  useEffect(() => {
    const fetchPhotoUrls = async () => {
      if (vehicleDetails && vehicleDetails.vehicle_photo) {
        setLoading(true);
        const urls = await Promise.all(vehicleDetails.vehicle_photo.map((photo) => getPhotoUrl(photo)));
        setPhotoUrls(urls);
        setLoading(false);
      }
    };
    fetchPhotoUrls();
  }, [vehicleDetails]);

  const handleDelete = async (data) => {
    try {
      await API.del('cars', `/vehicle/object/${data.user_id}/${data.reg_number}`);
      console.log("delete success")
      navigate('/cars');
      toast.success('Vehicle deleted successfully')

    } catch (error) {
      console.log(error)
    }
  }

  const handleGoBack = () => {
    navigate('/cars');
  }

  return (
    <div className='main_page'>
      <h1 className='page-title'>Vehicle Details</h1>
      {loading && <p>Loading...</p>}
      { vehicleDetails && (
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
          <Card.Img src={getCurrentPhotoUrl()} style={{ width: '100%', height: '300px', objectFit: 'contain' }} />

        <Card.Body style={{ height: '50%', overflowY: 'auto' }}>
          <Card.Title>{vehicleDetails.reg_number}</Card.Title>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              {/* Column 1 */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Card.Text>Vehicle Make: {vehicleDetails.make.toUpperCase()}</Card.Text>
                <Card.Text>Vehicle Model: {vehicleDetails.model}</Card.Text>
                <Card.Text>Vehicle Color: {vehicleDetails.color}</Card.Text>
                <Button variant="primary">Edit Vehicle</Button>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Card.Text>Vehicle Type: {vehicleDetails.vehicle_type}</Card.Text>
                <Card.Text>Number of Passengers: {vehicleDetails.num_of_pass}</Card.Text>
                <Card.Text>Number of Doors: {vehicleDetails.num_of_doors}</Card.Text>
                <Button onClick={(e) => handleDelete(vehicleDetails)} variant="primary">Delete Vehicle</Button>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Card.Text>Vehicle Year: {vehicleDetails.manufacture_year}</Card.Text>
                <Card.Text>Vehicle Mileage: {vehicleDetails.mileage ? vehicleDetails.mileage : 'N/A' } </Card.Text>
                <Card.Text>Vehicle Condition: {vehicleDetails.condition ? vehicleDetails.condition : 'N/A'  }</Card.Text>
                <Button variant="primary" onClick={handleGoBack} >Go Back</Button>
              </div>
            </div>
        </Card.Body>
      </Card>
      )
      }
      </div>

  )
}
export default PackageDetails