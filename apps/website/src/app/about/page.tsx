'use client';

import {useEffect, useState} from 'react';

const AboutPage = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 my-8 items-center pt-[700px]">
        {show && (
          <div id="target3" className="bg-blue-500 text-white p-4 rounded-lg">
            Target 3
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
