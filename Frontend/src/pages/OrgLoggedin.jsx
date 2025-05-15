import React, { useState, useEffect } from 'react';
import { useLocation , Link } from 'react-router-dom';

function OrgLoggedin() {
  const location = useLocation();
  const state = location;
  const cData = state.state.user;

  const [kycCount, setKycCount] = useState(0);
  const [hashAddress, setHashAddress] = useState('');
  const [userData, setUserData] = useState(null);
  let uData , rData;
  const [reqData , setReqData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchKycCount = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/contract/${cData.hashAddress}`);
        const data = await response.json();
        if (response.ok) {
          setKycCount(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch KYC count');
        }
      } catch (err) {
        console.error("Error fetching KYC count:", err);
      }
    };
    fetchKycCount();
  }, [cData.hashAddress]);

  const handleSearch = async () => {
  if (!hashAddress.trim()) {
    setError('Please enter a hash address');
    return;
  }

  setLoading(true);
  setError('');
  setUserData(null);

  try {
    // Step 1: Check if a request exists
    const requestRes = await fetch(`http://localhost:8000/api/requests/search?hashAddress=${hashAddress}`);
    const requestData = await requestRes.json();
    console.log(requestData);



    if (!requestRes.ok || requestData.data.length === 0) {
      throw new Error(requestData.message || 'No request found for this hash address');
    }
    setReqData(requestData.data[0]);
    rData = requestData.data[0];
    console.log(rData.status);
    

    // Step 2: Fetch full user details
    const userRes = await fetch(`http://localhost:8000/api/users/find/${hashAddress}`);
    const userDataRes = await userRes.json();
    // console.log(userDataRes.data);

    if (!userRes.ok) {
      throw new Error(userDataRes.message || 'User data could not be fetched');
    }
    
    setUserData(userDataRes.data); // assuming the API returns user data in `user`
    setIsModalOpen(true); // open the modal
    uData = userDataRes.data;
    console.log(uData);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  const handleApprove = async () => {
  if (!userData || !reqData || !reqData._id) {
    alert("Missing user/request data");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8000/api/requests/take/${reqData._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        decision: 'approved',
        approvedBy: cData.hashAddress, // 👈 pass org hash manually
      }),
    });



    const data = await response.json();
    console.log(data);

    if (response.ok) {
      // alert('KYC approved successfully!');
      const contractRes = await fetch(`http://localhost:8000/api/contract/add` , {
          method :'POST' ,
          headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          userHash: userData.hashAddress,
          issuerHash: cData.hashAddress,
        })
      })
      const contractData = await contractRes.json();
      console.log("Contract created:", contractData);
       if (!contractRes.ok) {
        throw new Error(contractData.message || 'Failed to create contract');
      }
      alert('KYC approved and contract created successfully!');
      setUserData({ ...userData, kycStatus: 'approved' });
      setReqData({ ...reqData, status: 'approved' });
    } else {
      throw new Error(data.message || 'Approval failed');
    }
  } catch (err) {
    alert(err.message);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Organisation Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Organisation Details</h2>
          <div>
            <p><strong>Name:</strong> {cData.organizationName}</p>
            <p><strong>Hash:</strong> {cData.hashAddress}</p>
            <p><strong>Email:</strong> {cData.email}</p>
            <p><strong>Contact:</strong> {cData.helplineNo}</p>
            <p><strong>KYC Issued:</strong> {kycCount}</p>
            <Link to= "/" >
              <button className="mt-4 w-52 bg-gray-700 text-white py-2 rounded-lg shadow-md hover:bg-gray-800 transition duration-300">
                Log Out
              </button>

            </Link>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">View User & Approve Requests</h2>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <input
              type="text"
              value={hashAddress}
              onChange={(e) => setHashAddress(e.target.value)}
              placeholder="Enter user's hash address"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>

      {/* Modal for User Details */}
      {isModalOpen && userData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
            
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl"
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Title */}
            <h3 className="text-xl font-bold mb-4">User Details</h3>

            {/* User Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Phone:</strong> {userData.phone}</p>
                <p>
                  <strong>KYC Status:</strong>
                  <span className={`ml-2 px-2 py-1 rounded text-m ${
                   reqData?.status  === 'approved' ? 'bg-green-100 text-green-800' :
                   reqData?.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {reqData?.status}
                  </span>
                </p>
              </div>
              <div>
                <p><strong>Address:</strong> {userData.address}</p>
                <p><strong>Aadhar:</strong> {userData.aadhar}</p>
                <p><strong>Pan:</strong> {userData.pan}</p>

                
              </div>
            </div>

            {/* Approve Button (if pending) */}
            {reqData?.status === 'pending' && (
              <button
                onClick={handleApprove}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Approve KYC
              </button>
            )}
          </div>
        </div>
      )}

       

    </div>
  );
}

export default OrgLoggedin;
