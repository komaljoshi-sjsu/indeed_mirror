import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { toast } from "react-toastify";

const AdminPhoto = (props) => {
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        const getAdminPhotos = async () => {
          const pendingPhotos = await axios("/api/getAllPhotos/", {params: { photoAdminReviewedStatus:"PENDING_APPROVAL" }});
          console.log(pendingPhotos.data.photos)
          setImages(pendingPhotos.data.photos)
        };
        getAdminPhotos();
      }, []);

    const handleStatus = (e) => {
        e.preventDefault();
        const index = e.target.getAttribute("index")
        const img = images[index]
        img.photoAdminReviewedStatus = e.target.value;
        console.log(img)
        axios.post("/api/setPhotoStatus",img)
        .then((response)=>{
            if (response.status===200){
                //reload the page or refresh the state
            }
        })
        .catch((err)=>{
            toast.error("Unable to upload picture", {
                position: toast.POSITION.TOP_CENTER,
            });
            console.log(err);
        })
    };

    return(
        <div>
            {images.map((img,index)=>(
                <Card>
                    <img src={img.imageLocation} alt="" height="136" width="136" />
                    <Button variant="primary" index={index} value = "APPROVED" onClick={handleStatus}>Approve</Button>
                    <Button variant="primary" index={index} value ="REJECTED" onClick={handleStatus}>Reject</Button>
                </Card>

            ))}
        </div>
    )
}

export default AdminPhoto;