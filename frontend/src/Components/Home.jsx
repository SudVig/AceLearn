import React,{useContext} from "react";
import { useUserContext } from "./UserContext";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "./images/logo.jpg";
import c1 from "./images/c1.jpg";
import c2 from "./images/html.png";
import c3 from "./images/sql.jpg";
import c4 from "./images/python.jpg";
import c5 from "./images/java.png";
import c6 from "./images/css.png";
import "./css/style.css";
import { UserContext } from "../App";
import Aurora from '../Design/Aurora';
import {
  faGraduationCap,
  faAward,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import Footer from "./header and footer/Footer";

function Home() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  const { NavHeight } = useContext(UserContext);
  return (
    <div style={{paddingTop: NavHeight}}>
      {/* <Navbar page={"home"} /> */}
      <div>
        
<section
  id="home"
  className="relative w-full bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#334155] text-white py-16 px-6 md:px-12 lg:px-24 min-h-screen flex flex-col justify-center items-center text-center space-y-6 overflow-hidden">
  
  {/* Aurora or abstract background touch */}
  <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
    <Aurora
      colorStops={["#38bdf8", "#6366f1", "#9333ea"]}
      blend={0.7}
      amplitude={0.8}
      speed={0.6}
    />
  </div>

  {/* Content Box */}
  <div className="relative z-10">
    <h2 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
      Welcome to EduVerse Academy
    </h2>
    <p className="text-gray-300 max-w-3xl leading-relaxed">
      Empower your learning journey with world-class courses and expert instructors. Step into the future of education.
    </p>
    <div className="flex space-x-6 mt-6">
      <a
        href="#"
        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-8 py-3 rounded-lg shadow-xl hover:scale-105 hover:bg-gradient-to-l transition-transform"
      >
        Get Started
      </a>
      <a
        href="#"
        className="bg-gradient-to-r from-teal-400 to-green-500 text-white font-semibold px-8 py-3 rounded-lg shadow-xl hover:scale-105 hover:bg-gradient-to-l transition-transform"
      >
        Browse Courses
      </a>
    </div>
  </div>
</section>




<section
  id="features"
  className="bg-gradient-to-r from-[#111111] via-[#1a1a1a] to-[#111111] text-white py-16"
>
  <div className="text-center mb-12">
    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-[#6366f1] to-[#9333ea]">
      Awesome Features
    </h1>
    <p className="text-gray-300 text-lg mt-2">Chance to enhance yourself</p>
  </div>

  <div className="flex flex-wrap justify-center gap-8">
    {/* Scholarship Box */}
    <div className="fea-box bg-[#1a1a1a] rounded-2xl p-6 w-80 text-center shadow-lg border border-gray-700">
      <FontAwesomeIcon
        icon={faGraduationCap}
        className="text-4xl text-[#38bdf8] mb-4"
      />
      <h3 className="text-xl font-semibold text-white">Scholarship Facility</h3>
      <p className="text-gray-400 mt-2">
        Originality is the essence of true scholarship.
      </p>
    </div>

    {/* Valuable Courses Box */}
    <div className="fea-box bg-[#1a1a1a] rounded-2xl p-6 w-80 text-center shadow-lg border border-gray-700">
      <FontAwesomeIcon
        icon={faStar}
        className="text-4xl text-[#6366f1] mb-4"
      />
      <h3 className="text-xl font-semibold text-white">Valuable Courses</h3>
      <p className="text-gray-400 mt-2">
        Online education is like a rising tide, it's going to lift all boats.
      </p>
    </div>

    {/* Global Certification Box */}
    <div className="fea-box bg-[#1a1a1a] rounded-2xl p-6 w-80 text-center shadow-lg border border-gray-700">
      <FontAwesomeIcon
        icon={faAward}
        className="text-4xl text-[#9333ea] mb-4"
      />
      <h3 className="text-xl font-semibold text-white">Global Certification</h3>
      <p className="text-gray-400 mt-2">
        A certificate without knowledge is like a gun without bullets in your hand.
      </p>
    </div>
  </div>
</section>

        <section id="course">
          <h1>Our Popular Courses</h1>
          <p>10,000+ enrolled</p>
          <div className="course-box">
            {/* ... (Course content here) */}
            <div className="courses">
              <img src={c1} alt="" />
              <div className="details">
                <p>Updated 12/08/23</p>
                <h6>JavaScript Beginner Course</h6>
                <div className="star">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="i" />
                  ))}
                  <p>(239)</p>
                </div>
              </div>
              <div className="cost">$49.99</div>
            </div>
            <div className="courses">
              <img src={c2} alt="" />
              <div className="details">
                <p>Updated 12/08/23</p>
                <h6>HTML Complete Course</h6>
                <div className="star">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="i" />
                  ))}
                  <p>(239)</p>
                </div>
              </div>
              <div className="cost">$49.99</div>
            </div>
            <div className="courses">
              <img src={c3} alt="" />
              <div className="details">
                <p>Updated 12/08/23</p>
                <h6>SQL Beginner Course</h6>
                <div className="star">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="i" />
                  ))}
                  <p>(239)</p>
                </div>
              </div>
              <div className="cost">$49.99</div>
            </div>
            <div className="courses">
              <img src={c4} alt="" />
              <div className="details">
                <p>Updated 12/08/23</p>
                <h6>Python Master Course</h6>
                <div className="star">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="i" />
                  ))}
                  <p>(239)</p>
                </div>
              </div>
              <div className="cost">$49.99</div>
            </div>
            <div className="courses">
              <img src={c5} alt="" />
              <div className="details">
                <p>Updated 12/08/23</p>
                <h6>Java Essentials</h6>
                <div className="star">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="i" />
                  ))}
                  <p>(239)</p>
                </div>
              </div>
              <div className="cost">$49.99</div>
            </div>
            <div className="courses">
              <img src={c6} alt="" />
              <div className="details">
                <p>Updated 12/08/23</p>
                <h6>CSS Complete Course</h6>
                <div className="star">
                  {[...Array(5)].map((_, index) => (
                    <FontAwesomeIcon key={index} icon={faStar} className="i" />
                  ))}
                  <p>(239)</p>
                </div>
              </div>
              <div className="cost">$49.99</div>
            </div>
          </div>
        </section>
        <section id="registration">
          <div className="reminder">
            <p>Get 100 Online Courses for Free</p>
            <h1>Register to get it</h1>
            <div className="time">
              <div className="date">
                18
                <br /> Days
              </div>
              <div className="date">
                23
                <br /> Hours
              </div>
              <div className="date">
                06
                <br /> Minutes
              </div>
              <div className="date">
                58
                <br /> Seconds
              </div>
            </div>
          </div>
          {!authToken ? (
            <div className="form">
              <h3>Create Free Account NOW!</h3>
              <input type="text" placeholder="Name" name="" id="" />
              <input type="text" placeholder="Email" name="" id="" />
              <input type="password" placeholder="Password" name="" id="" />
              <input type="number" placeholder="Phone Number" name="" id="" />
              <div className="btn">
                <a className="yellow" href="#">
                  Submit Form
                </a>
              </div>
            </div>
          ) : (
            <></>
          )}
        </section>
        <Footer />
      </div>
    </div>
  );
}
export default Home;
