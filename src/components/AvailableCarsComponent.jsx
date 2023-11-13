import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'

import { API, Auth } from 'aws-amplify'

const AvailableCarsComponent = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            setLoading(true);
            try {
                //get all cars
                const data = await API.get('cars', '/vehicle', {
                    // query parameters
                    queryStringParameters: {
                        make: 'toyota',
                    }
                });
                console.log("Api response", data);
                setCars(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }
        fetchCars();
    }, []);
    if (loading) {
        return (
            <div className='main_page'>
                <p>Loading...</p>
            </div>
        )
    }
  return (
    <div>
        <div className='main_page'>
            <h1 className='page-title'>Available Cars</h1>
            { cars && cars.length > 0 ? cars.map((car, index) => (
                <Card key={index} style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                    <div style={{ width: '100px' }}>
                        <Card.Img src='https://picsum.photos/200/300' />
                    </div>
                    <Card.Title>{car.reg_number}</Card.Title>
                    <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Card.Text>
                            {car.make.toUpperCase()} {car.model.toUpperCase()}
                        </Card.Text>
                        <Card.Text>
                            {car.available ? 'Available' : 'Not Available'}
                        </Card.Text>
                        <Button onClick={(e) => handleDetails(car)} variant="primary">View Details</Button>
                    </Card.Body>
                </Card>
            )) : (
                <p>No cars available</p>
            )}
            </div>
    </div>
  )
}

export default AvailableCarsComponent
