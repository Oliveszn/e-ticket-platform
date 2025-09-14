import { StagePassLogo } from "./Stagepass-logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#BFDBFE] mt-auto px-6 sm:px-8 lg:px-10">
      <div className="w-full mx-auto max-w-6xl py-8 md:py-10 lg:py-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start justify-between">
          <div className="lg:col-span-2">
            <StagePassLogo size="large" />
            <p className="text-gray-700">
              StagePass is your all-in-one solution for seamless event
              management. Whether you're planning a corporate conference, a
              grand celebration, a trade show, or a virtual webinar, StagePass
              simplifies the entire process.
            </p>
          </div>

          {/* PRODUCTS */}
          <div className="space-y-6">
            <h2 className="footer-header">Product</h2>
            <ul className="space-y-4">
              <li>
                <a href="" className="footer-links">
                  Sell Tickets
                </a>
              </li>
              <li>
                <a href="" className="footer-links">
                  Online Voting
                </a>
              </li>
              <li>
                <a href="" className="footer-links">
                  Event Registration
                </a>
              </li>
              <li>
                <a href="" className="footer-links">
                  Create Your Event
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACTS */}
          <div className="space-y-6">
            <h2 className="footer-header">Contact Us</h2>
            <ul className="space-y-4">
              <li>
                <a href="" className="footer-links">
                  +234 90512312
                </a>
              </li>
              <li>
                <a href="" className="footer-links">
                  +23490512312
                </a>
              </li>
              <li>
                <a href="" className="footer-links">
                  info@stagepass.com
                </a>
              </li>
            </ul>
          </div>

          {/* SOCIAL MEDIA */}
          <div className="space-y-6">
            <h2 className="footer-header">Follow Us</h2>
            <ul className="space-y-4">
              <li>
                <a href="" className="footer-links">
                  Facebook
                </a>
              </li>
              <li>
                <a href="" className="footer-links">
                  X (Twitter)
                </a>
              </li>
              <li>
                <a href="" className="footer-links">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="flex items-center justify-between mt-12 text-gray-500 text-sm lg:text-base">
          <div>© {currentYear} StagePass. All rights reserved.</div>
          <div className="">
            <ul className="flex items-center justify-between gap-6 whitespace-nowrap">
              <li className="">
                <a href="#">Terms of Service</a>
              </li>
              <li className="">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
