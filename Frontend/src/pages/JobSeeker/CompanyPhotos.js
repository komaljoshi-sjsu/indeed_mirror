import React, { useEffect } from "react";
import Gallery from "react-grid-gallery";
import { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import UploadPhotos from "./UploadPhotos";
import axios from "axios";

const CompanyPhotos = (props) => {
  const [imagesForGrid, setImagesForGrid] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getCompanyPhotos = async () => {
      const jobSeekerPhotos = await axios("http://localhost:5000/api/getJobSeekerPhotos");
      console.log(jobSeekerPhotos.data);
      const allPhotos = await axios("http://localhost:5000/api/getAllPhotos");
      console.log(allPhotos.data);
      //setImages([...images, jobSeekerPhotos.data.imageLocation])
    };
    getCompanyPhotos();
  }, []);

  const IMAGES = [
    {
      src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
      thumbnailWidth: 136,
      thumbnailHeight: 136,
      caption: "After Rain (Jeshu John - designerspics.com)",
    },
    {
      src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
      thumbnail:
        "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
      thumbnailWidth: 136,
      thumbnailHeight: 136,
      tags: [
        { value: "Ocean", title: "Ocean" },
        { value: "People", title: "People" },
      ],
      caption: "Boats (Jeshu John - designerspics.com)",
    },

    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 136,
      thumbnailHeight: 136,
    },
    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 136,
      thumbnailHeight: 136,
    },
    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 136,
      thumbnailHeight: 136,
    },
    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 136,
      thumbnailHeight: 136,
    },
    {
      src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
      thumbnail:
        "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
      thumbnailWidth: 136,
      thumbnailHeight: 136,
    },
  ];

  return (
    <div>
      <Container>
        <Row>
          <Col xs="8">
            <UploadPhotos />
          </Col>
        </Row>
        <Row>
          <Col xs="8">
            <Gallery images={IMAGES} enableImageSelection={false} maxRows={4} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CompanyPhotos;