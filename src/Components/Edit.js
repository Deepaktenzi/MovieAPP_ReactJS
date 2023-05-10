import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import ReactPlayer from 'react-player';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
function Edit({ data, id }) {
  const navigate = useNavigate();
  const [movname, setName] = useState();
  const [desc, setDesc] = useState();
  const [image, setImage] = useState();
  const [video, setVideo] = useState();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const uploadimg = async (e) => {
    setLoading1(true);
    const imgData = new FormData();
    imgData.append('image', e.target.files[0]);
    await Axios.post(
      'https://movieapi-ka6t.onrender.com/api/uploadImg',
      imgData
    )
      .then((res) => {
        console.log(res);
        setImage(res.data.imgurl);
      })
      .catch((err) => console.log(err));
    setLoading1(false);
  };

  const uploadvdo = async (e) => {
    setLoading2(true);
    const vdodata = new FormData();
    vdodata.append('video', e.target.files[0]);
    await Axios.post(
      'https://movieapi-ka6t.onrender.com/api/uploadvideo',
      vdodata
    ).then((res) => {
      console.log(res);
      setVideo(res.data.videourl);
    });
    setLoading2(false);
  };

  useEffect(() => {
    if (data) {
      setName(data.name);
      setDesc(data.description);
      setImage(data.thumbnail);
      setVideo(data.trailer);
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.put('https://movieapi-ka6t.onrender.com/api/editmovie', {
      id: id,
      name: movname,
      description: desc,
      thumbnail: image,
      trailer: video,
    }).then((res) => {
      alert(res.data.message);
      navigate('/dashboard/show');
    });
  };
  return (
    <>
      <h2>Edit Movie</h2>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column"
        encType="multipart/form-data"
      >
        <label className="form-label">Movie Name</label>
        <input
          className="form-control"
          type="text"
          onChange={(e) => setName(e.target.value)}
          name="name"
          value={movname}
        />

        <label className="form-label">Movie Description</label>
        <textarea
          className="form-control"
          type="text"
          onChange={(e) => setDesc(e.target.value)}
          name="description"
          value={desc}
        />
        <label className="form-label">Movie Image</label>
        <input
          className="form-control"
          type="file"
          onChange={(e) => uploadimg(e)}
          name="image"
        />
        {loading1 ? (
          <Loader />
        ) : image ? (
          <img src={image} className="img-thumbnail w-25" alt="Upload" />
        ) : null}

        <label className="form-label">Movie Video</label>
        <input
          className="form-control"
          type="file"
          onChange={(e) => uploadvdo(e)}
          accept="video/*"
          name="video"
        />
        {loading2 ? (
          <Loader />
        ) : video ? (
          <ReactPlayer controls url={video} />
        ) : null}
        <button className="btn btn-dark mt-4" type="Submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default Edit;
