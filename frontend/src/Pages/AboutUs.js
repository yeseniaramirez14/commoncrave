import andrew from "../images/andrew.jpg";
import yesenia from "../images/yesenia.jpg";
import Github from "../images/icons/Github.png";
import LinkedIn from "../images/icons/LinkedIn.png";
import Portfolio from "../images/icons/Portfolio.png";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex-col items-center font-worksans bg-yellow">
      <h1 className="text-center font-bold text-3xl pt-5 pb-3">About Us</h1>
      <div className="border border-solid rounded-2xl p-5 mt-2 m-10 border-green border-2">
        <p className="text-center text-green">
          Welcome to our restaurant recommendation website! We are two driven
          and passionate junior software engineers who met at a coding bootcamp
          and decided to combine our love for food and technology by creating
          this platform. Our mission is to simplify the process of finding the
          perfect restaurant for you and your friends.{" "}
        </p>
        <p className="text-center text-green pt-2">
          {" "}
          With our website, you and your friends can create a group and input
          your location and cravings, and we will provide a list of restaurants
          that cater to your taste buds. Our algorithm will then recommend the
          perfect spot that's in the midpoint of everyone in the group. We
          understand the frustration of going back and forth trying to decide on
          a restaurant, which is why we created this website to make the
          decision-making process more efficient and enjoyable. We're excited to
          continue improving and expanding our website, and we hope you enjoy
          using it as much as we enjoyed creating it!
        </p>
      </div>
      <div className="grid grid-cols-2 p-5 m-10">
        <div className="grid-col-1 text-center text-2xl pr-5 border-r-2 border-green">
          Andrew
          <div className="pb-[3px] pt-10">
            <img
              className="rounded-full w-1/3 m-auto"
              src={andrew}
              alt="andrew"
            ></img>
          </div>
          <div className="flex justify-evenly p-5">
            <button
              type="button"
              onClick={() => window.open("https://github.com/theandrewliu")}
            >
              <img className="w-10" src={Github} alt="github icon" />
            </button>
            <button
              type="button"
              onClick={() =>
                window.open("https://www.linkedin.com/in/theandrewliu/")
              }
            >
              <img className="w-10" src={LinkedIn} alt="linkedin icon" />
            </button>
            <button
              type="button"
              onClick={() => window.open("https://andrewliu.app")}
            >
              <img className="w-9" src={Portfolio} alt="portfolio icon" />
            </button>
          </div>
        </div>
        <div className="grid-col-2 text-center text-2xl">
          Yesenia
          <div className="pt-10">
            <img
              className="rounded-full w-1/3 m-auto"
              src={yesenia}
              alt="yesenia"
            ></img>
          </div>
          <div className="flex justify-evenly p-5">
            <button
              type="button"
              onClick={() => window.open("https://github.com/yeseniaramirez14")}
            >
              <img className="w-10" src={Github} alt="github icon" />
            </button>
            <button
              type="button"
              onClick={() =>
                window.open("https://www.linkedin.com/in/yeseniaramirez14/")
              }
            >
              <img className="w-10" src={LinkedIn} alt="linkedin icon" />
            </button>
            <button
              type="button"
              onClick={() => window.open("https://yeseniar.dev/")}
            >
              <img className="w-9" src={Portfolio} alt="portfolio icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
