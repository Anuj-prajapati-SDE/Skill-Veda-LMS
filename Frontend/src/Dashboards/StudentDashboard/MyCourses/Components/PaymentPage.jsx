import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
} from "react-bootstrap";
import toast from "react-hot-toast";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./PaymentPage.css";
const apiUrl = import.meta.env.VITE_Backend_URL;


const PaymentPage = ({ userDetails, courseData }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const notifyA = (e) => toast.success(e);
  const notifyB = (e) => toast.error(e);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowModal(false);
    notifyA("Logged Out Successfully");
    navigate("/"); // Redirect to home 
  };
  const { id } = useParams();
  const isEnrolled = userDetails?.user?.enrolledCourses?.includes(id);
  const CourseData = courseData.find((data) => data._id === id);
console.log(CourseData)
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [enrollUserData, setEnrollUserData] = useState({});
  const [couponCode, setCouponCode] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const fullPaymentAmount = CourseData.fees;
  const RegistrationLectureAmount = 1000;
  const [selectedPaymentType, setSelectedPaymentType] = useState("Paid Full Fees");
  const [totalAmount, setTotalAmount] = useState(fullPaymentAmount);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    fetchEnrolledUser()
  }, []);
  const fetchEnrolledUser = async () => {
    const userId = localStorage.getItem('userId');
    const courseId = id;
    try {
      if (!userId) {
        throw new Error("User ID not found in localStorage");
      }
      const response = await axios.get(`${apiUrl}/api/user/getEnrollmentStudent/${userId}/${courseId}`);
      if (response.data) {
        setEnrollUserData(response.data);
        // console.log(response.data)
        // Update state with enrolled student data
      }
      else {
        throw new Error("No enrolled student data found.");
      }
    }
    catch (error) {
      console.error("Error fetching enrolled courses:", error.message);
    }
  };
  const couponList = {
    GET50: 500,
    OFFER10: 1000,
    SAVE20: 2000,
  };

  const handleApplyCoupon = () => setShowCouponModal(true);
  const handleCloseModal = () => {
    setShowCouponModal(false);
    setErrorMessage("");
  };

  const applyCoupon = () => {
    if (selectedPaymentType !== "Paid Full Fees") {
      setErrorMessage("Coupons are only applicable for Paid Full Fees.");
      return;
    }
    if (couponList[couponCode]) {
      const discount = couponList[couponCode];
      setCouponDiscount(discount);
      setTotalAmount(fullPaymentAmount - discount - discountAmount);
      setShowCouponModal(false);
      setErrorMessage(""); 
    } else {
      setErrorMessage("Invalid coupon code. Please try again.");
    }
  };

  const handlePaymentChange = (event) => {
    const paymentType = event.target.value;
    setSelectedPaymentType(paymentType);

    if (paymentType === "Paid Full Fees") {
      setTotalAmount(fullPaymentAmount - discountAmount - couponDiscount);
      setDiscountAmount(0);
    }
    else {
      setTotalAmount(RegistrationLectureAmount);
      setDiscountAmount(0);
      setCouponDiscount(0);
    }
  };  

  // Initialize Razorpay
  const initiatePayment = async () => {
    const UserId = localStorage.getItem("userId");
    try {
      const response = await fetch(`${apiUrl}/api/payment/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount- enrollUserData.PayedAmount,
          name: userDetails.user.name,
          email: userDetails.user.email,
          contact: userDetails.user.phoneNumber,
          description: CourseData.description,
          image: CourseData.image,
          paymentType: selectedPaymentType,
          courseName: CourseData.name,
          RegistrationAmount:RegistrationLectureAmount,
          courseFullPayment: CourseData.fees,
          courseId: CourseData._id,
          discountAmount: discountAmount,
          couponDiscount: couponDiscount,
          UserId,
        }), 
      });

      const data = await response.json();
      if (data?.order_id) {
        const options = {
          key: import.meta.env.RAZORPAY_ID_KEY,
          amount: totalAmount * 100,
          currency: "INR",
          name: CourseData.name,
          order_id: data.order_id,
          handler: async function (response) {
            // Verify payment on backend
            try {
              const verifyResponse = await fetch(
                `${apiUrl}/api/payment/verify-payment`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    paymentType: selectedPaymentType,
                    discountAmount: discountAmount,
                    couponDiscount: couponDiscount,
                  }),
                }
              );

              const verifyData = await verifyResponse.json();

              if (verifyData.success) {
                toast.success("Payment verified successfully!");
                navigate("/userdashboard/my-courses"); // Redirect after success
              } else {
                notifyB("Payment verification failed!");
              }
            } catch (error) {
              console.error("Verification error: ", error);
              notifyB("Payment verification error!");
            }
          },
          prefill: {
            name: userDetails.user.name,
            email: userDetails.user.email,
            contact: userDetails.user.phoneNumber,
          },
          notes: {
            address: selectedState,
          },
          theme: {
            color: "#15cb97",
          },
          image: CourseData.image,
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.on("payment.failed", function () {
          notifyB("Payment Failed");
        });
        paymentObject.open();
      } else {
        notifyB(data.msg);
      }
    } catch (error) {
      console.error("Payment error: ", error);
      notifyB("Something went wrong. Please try again.");
    }
  };
  return (
    <>
      <div className="student-courses-header">
        <h2> <button onClick={() => navigate('/userdashboard/my-courses')} className="back"><i className="fa-solid fa-arrow-left"></i></button> Payment Dashboard</h2>
        <div className="student-search-bar">
          <input
            type="text"
            placeholder="What do you want to learn?"
            className="student-search-input"
          />
          <button className="logout-icon ">
            <i class="fas fa-search"></i>
          </button>
          <Link to="/">
            <i className="ri-home-9-line"></i>
          </Link>
          <div>
            {/* Logout Icon with Click Event */}
            <Link
              to={"/"}
              onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }}
              className="logout-icon"
            >
              <i className="ri-logout-circle-r-line"></i>
            </Link>

            {/* Bootstrap Modal */}
            <div
              className={`modal fade ${showModal ? "show d-block" : ""}`}
              tabIndex="-1"
              role="dialog"
              style={{ background: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Confirm Logout</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={() => setShowModal(false)}
                    >
                      <span>&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to log out?</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="secondary-button"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="primary-button red"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="payment-gateway-section">
        <Container className="payment-container mt-5">
          <Row className="payment-form justify-content-center">
            <Col md={7}>
              <Card className="p-4 left-card">
                <h4 className="course-info-heading">Important information</h4>
                <div className="course-header d-flex align-items-center">
                  <img
                    src={CourseData.image}
                    alt="Course Thumbnail"
                    className="course-img rounded"
                  />
                  <div className="course-detail-container">
                    <h5 className="fw-bold mb-1">{CourseData.name}</h5>
                    <p className="small mb-0">
                      These courses are available for •{CourseData.duration}{" "}
                      Validity
                    </p>
                    <p className="small mt-0">Price: {CourseData.fees - enrollUserData.
                      PayedAmount
                    } ₹</p>
                  </div>
                </div>

                {isEnrolled ? (
                  <>
                    <Form className="mt-4">
                      <Form.Group className="mb-3">
                        <Form.Label>NAME :</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={userDetails.user.name}
                          className="input-field"
                          disabled
                        />
                        <small className="text-muted">
                          Please enter full name as it should appear on
                          certificates.
                        </small>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>EMAIL :</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder={userDetails.user.email}
                          className="input-field"
                          disabled
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>MOBILE NUMBER :</Form.Label>
                        <div className="d-flex">
                          <span className="country-code">🇮🇳 +91</span>
                          <Form.Control
                            type="tel"
                            placeholder={userDetails.user.phoneNumber}
                            className="input-field"
                            disabled
                          />
                        </div>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>STATE :</Form.Label>
                        <Form.Select
                          className="input-field"
                          value={selectedState}
                          onChange={(e) => setSelectedState(e.target.value)}
                          required
                        >
                          <option value="">Select a state</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Maharashtra">Maharashtra</option>
                          <option value="Delhi">Delhi</option>
                          <option value="Karnataka">Karnataka</option>
                          <option value="West Bengal">West Bengal</option>
                        </Form.Select>
                      </Form.Group>
                    </Form>
                    <p className="text-muted small">
                      Note: Fields with * are mandatory fields to fill.
                    </p>
                  </>
                ) : (
                  <p>No user found for this course.</p>
                )}
              </Card>
            </Col>
            <Col md={5}>
              <Card className="p-4 right-card">
                <h5 className="fw-bold">Payment Details</h5>
                <label className="payment-type">Payment Type :</label>
                <select
                  className="payment-type-input-field"
                  onChange={handlePaymentChange}
                  value={selectedPaymentType}
                >
                  <option value="Paid Full Fees">
                    {enrollUserData.feesStatus === "Paid Registration Fees" ? (`Paid Remaining Amount : ₹ ${fullPaymentAmount - enrollUserData.PayedAmount}`) : (`Paid Completed Amount : ₹ ${fullPaymentAmount}`)}

                  </option>
                  <option value="Paid Registration Fees">
                    Paid Registration Fees ₹ {RegistrationLectureAmount}
                  </option>
                </select>
                <div className="price-details d-flex justify-content-between">
                  <span>Item Total</span>{" "}
                  <span>
                    ₹{" "}
                    {selectedPaymentType === "Paid Registration Fees"
                      ? RegistrationLectureAmount
                      : fullPaymentAmount - enrollUserData.
                        PayedAmount}
                  </span>
                </div>
                {selectedPaymentType === "Paid Full Fees" && (
                  <>
                    <div className="price-details d-flex justify-content-between text-success">
                      <span>Discount</span> <span>- ₹ {discountAmount}</span>
                    </div>
                    <div className="price-details d-flex justify-content-between text-primary">
                      <span>Coupon Discount</span>
                      <span
                        className="apply-coupon"
                        onClick={handleApplyCoupon}
                      >
                        {couponDiscount
                          ? `- ₹ ${couponDiscount}`
                          : "Apply Coupon"}
                      </span>
                    </div>
                  </>
                )}
                <hr className="divider" />
                <div className="d-flex justify-content-between fw-bold">
                  <span>Sub total</span> <span>₹ {totalAmount - enrollUserData.
                    PayedAmount}</span>
                </div>
                <div className="price-details d-flex justify-content-between fw-bold">
                  <span>TOTAL</span> <span>₹ {totalAmount - enrollUserData.
                    PayedAmount}</span>
                </div>
                <Button
                  className="mt-3 w-100 pay-button"
                  disabled={!selectedState}
                  onClick={initiatePayment}
                >
                  PAY SECURELY
                </Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal show={showCouponModal} onHide={handleCloseModal} centered>
        <Modal.Body className="coupon-modal">
          <h5 className="modal-title">Apply Coupon</h5>
          <Form>
            <Form.Group>
              <Form.Label>Enter Coupon Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="i.e GET50"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              />
            </Form.Group>
          </Form>
          {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
          <div className="modal-buttons">
            <Button variant="secondary" onClick={handleCloseModal}>
              CANCEL
            </Button>
            <Button
              variant="primary"
              disabled={!couponCode}
              onClick={applyCoupon}
            >
              APPLY COUPON
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </> 
  );
};

export default PaymentPage;
