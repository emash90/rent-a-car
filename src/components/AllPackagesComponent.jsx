import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { API, Auth } from 'aws-amplify';

const AllPackagesComponent = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //get all the packages

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const user = await Auth.currentAuthenticatedUser();
        const data = await API.get('package', '/packages', {
          queryStringParameters: {
            user_id: user.attributes.sub,
          },
        });
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
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
