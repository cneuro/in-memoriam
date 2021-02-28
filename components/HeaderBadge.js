import React from 'react';
import PropTypes from 'prop-types';
import Badge from 'react-bootstrap/Badge';

export default function HeaderBadge({ children, className }) {
  return (
    <h5 className="mb-0">
      <Badge variant="light" as="div" className={className}>
        {children}
      </Badge>
    </h5>
  );
}

HeaderBadge.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  className: PropTypes.string,
};

HeaderBadge.defaultProps = {
  className: null,
};
