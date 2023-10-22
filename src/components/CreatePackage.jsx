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
    const [packageData, setPackageData] = useState({
        package_name: '',
        package_description: '',
        sender_name: '',
        package_from: '',
        receiver_name: '',
        package_to: '',
        sender_number: '',
        receiver_number: '',
        package_weight: null,
        package_photo: []
    })
    const handleChange = (e) => {
        setPackageData({
            ...packageData,
            [e.target.name]: e.target.value
        })
    }
    
    const { package_name, package_description, sender_name, package_from, receiver_name, package_to, sender_number, receiver_number, package_photo, package_weight } = packageData

    const handlePackageCreate = (e) => {
        e.preventDefault()
        //check if all the fields are filled
        if (!package_name || !package_description || !sender_name || !package_from || !receiver_name || !package_to || !sender_number || !receiver_number) {
            toast.error('Please fill all the fields')
            return
        }
        const data = { package_name, package_description, sender_name, package_from, receiver_name, package_to, sender_number, receiver_number, package_photo, package_weight }
        //get the current user from the Auth
        Auth.currentAuthenticatedUser()
            .then(user => {
                console.log(user)
                !user && alert('User is not authenticated')
                //add the user id to the data object
                setLoading(true)
                data['user_id'] = user.attributes.sub
                //make the API call to create the package
                API.post('package', '/packages', { body: data })
                    .then(response => {
                        toast.success('Package created successfully')
                        setPackageData({
                            package_name: '',
                            package_description: '',
                            sender_name: '',
                            package_from: '',
                            receiver_name: '',
                            package_to: '',
                            sender_number: '',
                            receiver_number: '',
                            package_weight: null,
                            package_photo: []
                        })
                        setLoading(false)
                        navigate('/packages')
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
            setPackageData((prevData) => ({
                ...prevData,
                package_photo: [...prevData.package_photo, result.key]
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
      <h1 className='page-title'>Create Package</h1>
        <div className='form-container'>
            <Form>
                <FloatingLabel
                    controlId='floatingInput'
                    label='Package Name'
                    className='mb-3'
                >
                    <Form.Control 
                        type='text'
                        name='package_name'
                        value={package_name}
                        onChange={handleChange}
                    />
                </FloatingLabel>
                <FloatingLabel
                    controlId='floatingInput'
                    label='Package Description'
                    className='mb-3'
                >
                    <Form.Control as="textarea" rows={3}
                        name='package_description'
                        value={package_description}
                        onChange={handleChange}
                    
                    />
                </FloatingLabel>
                <div className="row">
                    <div className="col">
                        <FloatingLabel
                        controlId='floatingSenderName'
                        label='Sender Name'
                        className='mb-3 custom-floating-label'
                        >
                        <Form.Control 
                            type='text' 
                            name='sender_name'
                            value={sender_name}
                            onChange={handleChange}
                        />
                        </FloatingLabel>
                    </div>
                    <div className="col">
                        <FloatingLabel
                            controlId='floatingInput'
                            label='Receiver Name'
                            className='mb-3 custom-floating-label'
                        >
                            <Form.Control 
                                type='text'
                                name='receiver_name'
                                value={receiver_name}
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <FloatingLabel
                        controlId='floatingPackageFrom'
                        label='Package From'
                        className='mb-3 custom-floating-label'
                        >
                        <Form.Control 
                            type='text'
                            name='package_from'
                            value={package_from}
                            onChange={handleChange}
                        />
                        </FloatingLabel>
                    </div>
                    <div className="col">
                        <FloatingLabel
                            controlId='floatingInput'
                            label='Package To'
                            className='mb-3 custom-floating-label'
                        >
                            <Form.Control 
                                type='text'
                                name='package_to'
                                value={package_to}
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <FloatingLabel
                            controlId='floatingInput'
                            label='Sender Number'
                            className='mb-3 custom-floating-label'
                        >
                            <Form.Control 
                                type='text'
                                name='sender_number'
                                value={sender_number}
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                    </div>
                    <div className="col">
                        <FloatingLabel
                            controlId='floatingInput'
                            label='Receiver Number'
                            className='mb-3 custom-floating-label'
                        >
                            <Form.Control 
                                type='text'
                                name='receiver_number'
                                value={receiver_number}
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <FloatingLabel
                            controlId='floatingInput'
                            label='Package Photo'
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
                    <div className="col">
                        <FloatingLabel
                            controlId='floatingInput'
                            label='Package Weight (in kg)'
                            className='mb-3 custom-floating-label'
                        >
                            <Form.Control 
                                type='text'
                                name='package_weight'
                                value={package_weight}
                                onChange={handleChange}
                            />
                        </FloatingLabel>
                    </div>
                </div>
                <button className='btn btn-primary' onClick={handlePackageCreate}>
                    {loading ? 'Creating Package...' : 'Create Package'}
                </button>
            </Form>
        </div>
    </div>
  )
}

export default CreatePackage
