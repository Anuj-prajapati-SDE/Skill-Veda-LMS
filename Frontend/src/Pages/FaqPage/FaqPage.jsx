import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import FAQImage from "../../assets/img/FAQ.webp";
import "./FaqPage.css";
import { FAQS } from "../../Constants";
const FaqPage = () => {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Navbar></Navbar>
      <Breadcrumb courseImage={FAQImage}></Breadcrumb>
      <div className="faq-area default-padding">
        <div className="container">
          <div className="faq-items">
            <div className="row align-center">
              <div className="col-lg-10 offset-lg-1">
                <div
                  className="faq-content wow fadeInUp"
                  style={{ visibility: "visible", animationName: "fadeInUp" }}
                >
                  <div className="accordion" id="accordionExample">
                    {FAQS.map((faq, index) => (
                      <div key={index} className="card">
                        <div className="card-header" id={`heading${index}`}>
                          <h4
                            className={`${activeIndex === index && " collapsed"} mb-0`}
                            onClick={() => handleToggle(index)}
                            aria-expanded={activeIndex === index}
                            aria-controls={`collapse${index}`}
                          >
                            {faq.question}
                          </h4>
                        </div>
                        <div
                          id={`collapseOne`}
                          className={`collapse ${activeIndex === index ? 'show' : ''}`}
                          aria-labelledby={`heading${index}`}
                          data-parent="#accordionExample"
                        >
                          <div className="card-body">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default FaqPage;
