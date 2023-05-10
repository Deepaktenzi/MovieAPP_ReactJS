import React, { useState } from 'react';
import Axios from 'axios';
import ReactPlayer from 'react-player';
import Loader from './Loader';
function Addmovie() {
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [image, setImage] = useState();
  const [video, setVideo] = useState();
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const uploadimg = async (e) => {
    setLoading1(true);
    const imgData = new FormData();
    imgData.append('image', e.target.files[0]);
    await Axios.post('http://localhost:4000/api/uploadImg', imgData)
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
    await Axios.post('http://localhost:4000/api/uploadvideo', vdodata).then(
      (res) => {
        console.log(res);
        setVideo(res.data.videourl);
      }
    );
    setLoading2(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.post('http://localhost:4000/api/addmovie', {
      name: name,
      description: desc,
      thumbnail: image,
      trailer: video,
    }).then((res) => {
      alert(res.data.message);
      window.location.reload();
    });
  };
  return (
    <>
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
        />

        <label className="form-label">Movie Description</label>
        <textarea
          className="form-control"
          type="text"
          onChange={(e) => setDesc(e.target.value)}
          name="description"
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

        <label className="form-label">
          Movie Video (Upload Movie Under 100mb)
        </label>
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

export default Addmovie;
