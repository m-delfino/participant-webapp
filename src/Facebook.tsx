import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { InfluwebState } from './utils/ConfigureState';

const Facebook: React.FC = () => {
  const cookiePreferences = useSelector((state: InfluwebState) => state.cookie.preferences);
  const contactVerified = useSelector((state: InfluwebState) => state.signup.contactVerified);
  const [facebookLoaded, setFacebookLoaded] = useState(false);

  const instance = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      fbq('consent', 'revoke');
      fbq('init', '885560619519980');
      fbq('track', 'PageView');
    `;

    if(instance !== null && instance.current !== null) {
      instance.current.appendChild(script);
    }

  }, []);

  useEffect(() => {
    function checkFacebookLoaded() {
      const _window: Window | any = window;

      if (_window.fbq.callMethod) {
        setFacebookLoaded(true);
        clearInterval(intervalId);
      }
    }

    const intervalId = setInterval(checkFacebookLoaded, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if(facebookLoaded) {
      const _window: Window | any = window;
      const metricPermission = cookiePreferences['4'] ? 'grant' : 'revoke';
      _window.fbq('consent', metricPermission);
    }
  }, [cookiePreferences, facebookLoaded]);

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
