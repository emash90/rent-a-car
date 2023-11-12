import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { API } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PackageDetails = () => {
  const [ vehicleDetails, setVehicleDetails ] = useState(null)
  const [ loading, setLoading ] = useState(false)
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

  return (
    <div className='main_page'>
      <h1 className='page-title'>Vehicle Details</h1>
      {loading && <p>Loading...</p>}
      { vehicleDetails && (
        <Card style={{ width: '100%', height: '100vh' }}>
        <Card.Img variant="top" src="https://picsum.photos/200/300" style={{ height: '60%' }} />
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
                <Button variant="primary">Go Back</Button>
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