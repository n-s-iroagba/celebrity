import React from 'react';
const Bio = () => {
  return (
    <div className="w-full shadow-lg rounded-lg bg-white p-4">
      <div className="flex gap-4">
        <img
          src="https://tools-api.webcrumbs.org/image-placeholder/100/100/avatars/1"
          alt="Celebrity Avatar"
          className="rounded-full"
          style={{ width: '100px', height: '100px', objectFit: 'contain' }}
        />
        <div>
          <h1 className="text-neutral-950 text-2xl font-title font-bold">Celebrity Name</h1>
          <p className="text-neutral-500">Actor, Producer</p>
        </div>
      </div>
      <p className="mt-4 text-neutral-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vitae
        turpis condimentum, facilisis lectus ut, malesuada nunc. Mauris sit amet
        venenatis ante.
      </p>
    </div>
  );
};

export default Bio;