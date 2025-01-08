import React, { useState } from 'react';
const Gallery = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const mockImages = [
    'https://tools-api.webcrumbs.org/image-placeholder/600/400/nature/1',
    'https://tools-api.webcrumbs.org/image-placeholder/600/400/nature/2',
    'https://tools-api.webcrumbs.org/image-placeholder/600/400/nature/3',
    'https://tools-api.webcrumbs.org/image-placeholder/600/400/nature/4',
    'https://tools-api.webcrumbs.org/image-placeholder/600/400/nature/5',
    'https://tools-api.webcrumbs.org/image-placeholder/600/400/nature/6',
  ];

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };

  return (
    <div className="bg-black text-primary-50 py-4 rounded-lg">  
    <h1 className="text-center font-title font-bold mb-4">Celebrity Gallery</h1>
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
      {mockImages.map((image, index) => (
        <div
          key={index}
          className="col cursor-pointer overflow-hidden rounded-md d-flex align-items-stretch"
          onClick={() => handleImageClick(image)}
        >
          <img
            src={image}
            alt={`Gallery item ${index}`}
            className="w-100 h-[300px] object-cover"
          />
        </div>
      ))}
    </div>
  
    {showModal && (
      <div className="modal d-flex justify-content-center align-items-center show" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}>
        <div className="modal-dialog">
          <div className="modal-content bg-black rounded-lg position-relative">
            {selectedImage && (
              <>
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-100 h-[500px] object-cover rounded-lg"
                />
                <button
                  className="btn bg-primary-500 text-primary-50 position-absolute top-0 end-0 m-3 rounded-full h-[40px] w-[40px]"
                  onClick={handleCloseModal}
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    )}
  </div>


  );
};

export default Gallery;