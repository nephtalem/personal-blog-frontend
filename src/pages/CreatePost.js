import { useState } from "react";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import styles for the editor
import { useAuth } from "../services/api";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    ["link", "image"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"], // Remove formatting button
  ],
};

const CreatePost = () => {
  const { createPost } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
  });
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const createNewPost = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("summary", formData.summary);
    data.append("content", content);
    data.append("file", file); // assuming `file` is the file object

    createPost(data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <form onSubmit={createNewPost} className="space-y-4">
        <div className="form-row">
          <input
            type="text"
            className="form-input border border-gray-300 rounded-lg p-2 w-full"
            name="title"
            required
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            className="form-input border border-gray-300 rounded-lg p-2 w-full"
            name="summary"
            required
            placeholder="Summary"
            value={formData.summary}
            onChange={handleChange}
          />
        </div>
        <div className="form-row">
          <input
            type="file"
            className="form-input border border-gray-300 rounded-lg p-2 w-full"
            required
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div>
          <ReactQuill
            value={content}
            onChange={(e) => setContent(e)} // Update state on change
            modules={modules}
            className="border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="submit-btn w-full bg-blue-500 text-white font-semibold rounded-lg py-2 hover:bg-blue-600 transition duration-200"
        >
          Create post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
