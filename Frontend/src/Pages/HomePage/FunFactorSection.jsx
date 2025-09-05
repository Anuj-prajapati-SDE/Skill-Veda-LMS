import React, { useEffect, useState, useRef } from "react";
import { FUN_FACTOR_SECTION } from "../../Constants/index.js";

const FunFactorSection = () => {
  const [counts, setCounts] = useState(FUN_FACTOR_SECTION.COUNTERS.map(() => 0));
  const sectionRef = useRef(null);
  const hasStarted = useRef(false); // To prevent multiple triggers

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true; // Mark as started
          startCounting();
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const startCounting = () => {
    FUN_FACTOR_SECTION.COUNTERS.forEach((counter, index) => {
      let start = 0;
      const duration = 8000; // Total animation time in milliseconds
      const step = Math.ceil(counter.TARGET / (duration / 30)); // Adjust step size

      const updateCounter = () => {
        setCounts((prev) =>
          prev.map((value, i) => (i === index ? Math.min(value + step, counter.TARGET) : value))
        );

        if (start < counter.TARGET) {
          start += step;
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  return (
    <div
      ref={sectionRef}
      className="fun-factor-area overflow-hidden bg-gradient text-light default-padding"
    >
      <div className="container">
        <div className="fun-fact-items text-center">
          <div
            className="fixed-bg contain"
            style={{ backgroundImage: `url(${FUN_FACTOR_SECTION.BACKGROUND_IMAGE})` }}
          />
          <div className="row">
            {FUN_FACTOR_SECTION.COUNTERS.map((counter, index) => (
              <div key={counter.ID} className="col-lg-3 col-md-6 item">
                <div className="fun-fact">
                  <div className="counter">
                    <div className="timer">{counts[index]}</div> 
                    <div className="operator">{counter.SUFFIX}</div>
                  </div>
                  <span className="medium">{counter.LABEL}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunFactorSection;
