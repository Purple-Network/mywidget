import { useState, useEffect } from "react";
import "./App.css";
import { clientConfig } from "./clientConfig";
import {
  authenticate,
  getUserMe,
  createEmailConversation,
} from "./utils/genesysCloudUtils";

function App() {
  const [count, setCount] = useState(0);

  const [authData, setAuthData] = useState({});
  const [userData, setUserData] = useState({});
  const [errorData, setErrorData] = useState({});
  const [conversation, setConversation] = useState({});
  useEffect(() => {
    const getPlatformClientData = async () => {
      try {
        const authData = await authenticate(clientConfig);
        setAuthData(authData);
        console.log("AUTH", authData);
        const userData = await getUserMe();
        setUserData(userData);
        console.log("userdata", userData);
        // Handle userData if needed
      } catch (err) {
        console.error(err);
        setErrorData({
          message: "We encountered an unexpected error. Please try again later",
          details: err.message,
        });
      }
    };
    getPlatformClientData();
  }, []);

  const clearErrorData = async () => {
    setErrorData({});
    window.location.reload(); // Refresh the entire page
  };

  const handleStartClick = async () => {
    try {
      setConversation({});
      const { flowId } = clientConfig;
      const body = {
        flowId: flowId,
        provider: "Walkin",
        attributes: {
          preferredAgent: userData.id,
        },
        toAddress: "noreply@moretonbay.qld.gov.au",
        toName: "City of Moreton Bay",
        fromAddress: "instore.visitor@moretonbay.qld.gov.au",
        fromName: "In-Store Visitor",
        subject: "In-Store Visit Inquiry",
        direction: "INBOUND",
      };
      const response = await createEmailConversation(body);
      setConversation(response);
      console.log("createEmailConversation is sucessful:");
      setTimeout(() => {
        setConversation({});
      }, 30000);
    } catch (err) {
      console.error("Error during createEmailConversation operation:", err);
      setErrorData({
        message: "An error occurred during the operation. Please try again.",
        details: err.message,
      });
    }
  };

  return (
    <>
      {errorData.message ? (
        <div className="bg-red-500 text-white p-4 rounded-lg shadow-lg mb-4">
          <p className="font-bold text-lg">Error</p>
          <p className="mt-2">{errorData.message}</p>
          <p className="mt-2 text-sm">Details: {errorData.details}</p>
          <button
            className="mt-2 px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            onClick={async () => await clearErrorData()}
          >
            Dismiss
          </button>
        </div>
      ) : (
        <>
          <div></div>
          <b>In-Store Visitor</b>
          <div className="card">
            <button
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={handleStartClick}
            >
              Start
            </button>
          </div>
          <p className="read-the-docs">
            Press the Start button to begin a conversation with a walk-in
            customer
          </p>

          {conversation.id && (
            <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg mt-4">
              <p className="font-bold text-lg">Success</p>
              <p className="mt-2">
                A conversation has been created successfully.
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default App;
