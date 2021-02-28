import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';

export default function HeaderBadge({ children }) {
  return (
    <h5 className="mb-0">
      <Badge variant="light" as="div" className="mr-2 ml-2" style={{ display: 'flex' }}>
        {children}
      </Badge>
    </h5>
  );
}

HeaderBadge.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};
