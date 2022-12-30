import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { InfluwebState } from './utils/ConfigureState';

const Facebook: React.FC = () => {

  const cookiePreferences = useSelector((state: InfluwebState) => state.cookie.preferences);
  const contactVerified = useSelector((state: InfluwebState) => state.signup.contactVerified);
  const [facebookLoaded, setFacebookLoaded] = useState(false);

  const instance = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(! cookiePreferences[4]) {
      return;
    }

    const script = document.createElement('script');
    script.type = "text/javascript";
    script.text =
    `!function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
          n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');
      fbq('set', 'autoConfig', 'false', '885560619519980');
      fbq('init', '885560619519980');
      fbq('track', 'PageView');
    `;

    const noScript = document.createElement('noscript');
    const pixel = document.createElement('img');
    pixel.height = 1;
    pixel.width = 1;
    pixel.style.cssText = 'display:none';
    pixel.src = 'https://www.facebook.com/tr?id=885560619519980&ev=PageView&noscript=1';

    noScript.appendChild(pixel);


    if(instance !== null && instance.current !== null) {
      instance.current.appendChild(script);
      instance.current.appendChild(noScript);
    }

    setTimeout(() => setFacebookLoaded(true), 0);

    }, [cookiePreferences]);

    useEffect(() => {
      if (contactVerified && facebookLoaded) {
        const _window: Window | any = window;
        _window.fbq('track', 'Lead');
      }
    }, [contactVerified, facebookLoaded]);

  return (
    <>
      <div ref={instance} />
    </>
  );
};

export default Facebook;
