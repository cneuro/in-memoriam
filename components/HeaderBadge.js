import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';

export default function HeaderBadge({ children, isMiddle }) {
  return (
    <h5 className="mb-0">
      <Badge
        variant="light"
        as="div"
        className={isMiddle && 'mr-3 ml-3'}
        style={{ display: 'flex' }}
      >
        {children}
      </Badge>
    </h5>
  );
}

HeaderBadge.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  isMiddle: PropTypes.bool,
};

HeaderBadge.defaultProps = {
  isMiddle: false,
};
