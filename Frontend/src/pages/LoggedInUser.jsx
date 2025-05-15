import React , {useState , useEffect} from 'react';
import { useLocation , Link } from 'react-router-dom';

function LoggedInUser() {
  const location = useLocation();
  const { state } = location;
  const [showModal, setShowModal] = useState(false);
  const [existingRequest, setExistingRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    const checkRequestStatus = async () => {
      if (state?.user?.hashAddress) {
        setIsLoading(true);
        try {
          const response = await fetch(`http://localhost:8000/api/requests/search?hashAddress=${state.user.hashAddress}`);
          const data = await response.json();
          
          if (response.ok && data.data?.length > 0) {
            // Assuming the most recent request is first
            setExistingRequest(data.data[0]);
          }
        } catch (error) {
          console.error("Error checking request status:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    checkRequestStatus();
  }, [state?.user?.hashAddress]);
  if (!state?.user) {
    return (
      <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-400">
        <div className="w-full max-w-2xl bg-white p-10 rounded-xl shadow-2xl text-gray-800">
          <h2 className="text-3xl font-bold mb-6 text-center">No user data found</h2>
          <p className="text-center">Please log in first</p>
        </div>
      </div>
    );
  }

  const { user, role } = state;
  const closeModal = () => {
    setShowModal(false);
  };
  // console.log("user : " + stat);

  const handleGenerateRequest = async() => {
    if (existingRequest) {
      setShowModal(true);
      return;
    }
    setIsLoading(true);
    try {
      console.log('Generating request for:', user);
      alert("Request generated successfully");
      const response = await fetch(`http://localhost:8000/api/requests/${user.hashAddress}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        setExistingRequest(data.data);
        alert("KYC request created successfully!");
      } else {
        throw new Error(data.message || "Failed to create request");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }

  };

  // console.log(user.kycStatus);

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center bg-gray-400">
      <div className="w-full max-w-2xl bg-white p-10 rounded-xl shadow-2xl text-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {role === 'customer' ? 'User Details' : 'Organization Details'}
        </h2>
        <div className="space-y-4 text-lg">
          <p><strong>Hash Address:</strong> {user.hashAddress}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone No:</strong> {user.phone}</p>
          {role === 'customer' && (
            <>
              <p><strong>Aadhar:</strong> {user.aadhar}</p>
              <p><strong>Pan:</strong> {user.pan}</p>
            </>
          )}
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>Kyc Status:</strong> {user.kycStatus || 'Not Verified'}</p>
        </div>
        <button
          onClick={handleGenerateRequest}
          disabled={isLoading}
          className={`mt-8 w-full ${
            isLoading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
          } text-white py-3 px-6 rounded-lg text-lg font-semibold transition-all`}
        >
          {isLoading 
            ? 'Processing...' 
            : existingRequest 
              ? 'View Request Status' 
              : 'Generate Request'
          }
        </button>
        <Link to= "/" >
        <button className="mt-4 w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-colors duration-300">
          Log Out
        </button>

        </Link>


        {showModal && existingRequest && (
          <div className="fixed inset-0 bg-gray-500  flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">KYC Request Status</h3>
              
              <div className="space-y-3">
                <p><strong>Status:</strong> 
                  <span className={`ml-2 px-2 py-1 rounded ${
                    existingRequest.status === 'approved' ? 'bg-green-100 text-green-800' :
                    existingRequest.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {existingRequest.status}
                  </span>
                </p>
                <p><strong>Date Submitted:</strong> {new Date(existingRequest.createdAt).toLocaleString()}</p>
                {existingRequest.decisionDate && (
                  <p><strong>Date Decided:</strong> {new Date(existingRequest.decisionDate).toLocaleString()}</p>
                )}
                {existingRequest.orgNotes && (
                  <p><strong>Notes:</strong> {existingRequest.orgNotes}</p>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoggedInUser;