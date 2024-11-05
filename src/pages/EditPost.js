import { useEffect, useState } from "react";
import ReactQuill from "react-quill"; // Import React Quill
import "react-quill/dist/quill.snow.css"; // Import styles for the editor
import { useAuth } from "../services/api";
import { useParams } from "react-router-dom";
import { api } from "../services/api";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline"],
    ["link", "image"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"], // Remove formatting button
  ],
};

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  const { updatePost } = useAuth();

  useEffect(() => {
    getSinglePost(id);
  }, [id]);

  const getSinglePost = async (id) => {
    try {
      const resp = await api.get(`/post/${id}`);
      console.log(resp.data);
      const { title, summary, content } = resp.data;
      setTitle(title);
      setContent(content);
      setSummary(summary);
    } catch (err) {
      console.log(err);
    }
  };

  const onUpdatePost = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files?.[0]); // assuming `file` is the file object
    data.set("id", id);

    console.log(id)
    updatePost(data, id);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={onUpdatePost} className="space-y-4">
        <div className="form-row">
          <input
            type="text"
            className="form-input border border-gray-300 rounded-lg p-2 w-full"
            name="title"
            required
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-row">
          <input
            type="text"
            className="form-input border border-gray-300 rounded-lg p-2 w-full"
            name="summary"
            required
            placeholder="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <div className="form-row">
          <input
            type="file"
            className="form-input border border-gray-300 rounded-lg p-2 w-full"
            onChange={(e) => setFiles(e.target.files)}
          />
        </div>
        <div>
          <ReactQuill
            value={content}
            onChange={setContent} // Update state on change
            modules={modules}
            className="border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="submit-btn w-full bg-blue-500 text-white font-semibold rounded-lg py-2 hover:bg-blue-600 transition duration-200"
        >
          Update post
        </button>
      </form>
    </div>
  );
};

export default EditPost;
