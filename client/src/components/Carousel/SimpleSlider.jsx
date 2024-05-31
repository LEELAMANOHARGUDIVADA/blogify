import React from "react";
import Slider from "react-slick";
import carousel_3 from '/carousel_3.avif'
import carousel_4 from '/carousel_4.avif'
import carousel_5 from '/carousel_5.webp'
import carousel_1 from '/blog-3.webp'
import { Link } from "react-router-dom";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>

      <Link to={`/blogs/665a106eb584bef5bc2589ac`}>
      <div className="w-full">
        <div className="w-full flex items-center justify-center gap-5">
        <img src={carousel_5} alt=""  className="w-full h-96 ml-5 object-center object-cover rounded-xl "  />
        <div className="flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold ml-10">9 Aloe Vera Benefits for Face and Skin!</h2>
        <h3 className="text-gray-400 ml-10 mt-2">Aloe Vera, the modest houseplant is a ‘miracle,’ wonder plant, often hiding in plain sight. Having been around and used as a medicinal herb, it nourishes the body from the inside – it is rich in nutrients, aids in improving digestion and even boost immunity. Aloe Vera can be used topically too, i.e., its gel can be used to enhance one’s skin, especially the face and the hair. However, before we get into the essential reasons and health benefits of Aloe Vera, let us first learn how to extract Aloe Vera gel directly from the plant. If you have an Aloe Vera plant at home, select its fatter leaves or stems and cut it from the base.</h3>
        </div>
        </div>
      </div>
      </Link>
      
      <Link to={`/blogs/665a0d9bb584bef5bc258986`}>
      <div className="w-full">
        <div className="w-full flex items-center justify-center gap-10">
        <img src={carousel_1} alt=""  className="w-1/2 h-96 ml-5 object-center object-cover rounded-xl "  />
        <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-4xl font-bold ml-2">Easy Ways to Manage Time Effectively in 2024</h2>
        <h3 className="text-gray-400 ml-2 mt-2">Time management is the process of planning and controlling how much time to spend on specific activities. Good time management enables an individual to complete more in a shorter period of time, lowers stress, and leads to career success. Image of hands holding paper cards about time management and related concepts Benefits of Time Management The ability to manage your time effectively is important. Good time management leads to improved efficiency and productivity, less stress, and more success in life. Here are some benefits of managing time effectively</h3>
        </div>
        </div>
      </div>
      </Link>

      <Link to={`/blogs/665a0f95b584bef5bc2589a2`}>
      <div className="w-full">
        <div className="w-full flex items-center justify-center gap-5">
        <img src={carousel_3} alt=""  className="w-full h-96 ml-5 object-center object-cover rounded-xl "  />
        <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-4xl font-bold ml-5">6 Most Colourful Streets In India To Remind You Of London’s Notting Hill</h2>
        <h3 className="text-gray-400 ml-5 mt-2"> French Quarter In Pondicherry Dotted with French villas, boutique hotels, charming homes with Bougainville, French Quarter in Pondicherry is one of the most Instagrammable places you’ve ever been to. Take a heritage walk at the French Quarter and look out for French houses and villas painted in bright yellow and ochre hues. Many of them are converted into beautiful guest houses.</h3>
        </div>
        </div>
      </div></Link>
      
      
      <Link to={`/blogs/665a10f6b584bef5bc2589b2`}>
      <div className="w-full">
        <div className="w-full flex items-center justify-center gap-10">
        <img src={carousel_4} alt=""  className="w-full h-96 ml-5 object-center object-cover rounded-xl"  />
        <div className="flex flex-col items-center justify-center w-full">
        <h2 className="text-4xl font-bold ml-2">10 Must Visit Tourist Places in Rome, Italy</h2>
        <h3 className="text-gray-400 ml-2 mt-2">Rome, the eternal city, is a captivating destination that is steeped in history, culture, and breathtaking architecture. From the world-famous Colosseum to the awe-inspiring Vatican City, there is no shortage of iconic landmarks to explore. Whether you're strolling through the narrow streets of Trastevere or indulging in gelato near the Spanish Steps, Rome never fails to enchant its visitors. The city's rich heritage can be experienced through its impressive art collections, such as the renowned works in the Galleria Borghese. The Pantheon, with its magnificent dome, is a must-visit architectural marvel. And the list doesn't end here!</h3>
        </div>
        </div>
      </div></Link>
    </Slider>
  );
}