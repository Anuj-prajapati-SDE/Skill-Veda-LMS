// constants/index.js
import landingPage from "../assets/img/LandingPage.png";
import illustration5 from "../assets/img/illustration/5.png";
import mapSvg from "../assets/img/map.svg";
import logoRemoveBg from "../assets/img/logo-removebg.png";
import shape12 from "../assets/img/shape/12.png";
import shape15 from "../assets/img/shape/15.png";
import shape5 from "../assets/img/shape/5.png";
import PLACEHOLDER_600 from "../assets/img/800x600.png";
import PLACEHOLDER_800 from "../assets/img/800x800.png";
import PLACEHOLDER_100 from "../assets/img/100x100.png";
import placeholder1578 from "../assets/img/2440x1578.png";
import WHY_CHOOSE_US_IMAGE from "../assets/img/WhyChooseUs.webp";
import userPic from "../assets/img/user.jpeg";

export const FAQS = [
  {
    question: "What courses do you offer?",
    answer: "We offer a diverse range of courses, including web development, cyber security, data science, digital marketing, and more. Browse our catalog to find the right course for you."
  },
  {
    question: "How can I purchase a course?",
    answer: "You can purchase a course by signing up, selecting the course you want, and proceeding to checkout. Payment can be made via credit card, debit card, or digital wallets."
  },
  {
    question: "Do you offer any free trials or sample lessons?",
    answer: "Yes, we provide free trials and sample lessons for many of our courses. Check the course page for availability and details."
  },
  {
    question: "Can I access my courses from any device?",
    answer: "Absolutely! Our platform is accessible on desktops, laptops, tablets, and smartphones, allowing you to learn anytime, anywhere."
  },
  {
    question: "How do I track my progress?",
    answer: "Your student dashboard provides a detailed overview of your course progress, including completed lessons, pending assignments, and upcoming assessments."
  },
  {
    question: "How can I mark my attendance?",
    answer: "Attendance can be marked through the student dashboard. Simply log in, navigate to your course, and click on the attendance button for each session."
  },
  {
    question: "Are there any prerequisites for enrolling in a course?",
    answer: "Some advanced courses may have prerequisites. Check the course details to see if any prior knowledge or skills are required."
  },
  {
    question: "What if I need help during the course?",
    answer: "Our dedicated support team is here to help. You can reach out to us through the contact section of your dashboard, or use the live chat feature for immediate assistance."
  },
  {
    question: "Can I get a refund if I’m not satisfied with a course?",
    answer: "We do not offer a refund policy. Please refer to our refund policy for detailed information."
  },
  {
    question: "How do I obtain my certificate after completing a course?",
    answer: "Once you complete a course, you can download your certificate from the student dashboard. The certificate will be available immediately upon successful completion."
  }
];

export const HERO_SECTIONS = [
  {
    HEADING: "Education Course",
    SUBHEADING:
      "Achieve success with our comprehensive education course, designed to empower and guide you towards reaching your fullest potential.",
    BUTTON_TEXT: "Discover More",
    IMAGE_SRC: landingPage,
    IMAGE_ALT: "Thumb",
  },
  {
    HEADING: "Achieving Success",
    SUBHEADING:
      "Achieve success with our comprehensive education course, designed to empower and guide you towards reaching your fullest potential.",
    BUTTON_TEXT: "Discover More",
    IMAGE_SRC: landingPage,
    IMAGE_ALT: "Thumb",
  },
];

export const CAROUSEL_CONTROLS = {
  PREV: {
    ICON_CLASS: "ri-arrow-left-wide-line",
    SR_TEXT: "Previous",
  },
  NEXT: {
    ICON_CLASS: "ri-arrow-right-wide-line",
    SR_TEXT: "Next",
  },
};

//
export const FEATURES = [
  {
    ICON_CLASS: "fas fa-school",
    TITLE: "Expert faculty",
    DESCRIPTION:
      "Always get aided by the best course expert for your guidance. Let your little doubts get resolved in a matter of time.",
  },
  {
    ICON_CLASS: "fas fa-swatchbook",
    TITLE: "Online learning",
    DESCRIPTION:
      "Don't let the geographical boundaries stop you from learning, access knowledge from anywhere.",
  },
  {
    ICON_CLASS: "fas fa-graduation-cap",
    TITLE: "Scholarship",
    DESCRIPTION: 
      "SkillVeda provides financial support regarding the fees for the ones who really deserves.",
  },
];

export const HOME_ABOUT_SECTION = {
  HEADING: "Turn your ambition into a success story",
  DESCRIPTION:
    "Dreams are seeds of future success. With dedication, resilience, and strategic planning, your ambitions can become extraordinary accomplishments. Embrace challenges as opportunities to grow and remain steadfast in your pursuit. Each step forward, no matter how small, brings you closer to realizing your full potential. Your journey to success begins with the determination to make it happen.",
  COUNTERS: [
    { ID: 1, TARGET: 20, LABEL: "Online/Offline Courses" },
    { ID: 2, TARGET: 10, LABEL: "Students" },
    { ID: 3, TARGET: 300, LABEL: "Offline Courses" },
    { ID: 4, TARGET: 450, LABEL: "Online Courses" },
  ],
  IMAGE_SRC: illustration5,
  IMAGE_ALT: "Thumb",
  FIXED_SHAPE_SRC: shape12,
  FIXED_SHAPE_ALT: "Shape",
};

export const WHY_CHOOSE_US = {
  HEADING: "Why Choose us",
  SUBHEADING: "Everything You Need for Your Upskilling Journey",
  VIDEO_LINK: "#",
  VIDEO_ICON_CLASS: "fa fa-play",
  IMAGE_SRC: WHY_CHOOSE_US_IMAGE,
  IMAGE_ALT: "Thumb",
  FEATURES: [
    {
      NUMBER: "01",
      ICON_CLASS: "flaticon-library",
      TITLE: "🌟 Why Choose SkillVedaa?",
      DESCRIPTION:[
          "✅ Comprehensive Courses – Covering technology, business, creativity, and soft skills",
          "✅ Industry-Recognized Certifications – Boost your resume and credibility",
          "✅ Expert-Led Learning – Learn from top professionals and industry leaders",
          "✅ Hands-On Projects – Gain practical experience with real-world applications"]
,
    },
    {
      NUMBER: "02",
      ICON_CLASS: "flaticon-teacher-2",
      TITLE: "📚 Explore Our Categories",
      DESCRIPTION:
        ['💻 Technology & Programming – AI, Data Science, Web Development, Cybersecurity',
          '📈 Business & Marketing – Digital Marketing, Finance, Leadership',
          '🎨 Creative & Design – UI/UX, Graphic Design, Video Editing',
         ' 🗣 Communication & Soft Skills – Public Speaking, Negotiation, Productivity'
          ],
  
    },
  ],
};

export const CATEGORIES_SECTION = {
  FIXED_SHAPE_SRC: shape15,
  FIXED_SHAPE_ALT: "Shape",
  HEADING: "Select your favorite subject from best categories",
  BUTTON_TEXT: "View All",
  BUTTON_ICON_CLASS: "fas fa-grip-horizontal",
  CATEGORIES: [
    {
      CLASS_NAME: "malachite",
      ICON_CLASS: "flaticon-innovation",
      TITLE: "Artificial Intelligence",
      TOPICS: 57,
    },
    {
      CLASS_NAME: "torchred",
      ICON_CLASS: "flaticon-meeting",
      TITLE: "Business Studies",
      TOPICS: 46,
    },
    {
      CLASS_NAME: "tulip",
      ICON_CLASS: "flaticon-engineer-1",
      TITLE: "Civil Engineering",
      TOPICS: 25,
    },
    {
      CLASS_NAME: "mariner",
      ICON_CLASS: "flaticon-science",
      TITLE: "Computer Engineering",
      TOPICS: 38,
    },
  ],
};

export const REGISTER_SECTION = {
  BACKGROUND_IMAGE: placeholder1578,
  HEADING: "Get 50s of online Courses For Free!",
  DESCRIPTION:
    "Own partiality motionless was old excellence she inquietude contrasted. Sister giving so wicket cousin of an he rather marked. Of on game part body rich. Gravity letters it amongst herself dearest an windows by. Wooded ladies she basket season age her uneasy saw. Expression acceptance imprudence particular total competition.",
  COUNTER_DATE: "2021-3-24 23:59:59",
  FORM_FIELDS: [
    { PLACEHOLDER: "First Name", TYPE: "text" },
    { PLACEHOLDER: "Last Name", TYPE: "text" },
    { PLACEHOLDER: "Email*", TYPE: "email" },
    { PLACEHOLDER: "Phone", TYPE: "text" },
  ],
  SUBJECT_OPTIONS: [
    { VALUE: 1, TEXT: "Chose Subject" },
    { VALUE: 2, TEXT: "Computer Engineering" },
    { VALUE: 4, TEXT: "Accounting Technologies" },
    { VALUE: 5, TEXT: "Web Development" },
    { VALUE: 6, TEXT: "Machine Language" },
  ],
  BUTTON_TEXT: "Register Now",
};

export const COURSES_SECTION = {
  HEADING: "Popular Courses",
  SUBHEADING: "Our Most Popular & Trending Online Courses",
  DESCRIPTION:
    "Everything melancholy uncommonly but solicitude inhabiting projection off. Connection stimulated estimating excellence an to impression.",
  BUTTON_TEXT: "View All",
  BUTTON_ICON_CLASS: "fas fa-plus",
  COURSES: [
    {
      IMAGE_SRC: PLACEHOLDER_600,
      IMAGE_ALT: "Thumb",
      COURSE_INFO: [
        { ICON_CLASS: "fas fa-clock", TEXT: "45 Hours" },
        { ICON_CLASS: "fas fa-list-ul", TEXT: "345" },
      ],
      ADVISOR_IMAGE_SRC: PLACEHOLDER_100,
      ADVISOR_IMAGE_ALT: "Advisor",
      ADVISOR_NAME: "Busel park",
      CATEGORY: "Web",
      RATING: 4.5,
      RATING_COUNT: 245,
      PRICE: "Free",
      TITLE: "Teaching Children English Online Course",
      ENROLLMENT_COUNT: "8K",
      ENROLL_BUTTON_TEXT: "Get Enrolled",
      ENROLL_BUTTON_ICON_CLASS: "fas fa-shopping-cart",
    },
    {
      IMAGE_SRC: PLACEHOLDER_600,
      IMAGE_ALT: "Thumb",
      COURSE_INFO: [
        { ICON_CLASS: "fas fa-clock", TEXT: "30 Hours" },
        { ICON_CLASS: "fas fa-list-ul", TEXT: "42" },
      ],
      ADVISOR_IMAGE_SRC: PLACEHOLDER_100,
      ADVISOR_IMAGE_ALT: "Advisor",
      ADVISOR_NAME: "Busel park",
      CATEGORY: "Learn",
      RATING: 4.5,
      RATING_COUNT: 568,
      PRICE: "$15.00",
      TITLE: "The Complete React Web Developer Course",
      ENROLLMENT_COUNT: "8K",
      ENROLL_BUTTON_TEXT: "Add to cart",
      ENROLL_BUTTON_ICON_CLASS: "fas fa-shopping-cart",
    },
    {
      IMAGE_SRC: PLACEHOLDER_600,
      IMAGE_ALT: "Thumb",
      COURSE_INFO: [
        { ICON_CLASS: "fas fa-clock", TEXT: "28 Hours" },
        { ICON_CLASS: "fas fa-list-ul", TEXT: "266" },
      ],
      ADVISOR_IMAGE_SRC: PLACEHOLDER_100,
      ADVISOR_IMAGE_ALT: "Advisor",
      ADVISOR_NAME: "Busel park",
      CATEGORY: "Tech",
      RATING: 4.5,
      RATING_COUNT: 78,
      PRICE: "$38.00",
      TITLE: "Learn JavaScript – Full Course for Beginners",
      ENROLLMENT_COUNT: "8K",
      ENROLL_BUTTON_TEXT: "Add to cart",
      ENROLL_BUTTON_ICON_CLASS: "fas fa-shopping-cart",
    },
  ],
};

export const EVENTS_SECTION = {
  HEADING: "New Event",
  SUBHEADING: "Upcoming Education Events To feed your Brain.",
  EVENTS: [
    {
      DAY: "Day 1",
      DATE: "Saturday, 05 Jul 2021",
      LOCATION: "California, TX 70240",
      ROOM: "Room 202, First Floor",
      TITLE: "Discussion: Explorations of new approaches",
      DESCRIPTION:
        "Pulled coming wooded tended it answer remain me be. So landlord by we unlocked sensible it. Fat cannot use denied excuse son law.",
      SPEAKERS: [
        {
          NAME: "Kevin & Amanda",
          IMAGE_SRC: PLACEHOLDER_100,
          IMAGE_ALT: "Thumb",
        },
      ],
      TIME: "8:00 - 16:00",
      IMAGE_SRC: PLACEHOLDER_800,
      IMAGE_ALT: "Thumb",
    },
    {
      DAY: "Day 2",
      DATE: "Sunday, 16 Aug 2021",
      LOCATION: "California, TX 70240",
      ROOM: "Room 202, First Floor",
      TITLE: "Social Science & Humanities for Students",
      DESCRIPTION:
        "Pulled coming wooded tended it answer remain me be. So landlord by we unlocked sensible it. Fat cannot use denied excuse son law.",
      SPEAKER: [
        {
          NAME: "Stuard Ferrel",
          IMAGE_SRC: "src/assets/img/100x100.png",
          IMAGE_ALT: "Thumb",
        },
      ],
      TIME: "8:00 - 16:00",
      IMAGE_SRC: PLACEHOLDER_800,
      IMAGE_ALT: "Thumb",
    },
    {
      DAY: "Day 3",
      DATE: "Monday, 24 Sep 2021",
      LOCATION: "California, TX 70240",
      ROOM: "Room 202, First Floor",
      TITLE: "International Conference on Art Business",
      DESCRIPTION:
        "Pulled coming wooded tended it answer remain me be. So landlord by we unlocked sensible it. Fat cannot use denied excuse son law.",
      SPEAKER: [
        { NAME: "Eva Hudson", IMAGE_SRC: PLACEHOLDER_100, IMAGE_ALT: "Thumb" },
      ],
      TIME: "8:00 - 16:00",
      IMAGE_SRC: PLACEHOLDER_800,
      IMAGE_ALT: "Thumb",
    },
  ],
};

export const TESTIMONIALS = [
  {
    text: "Objection estimable discourse procuring he he remaining on distrusts. Simplicity affronting inquietude for now sympathize age. She meant new their could defer child.",
    name: "Jnoes Sari",
    role: "Programmer",
    img: PLACEHOLDER_100,
  },
  {
    text: "Objection estimable discourse procuring he he remaining on distrusts. Simplicity affronting inquietude for now sympathize age. She meant new their could defer child.",
    name: "Busel Park",
    role: "Student",
    img: PLACEHOLDER_100,
  },
];

export const TESTIMONIAL_HEADING = {
  subtitle: "Testimonials",
  title: "What People say about Our quality.",
};

export const TESTIMONIAL_SHAPE_IMAGE = shape5;
export const TESTIMONIAL_RATING_ICONS = [
  "fas fa-star",
  "fas fa-star",
  "fas fa-star",
  "fas fa-star",
  "fas fa-star-half-alt",
];

export const COURSE_ADVISOR_SECTION = {
  HEADING: "Course Advisor",
  SUBHEADING: "Our professional & Expert Development Team",
  DESCRIPTION:
    "Meet the development team along with the guide that directed the development.",
  BUTTON_TEXT: "View All",
  BUTTON_ICON_CLASS: "fas fa-plus",
  ADVISORS: [
    {
      NAME: "Mr. Binit Kumar",
      TITLE: "Director",
      IMAGE_SRC: userPic,
      IMAGE_ALT: "Thumb",
      SOCIAL_LINKS: [
        { PLATFORM: "facebook", ICON_CLASS: "fab fa-facebook-f", URL: "#" },
        { PLATFORM: "twitter", ICON_CLASS: "fab fa-twitter", URL: "#" },
        { PLATFORM: "linkedin", ICON_CLASS: "fab fa-linkedin-in", URL: "#" },
      ],
    },
    {
      NAME: "Mr. Anand Sir",
      TITLE: "Manager",
      IMAGE_SRC: userPic,
      IMAGE_ALT: "Thumb",
      SOCIAL_LINKS: [
        { PLATFORM: "facebook", ICON_CLASS: "fab fa-facebook-f", URL: "#" },
        { PLATFORM: "twitter", ICON_CLASS: "fab fa-twitter", URL: "#" },
        { PLATFORM: "linkedin", ICON_CLASS: "fab fa-linkedin-in", URL: "#" },
      ],
    },
    {
      NAME: "Dhruv Kashyap",
      TITLE: "Web Developer",
      IMAGE_SRC: userPic,
      IMAGE_ALT: "Thumb",
      SOCIAL_LINKS: [
        { PLATFORM: "facebook", ICON_CLASS: "fab fa-facebook-f", URL: "#" },
        { PLATFORM: "twitter", ICON_CLASS: "fab fa-twitter", URL: "#" },
        { PLATFORM: "linkedin", ICON_CLASS: "fab fa-linkedin-in", URL: "#" },
      ],
    },
    {
      NAME: "Vansh Vyas",
      TITLE: "Backend Engineer",
      IMAGE_SRC: userPic,
      IMAGE_ALT: "Thumb",
      SOCIAL_LINKS: [
        { PLATFORM: "facebook", ICON_CLASS: "fab fa-facebook-f", URL: "#" },
        { PLATFORM: "twitter", ICON_CLASS: "fab fa-twitter", URL: "#" },
        { PLATFORM: "linkedin", ICON_CLASS: "fab fa-linkedin-in", URL: "#" },
      ],
    },
  ],
};

export const FUN_FACTOR_SECTION = {
  BACKGROUND_IMAGE: mapSvg,
  COUNTERS: [
    { ID: 1, TARGET: 10, SUFFIX: "K", LABEL: "Learners & counting" },
    { ID: 2, TARGET: 20, SUFFIX: "+", LABEL: "online/offline courses" },
    { ID: 3, TARGET: 4, SUFFIX: "+", LABEL: "domains" },
    { ID: 4, TARGET: 90, SUFFIX: "%", LABEL: "Successful students" },
  ],
};

//
export const FOOTER_SECTION = {
  LOGO_SRC: logoRemoveBg,
  ABOUT_TEXT:
    "Equip yourself with the essential skills for the new era, designed to thrive in a rapidly changing world.",
  SUBSCRIBE_TEXT:
    "Please write your email and get our amazing updates, news and support*",
  USEFUL_LINKS: ["Courses", "Event", "Gallery", "Faqs", "Teachers", "Contact"],
  SUPPORT_LINKS: [
    "Documentation",
    "Forums",
    "Language Packs",
    "Release Status",
    "LearnPress",
    "Feedback",
  ],
  CONTACT_INFO: {
    EMAIL: "support@skillveda.com",
    PHONE: "+44-20-7328-4499",
  },
  OPENING_HOURS: {
    MON_TUES: "6.00 am - 10.00 pm",
    WED_THURS: "8.00 am - 6.00 pm",
    SUN: "Closed",
  },
  COPYRIGHT_TEXT: "© Copyright 2021. All Rights Reserved by",
  COPYRIGHT_LINK: "SkillVeda",
  FOOTER_LINKS: ["Terms", "Privacy", "Support"],
};
