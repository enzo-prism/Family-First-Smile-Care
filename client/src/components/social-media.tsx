import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

// Instagram post URLs extracted from embed codes
const instagramPosts = [
  'https://www.instagram.com/reel/DPC4XC5AYjR/',
  'https://www.instagram.com/p/DOrx8tmjwO4/',
  'https://www.instagram.com/reel/DNrGJb4ZMXi/',
  'https://www.instagram.com/reel/DNYUG_KBaKM/',
  'https://www.instagram.com/p/DNOvY7ny3ey/'
];

export default function SocialMediaSection() {
  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Re-render Instagram embeds when script loads
    script.onload = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };

    // Also trigger process if instgrm is already loaded
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <motion.section 
      className="py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          variants={fadeInUp}
        >
          <div className="flex justify-center items-center gap-2 mb-4">
            <Instagram className="w-8 h-8 text-pink-500" />
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
              Follow Us on Social Media
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest from our practice, dental tips, and behind-the-scenes moments
          </p>
        </motion.div>

        {/* Instagram Posts Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={staggerContainer}
        >
          {instagramPosts.slice(0, 3).map((postUrl, index) => (
            <motion.div
              key={postUrl}
              variants={fadeInUp}
              className="instagram-embed-container flex justify-center"
            >
              <blockquote 
                className="instagram-media" 
                data-instgrm-captioned 
                data-instgrm-permalink={`${postUrl}?utm_source=ig_embed&utm_campaign=loading`}
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: 0,
                  borderRadius: '3px',
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                  margin: '1px',
                  maxWidth: '540px',
                  minWidth: '326px',
                  padding: 0,
                  width: '99.375%'
                }}
              >
                <div style={{ padding: '16px' }}>
                  <a 
                    href={postUrl}
                    style={{
                      background: '#FFFFFF',
                      lineHeight: 0,
                      padding: 0,
                      textAlign: 'center',
                      textDecoration: 'none',
                      width: '100%'
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View this post on Instagram
                  </a>
                </div>
              </blockquote>
            </motion.div>
          ))}
        </motion.div>

        {/* Second Row - Last 2 Posts Centered */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mt-8 max-w-4xl mx-auto"
          variants={staggerContainer}
        >
          {instagramPosts.slice(3, 5).map((postUrl, index) => (
            <motion.div
              key={postUrl}
              variants={fadeInUp}
              className="instagram-embed-container flex justify-center"
            >
              <blockquote 
                className="instagram-media" 
                data-instgrm-captioned 
                data-instgrm-permalink={`${postUrl}?utm_source=ig_embed&utm_campaign=loading`}
                data-instgrm-version="14"
                style={{
                  background: '#FFF',
                  border: 0,
                  borderRadius: '3px',
                  boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                  margin: '1px',
                  maxWidth: '540px',
                  minWidth: '326px',
                  padding: 0,
                  width: '99.375%'
                }}
              >
                <div style={{ padding: '16px' }}>
                  <a 
                    href={postUrl}
                    style={{
                      background: '#FFFFFF',
                      lineHeight: 0,
                      padding: 0,
                      textAlign: 'center',
                      textDecoration: 'none',
                      width: '100%'
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View this post on Instagram
                  </a>
                </div>
              </blockquote>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-12"
          variants={fadeInUp}
        >
          <a 
            href="https://www.instagram.com/famfirstsmilecare/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-full hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
            data-testid="button-follow-instagram"
          >
            <Instagram className="w-5 h-5" />
            Follow @famfirstsmilecare
          </a>
        </motion.div>
      </div>

      {/* Custom CSS for Instagram embed responsiveness */}
      <style jsx>{`
        .instagram-embed-container {
          width: 100%;
        }
        
        .instagram-embed-container .instagram-media {
          width: 100% !important;
          max-width: 540px !important;
        }

        @media (max-width: 640px) {
          .instagram-embed-container .instagram-media {
            min-width: 100% !important;
          }
        }
      `}</style>
    </motion.section>
  );
}