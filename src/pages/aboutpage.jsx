import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Particles } from "@/components/magicui/particles";
import { FaDiscord, FaFacebook, FaInstagram } from "react-icons/fa";

const Aboutpage = () => {
  return (
    <div className="relative">
      <div className="fixed inset-0">
        <Particles
          className="w-full h-full opacity-100"
          quantity={140}
          ease={20}
          refresh={true}
          vx={0.1}
          vy={0.1}
        />
      </div>
      <div className="flex justify-center items-center">
        <Card className="max-w-md m-8 z-10 backdrop-blur-lg bg-white/2">
          <CardHeader>
            <CardTitle className="text-3xl font-Poppins">About Us</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Solaris is a poster shop that specializes in creating high-quality
              digital posters. Our team of experienced designers and developers
              work together to bring you the best possible products. We are
              committed to providing excellent customer service and ensuring
              that our customers are completely satisfied with their purchases.
              <div className="flex items-start justify-start gap-4 mt-4">
                <a
                  href="https://discord.com/invite/solaris"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform duration-200"
                >
                  <FaDiscord className="w-8 h-8" />
                </a>
                <a
                  href="https://www.facebook.com/SolarisPosters/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform duration-200"
                >
                  <FaFacebook className="w-8 h-8" />
                </a>
                <a
                  href="https://www.instagram.com/solarisposters/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform duration-200"
                >
                  <FaInstagram className="w-8 h-8" />
                </a>
              </div>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Aboutpage;
