import React from 'react';
import { FEATURES } from '../../Constants/index';
const HomeDefaultFeature = () => {

  return (
    <div className="default-features-area default-padding-top bottom-less text-center">
      <div className="container">
        <div className="item-box">
          <div className="row">
            {FEATURES.map((feature, index) => (
              <div className="col-lg-4 col-md-6 single-item" key={index}>
                <div className="item">
                  <i className={feature.ICON_CLASS} />
                  <h4>{feature.TITLE}</h4>
                  <p>{feature.DESCRIPTION}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDefaultFeature;
