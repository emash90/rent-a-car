import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { API, Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

const AllPackagesComponent = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //get all the packages

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const user = await Auth.currentAuthenticatedUser();
        const data = await API.get('package', '/packages');
        setPackages(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchPackages();
  }, []);
  if (loading) {
    return (
      <div className='main_page'>
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className='main_page'>
        <p>Error: {error.message}</p>
    </div>)
  }
  const handleDetails = async (data) => {
    console.log('Details clicked', data);
    //get details for one package
    const user = await Auth.currentAuthenticatedUser();
    const response = await API.get('package', `/packages/object/${data.user_id}/${data.package_name}`)
    console.log(response);
    navigate('/packages/details', { state: response });
  }

  return (
    <div className='main_page'>
      <h1 className='page-title'>All Packages</h1>
      <div className='table-container'>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Package Name</th>
              <th>Package Description</th>
              <th>Sender Name</th>
              <th>Package From</th>
              <th>Receiver Name</th>
              <th>Package To</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {packages && packages.length > 0 ? (
              packages.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.package_name}</td>
                  <td>{item.package_description}</td>
                  <td>{item.sender_name}</td>
                  <td>{item.package_from}</td>
                  <td>{item.receiver_name}</td>
                  <td>{item.package_to}</td>
                  <td>
                    <button className='btn btn-primary' onClick={e=>{handleDetails(item)}}>View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className='text-center'>
                  No packages found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default AllPackagesComponent;
