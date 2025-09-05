import React from 'react';
import { motion } from 'framer-motion';
import demoIMg from '../../assets/img/800x800.png';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const HomeEventSection = () => {
  return (
    <motion.div
      className="event-area bg-gray default-padding bottom-less"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <motion.div className="site-heading text-center" variants={fadeInUp}>
              <h5>New Event</h5>
              <h2>
                Upcoming Education Events <br /> To feed your Brain.
              </h2>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="event-area">
          <div className="row">
            {[1, 2, 3].map((day, index) => (
              <motion.div
                key={day}
                className="single-event col-lg-12"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="event-box">
                  <div className="row">
                    <div
                      className="col-lg-4 item thumb"
                      style={{ backgroundImage: `url(${demoIMg})` }}
                    ></div>
                    <div className="col-lg-3 col-md-5 item">
                      <div className="info">
                        <h2>
                          <strong>Day {day}</strong>
                        </h2>
                        <h5>{
                          day === 1 ? 'Saturday, 05 Jul 2021' :
                          day === 2 ? 'Sunday, 16 Aug 2021' :
                          'Monday, 24 Sep 2021'
                        }</h5>
                        <ul>
                          <li>
                            <i className="icon_pin_alt" /> California, TX 70240
                          </li>
                          <li>
                            <i className="icon_building" /> Room 202, First Floor
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-5 col-md-7 item">
                      <div className="content">
                        <h3>
                          <a href="#">
                            {day === 1
                              ? 'Discussion: Explorations of new approaches'
                              : day === 2
                              ? 'Social Science & Humanities for Students'
                              : 'International Conference on Art Business'}
                          </a>
                        </h3>
                        <p>
                          Pulled coming wooded tended it answer remain me be.
                          So landlord by we unlocked sensible it. Fat cannot
                          use denied excuse son law.
                        </p>
                        <ul>
                          <li>
                            <a href="#">
                              <img src="assets/img/100x100.png" alt="Thumb" />
                              {day === 1
                                ? 'Kevin & Amanda'
                                : day === 2
                                ? 'Stuard Ferrel'
                                : 'Eva Hudson'}
                            </a>
                          </li>
                          <li>
                            <i className="fas fa-clock" /> 8:00 - 16:00
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeEventSection;
