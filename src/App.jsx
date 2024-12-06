import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState("");

  const userId = "67497323adb3351eec173c46";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append("profileImage", file);
    formData.append("userId", userId);

    console.log("Form data being sent:");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/upload-profile-image",
        formData
      );
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      setMessage(error.response?.data?.error || "Upload failed");
    }
  };

  return (
    <div>
      <h1>Profile Image Upload</h1>
      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginBottom: "10px" }}
        />
        <button type="submit">Upload</button>
      </form>
      {preview && (
        <div>
          <h3>Preview:</h3>
          <img
            src={preview}
            alt="Preview"
            style={{ width: "200px", height: "auto" }}
          />
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
