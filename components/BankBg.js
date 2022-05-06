import { useSpring, animated } from "react-spring";

const BankBg = () => {
  const styles = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: 360 },
    config: {
      mass: 10000,
      duration: 300000,
    },
  });
  const stylesReverse = useSpring({
    loop: true,
    from: { rotateZ: 0 },
    to: { rotateZ: -360 },
    config: {
      mass: 10000,
      duration: 300000,
    },
  });

  return (
    <>
      <div
        className="absolute bottom-1/3 -right-200  transform -translate-x-1/2  pointer-events-none -z-1 -rotate-90"
        aria-hidden="true"
      >
        <animated.div
          style={{
            ...styles,
          }}
        >
          <svg width="1056" height="692" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="shadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                <feOffset dx="0" dy="0" result="offsetblur" />
                <feFlood floodColor="#0DB6D4" />
                <feComposite in2="offsetblur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="grad3">
                <stop offset="20%" stopColor="#06B6D4" />
                <stop offset="80%" stopColor="#00739D" />
              </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <path
                filter="url(#shadow)"
                fill="#DADADA"
                d="M324 411v107.999l-108 48.085L323.999 411z"
              />

              <path
                filter="url(#shadow)"
                fill="#DADADA"
                d="M581.649 279.235l-102.49-34.373 124.272-74.407z"
              />

              <path
                filter="url(#shadow)"
                d="M729.866 411.103l15.25 21.253 1.397-.522-.728 1.453.344.48-.719.268-52.076 104.006.466.65-.66-.264-.71 1.417-.715-.287-110.281-44.182-.296.11-.231-.323-1.783-.713 1.001-.374-15.25-21.254 3.236-1.21-.23-.318.522.208 161.463-60.398zm-2.426 2.619l14.046 20.134 2.012-.796-14.045-20.134-2.013.796zm-2.18.782L570.506 472.59l32.362 12.95 56.771-21.309 50.138-18.818 15.485-30.908zm1.562 1.598l-13.893 27.941 27.145-9.79-13.252-18.151zM677.53 515.17l14.155 19.744 49.119-98.07-29.6 11.096-33.674 67.23zm30.672-66.603L607.227 486.73l68.18 27.21 32.795-65.373zm-103.025 39.08l-17.345 6.647 66.366 26.343 35.07 13.92-13.35-18.83-70.741-28.08zm-32.174-13.005l12.344 17.486 16.115-6.228-28.46-11.258zm-5.225-.719l14.55 19.77 1.596-.566-14.551-19.77-1.595.566z"
                fill="#DADADA"
              />
              <path
                filter="url(#shadow)"
                stroke="#DADADA"
                strokeWidth="2"
                d="M546 350l59 69-69.088-17.704z"
              />
            </g>
          </svg>
        </animated.div>
      </div>

      <div
        className="absolute top-2/4  transform -translate-x-1/2  pointer-events-none -z-1 -rotate-90"
        aria-hidden="true"
      >
        <animated.div
          style={{
            ...styles,
          }}
        >
          <svg width="1056" height="692" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="shadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                <feOffset dx="0" dy="0" result="offsetblur" />
                <feFlood floodColor="#0DB6D4" />
                <feComposite in2="offsetblur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="grad3">
                <stop offset="20%" stopColor="#06B6D4" />
                <stop offset="80%" stopColor="#00739D" />
              </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <path
                fill="url(#grad3)"
                d="M581.649 279.235l-102.49-34.373 124.272-74.407z"
              />
              <path
                filter="url(#shadow)"
                d="M729.866 411.103l15.25 21.253 1.397-.522-.728 1.453.344.48-.719.268-52.076 104.006.466.65-.66-.264-.71 1.417-.715-.287-110.281-44.182-.296.11-.231-.323-1.783-.713 1.001-.374-15.25-21.254 3.236-1.21-.23-.318.522.208 161.463-60.398zm-2.426 2.619l14.046 20.134 2.012-.796-14.045-20.134-2.013.796zm-2.18.782L570.506 472.59l32.362 12.95 56.771-21.309 50.138-18.818 15.485-30.908zm1.562 1.598l-13.893 27.941 27.145-9.79-13.252-18.151zM677.53 515.17l14.155 19.744 49.119-98.07-29.6 11.096-33.674 67.23zm30.672-66.603L607.227 486.73l68.18 27.21 32.795-65.373zm-103.025 39.08l-17.345 6.647 66.366 26.343 35.07 13.92-13.35-18.83-70.741-28.08zm-32.174-13.005l12.344 17.486 16.115-6.228-28.46-11.258zm-5.225-.719l14.55 19.77 1.596-.566-14.551-19.77-1.595.566z"
                fill="#DADADA"
              />
              <path
                filter="url(#shadow)"
                stroke="#DADADA"
                strokeWidth="2"
                d="M546 350l59 69-69.088-17.704z"
              />
            </g>
          </svg>
        </animated.div>
      </div>

      <div
        className="absolute inset-y-0 -bottom-2/3 -right-0 pointer-events-none -z-1 origin-center rotate-0"
        aria-hidden="true"
      >
        <animated.div
          style={{
            ...stylesReverse,
          }}
        >
          <svg width="956" height="792" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="shadow">
                <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
                <feOffset dx="0" dy="0" result="offsetblur" />
                <feFlood floodColor="#0DB6D4" />
                <feComposite in2="offsetblur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="grad3">
                <stop offset="20%" stopColor="#06B6D4" />
                <stop offset="80%" stopColor="#00739D" />
              </linearGradient>
            </defs>
            <g fill="none" fillRule="evenodd">
              <path
                filter="url(#shadow)"
                fill="#DADADA"
                d="M324 411v107.999l-108 48.085L323.999 411z"
              />

              <path
                fill="url(#grad3)"
                d="M581.649 279.235l-102.49-34.373 124.272-74.407z"
              />

              <path
                filter="url(#shadow)"
                d="M729.866 411.103l15.25 21.253 1.397-.522-.728 1.453.344.48-.719.268-52.076 104.006.466.65-.66-.264-.71 1.417-.715-.287-110.281-44.182-.296.11-.231-.323-1.783-.713 1.001-.374-15.25-21.254 3.236-1.21-.23-.318.522.208 161.463-60.398zm-2.426 2.619l14.046 20.134 2.012-.796-14.045-20.134-2.013.796zm-2.18.782L570.506 472.59l32.362 12.95 56.771-21.309 50.138-18.818 15.485-30.908zm1.562 1.598l-13.893 27.941 27.145-9.79-13.252-18.151zM677.53 515.17l14.155 19.744 49.119-98.07-29.6 11.096-33.674 67.23zm30.672-66.603L607.227 486.73l68.18 27.21 32.795-65.373zm-103.025 39.08l-17.345 6.647 66.366 26.343 35.07 13.92-13.35-18.83-70.741-28.08zm-32.174-13.005l12.344 17.486 16.115-6.228-28.46-11.258zm-5.225-.719l14.55 19.77 1.596-.566-14.551-19.77-1.595.566z"
                fill="#DADADA"
              />
              <path
                filter="url(#shadow)"
                stroke="#DADADA"
                strokeWidth="2"
                d="M546 350l59 69-69.088-17.704z"
              />
            </g>
          </svg>
        </animated.div>
      </div>
    </>
  );
};

export default BankBg;
