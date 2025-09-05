import React from "react";
import { COURSE_ADVISOR_SECTION } from "../../Constants/index.js";

const CourseAdvisorSection = () => {
  return (
    <div className="advisor-area default-padding bottom-less">
      <div className="container">
        <div className="heading-left">
          <div className="row">
            <div className="col-lg-5">
              <h5>{COURSE_ADVISOR_SECTION.HEADING}</h5>
              <h2>{COURSE_ADVISOR_SECTION.SUBHEADING}</h2>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <p>{COURSE_ADVISOR_SECTION.DESCRIPTION}</p>
              {/* <a className="btn btn-md btn-dark border" href="#">
                {COURSE_ADVISOR_SECTION.BUTTON_TEXT}{" "}
                <i className={COURSE_ADVISOR_SECTION.BUTTON_ICON_CLASS} />
              </a> */}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="advisor-items text-center">
          <div className="row">
            {COURSE_ADVISOR_SECTION.ADVISORS.map((advisor, index) => (
              <div key={index} className="single-item col-lg-3 col-md-6">
                <div className="item">
                  <div className="thumb">
                    <img src={advisor.IMAGE_SRC} alt={advisor.IMAGE_ALT} />
                    <ul>
                      {advisor.SOCIAL_LINKS.map((social, socialIndex) => (
                        <li key={socialIndex} className={social.PLATFORM}>
                          <a href={social.URL}>
                            <i className={social.ICON_CLASS} />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="info">
                    <h4>
                      <a href="#">{advisor.NAME}</a>
                    </h4>
                    <span>{advisor.TITLE}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAdvisorSection;
