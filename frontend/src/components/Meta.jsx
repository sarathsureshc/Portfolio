import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Sarath Suresh C | MERN Stack Developer',
  description: 'Professional portfolio of Sarath Suresh C, a MERN Stack Developer',
  keywords: 'MERN, React, Node.js, Express, MongoDB, JavaScript, Web Developer',
};

export default Meta;