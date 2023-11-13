import React, { useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { API, Auth, Storage } from 'aws-amplify'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreatePackage = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [vehicleData, setVehicleData] = useState({
        reg_number: '',
        make: '',
        model: '',
        manufacture_year: '',
        engine_rating: '',
        num_of_pass: '',
        vehicle_type: '',
        fuel: '',
        available: '',
        vehicle_photo: []
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicleData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    
    const { reg_number, make, model, manufacture_year, engine_rating, num_of_pass, vehicle_type, fuel, available, vehicle_photo } = vehicleData

    const handlePackageCreate = (e) => {
        console.log("data", vehicleData)
        e.preventDefault()
        //check if all the fields are filled
        if ( !reg_number || !make || !model || !manufacture_year || !engine_rating || !num_of_pass || !vehicle_type || !fuel || !available || !vehicle_photo ) {
            toast.error('Please fill all the fields')
            return
        }
        const data = { reg_number:  reg_number.replace(/\s/g, '').toUpperCase(), make, model, manufacture_year, engine_rating, num_of_pass: parseInt(num_of_pass), vehicle_type, fuel, available, vehicle_photo }
        //get the current user from the Auth
        Auth.currentAuthenticatedUser()
            .then(user => {
                console.log(user)
                !user && alert('User is not authenticated')
                //add the user id to the data object
                setLoading(true)
                data['user_id'] = user.attributes.sub
                //add the user details to the data object
                data['user_details'] = {
                    first_name: user.attributes.name,
                    surname: user.attributes.family_name,
                    email: user.attributes.email,
                    phone_number: user.attributes.phone_number
                }
                //make the API call to create the package
                API.post('cars', '/vehicle', { body: data })
                    .then(response => {
                        toast.success('Package created successfully')
                        setVehicleData({
                            make: '',
                            model: '',
                            manufacture_year: '',
                            engine_rating: '',
                            num_of_pass: '',
                            vehicle_type: '',
                            fuel: '',
                            available: '',
                            vehicle_photo: []
                        })
                        setLoading(false)
                        navigate('/cars')
                    })
                    .catch(error => {
                        console.log(error)
                        toast.error('Something went wrong')
                        setLoading(false)
                    })
            })
            .catch(error => {
                console.log(error)
                toast.error('Something went wrong')
                setLoading(false)
            })
    }

    //upload the photo to S3
    const handlephotos = async (e) => {
        setUploading(true)
        const file = e.target.files[0]
        try {
            const result = await Storage.put(file.name, file, {
                level: 'public',
                contentType: 'image/png'
            })
            setVehicleData((prevData) => ({
                ...prevData,
                vehicle_photo: [...prevData.vehicle_photo, result.key]
            }));
            setUploading(false)
            setUploadSuccess(true)
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
            setUploading(false)
            setUploadSuccess(false)
        }
    }

  return (
    <div className='main_page'>
      <h1 className='page-title'>Add Car</h1>
        <div className='form-container'>
            <Form>
            <FloatingLabel
                controlId='floatingInput'
                label='Vehicle Reg. Number'
                className='mb-3'
            >
                <Form.Control as="textarea" rows={3}
                    name='reg_number'
                    value={reg_number}
                    onChange={handleChange}
                
                />
            </FloatingLabel>
            <FloatingLabel
                controlId='floatingInput'
                label='Vehicle Make'
                className='mb-3'
            >
                <Form.Control 
                    as="select"
                    name='make'
                    value={make}
                    onChange={handleChange}
                >
                    <option value=''>Select a make</option>
                    <option value='toyota'>Toyota</option>
                    <option value='nissan'>Nissan</option>
                    <option value='honda'>Honda</option>
                    <option value='mazda'>Mazda</option>
                </Form.Control>
            </FloatingLabel>
            <FloatingLabel
                controlId='floatingInput'
                label='Vehicle Model'
                className='mb-3'
            >
                <Form.Control as="textarea" rows={3}
                    name='model'
                    value={model}
                    onChange={handleChange}
                
                />
            </FloatingLabel>
                <div className="row">
                    <div className="col">
                        <FloatingLabel
                        controlId='floatingSenderName'
                        label='Manufacture Year'
                        className='mb-3 custom-floating-label'
                        >
                            <Form.Control 
                                as="select"
                                name='manufacture_year'
                                value={manufacture_year}
                                onChange={handleChange}
                            >
                                <option value=''>Select a year</option>
                                {/* Assuming you want a range of years, you can generate options dynamically */}
                                {Array.from({ length: 10 }, (v, i) => new Date().getFullYear() - i).map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </Form.Control>
                        </FloatingLabel>
                    </div>
                    <div className="col">
                        <FloatingLabel
                            controlId='floatingInput'
                            label='Engine Rating'
                            className='mb-3 custom-floating-label'
                        >
                            <Form.Control 
                                type='text'
                                name='engine_rating'
                                value={engine_rating}
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <FloatingLabel
                        controlId='floatingPackageFrom'
                        label='Number of Passengers'
                        className='mb-3 custom-floating-label'
                        >
                        <Form.Control 
                            type='number'
                            name='num_of_pass'
                            value={num_of_pass}
                            onChange={handleChange}
                        />
                        </FloatingLabel>
                    </div>
                    <div className="col">
                        <FloatingLabel
                            controlId='floatingInput'
                            label='Vehicle Type'
                            className='mb-3 custom-floating-label'
                        >
                            <Form.Control 
                                as="select"
                                name='vehicle_type'
                                value={vehicle_type}
                                onChange={handleChange}
                            >
                                <option value=''>Select a type</option>
                                <option value='sedan'>Sedan (4 or less pass)</option>
                                <option value='suv'>SUV (more than 5 pass but less than 7)</option>
                                <option value='van'>Van (more than 7 but less than 14 pass)</option>
                                <option value='bus'>Bus (more than 14 but less than 33 pass)</option>
                                <option value='truck'>Truck (pick-up or lorry) </option>
                            </Form.Control>
                        </FloatingLabel>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                    <FloatingLabel
                        controlId='floatingInput'
                        label='Fuel Type'
                        className='mb-3 custom-floating-label'
                    >
                        <Form.Control 
                            as="select"
                            name='fuel'
                            value={fuel}
                            onChange={handleChange}
                        >
                            <option value=''>Select a fuel type</option>
                            <option value='petrol'>Petrol</option>
                            <option value='diesel'>Diesel</option>
                            <option value='hybrid'>Hybrid</option>
                        </Form.Control>
                    </FloatingLabel>
                    </div>
                    <div className="col">
                        <FloatingLabel
                            controlId='floatingInput'
                            label='Available'
                            className='mb-3 custom-floating-label'
                        >
                            <Form.Control 
                                as="select"
                                name='available'
                                value={available}
                                onChange={handleChange}
                            >
                                <option value=''>Select an option</option>
                                <option value='no'>No</option>
                                <option value='yes'>Yes</option>
                            </Form.Control>
                        </FloatingLabel>
                    </div>

                </div>
                <div className="row">
                    <div className="col">
                        <FloatingLabel
                            controlId='floatingInput'
                            label='Vehicle Photos'
                            className='mb-3 custom-floating-label'
                        >
                            <Form.Control 
                                type='file'
                                onChange={handlephotos}
                                accept='image/png'
                            />
                            {uploading && <p>Uploading photo...</p>}
                            {uploadSuccess && !uploading ? <p style={{color: 'green'}}>Photo uploaded successfully</p> : null}
                        </FloatingLabel>
                    </div>
                </div>
                <button className='btn btn-primary' onClick={handlePackageCreate}>
                    {loading ? 'Adding car...' : 'Add Car'}
                </button>
            </Form>
        </div>
    </div>
  )
}

export default CreatePackage
