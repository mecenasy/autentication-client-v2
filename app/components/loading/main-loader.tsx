'use client'
import { useState, useEffect } from 'react';
import { useTransition, animated } from '@react-spring/web';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/app/hooks/use-auth';

const MESSAGES = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12', 's13', 's14', 's15', 's16'];

interface BackendLoaderProps {
  onComplete: () => void;
}

export const MainLoader = ({ onComplete }: BackendLoaderProps) => {
  const t = useTranslations('loader');
  const { isLoading } = useAuth();

  const [index, setIndex] = useState(isLoading ? 0 : MESSAGES.length - 1);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!isLoading && index !== MESSAGES.length - 1) {
      setIndex(MESSAGES.length - 1);
      setShow(true);
    }
  }, [isLoading, index]);

  useEffect(() => {
    if (!show) return;

    const isLast = index === MESSAGES.length - 1;
    const duration = isLast ? 2000 : 10000;

    const hideTimeout = setTimeout(() => {
      setShow(false);
    }, duration - 1000);

    return () => clearTimeout(hideTimeout);
  }, [index, show]);

  const transitions = useTransition(show ? index : null, {
    from: { opacity: 0, transform: 'translateY(10px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-10px)' },
    config: { duration: 500 },
    onRest: (_result, _ctrl, item) => {
      if (item === index && !show) {
        if (index === MESSAGES.length - 1) {
          onComplete();
          return;
        }

        let nextIndex = index + 1;
        if (!isLoading) {
          nextIndex = MESSAGES.length - 1;
        } else if (index === 5) {
          nextIndex = 5;
        }

        setIndex(nextIndex);
        setShow(true);
      }
    },
  });

  return (
    <div className="relative text-white flex flex-col items-center justify-center w-full min-h-25">
      {transitions((style, i) => {
        return (
          i !== null && (
            <animated.div
              style={style}
              className="absolute text-xl font-medium text-center px-4"
            >
              {t(MESSAGES[i])}
            </animated.div>
          )
        );
      })}
    </div>
  );
};
