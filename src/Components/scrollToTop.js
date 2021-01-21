import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp} from '@fortawesome/free-solid-svg-icons';
import './HomePageComponent/HomePageStyle.css'
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scorlled upto given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 600) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="scroll-to-top">
      {isVisible && 
        <div onClick={scrollToTop}>
          {/* <img src='https://i.postimg.cc/44Ytsk8Z/top-arrow-emoj.png' alt='Go to top' style={{height:100,width:100,position:'relative'}}/>
           */}
           <FontAwesomeIcon icon={faArrowCircleUp} size="2x" />
           <h3>Scroll to Top</h3>
        </div>}
    </div>
  );
}