"use client";

import { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Image from 'next/image';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from '@/src/api/api';
import { v4 as uuid } from 'uuid';
import { io, Socket } from 'socket.io-client';
import { useRouter } from '@/app/components/navigation/navigation';
import { useTranslations } from 'next-intl';

interface Response {
  dataUrl: string;
  challenge: string;
}

export default function QrAuth() {
  const [nonce] = useState(uuid())
  const webSocketUrl = useRef<Socket | null>(null);
  const router = useRouter();
  const t = useTranslations('qrCode');


  const { data } = useQuery<Response>({
    queryKey: ['qr-auth'],
    queryFn: async () => {
      try {

        const { data } = await axios.post<Response>('/api/qr-auth/challenge', {
          nonce,
        });
        return data;
      } catch (error) {
        throw new Error(error as string);
      }
    },
    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      return axios.post("/api/qr-auth/login", {
        challenge: data?.challenge,
        nonce
      });
    },
    onSuccess: () => {
      alert(t('success'));
      router.replace("/");
    },
    onError: () => {
      alert(t('alert'));
      router.replace("/");
    }
  })

  useEffect(() => {
    if (data?.challenge) {
      webSocketUrl.current = io(`${process.env.NEXT_PUBLIC_API_HOST_URL}/getaway`, {
        query: {
          challenge: data.challenge,
        },
        transports: ['websocket'],
      });

      webSocketUrl.current.on('challenge', ({ status, type, ...rest }) => {
        if (nonce === rest.nonce && type === 'QR-AUTH') {
          switch (status) {
            case 'verified':
              mutation.mutate();
              break;
            case 'rejected':
              alert(t('canceled'));
              router.replace("/");
              break;
            default:
              alert(t('error'));
              router.replace("/");
              break;
          }
        } else {
          alert(t('alert'));
        }

        webSocketUrl.current?.close();
      });
    };

    return () => {
      if (webSocketUrl.current) {
        webSocketUrl.current.close();
      }
    };
  }, [data?.challenge, mutation, t, router, nonce]);

  const animationProps = useSpring({
    from: { opacity: 0, height: '0px', marginTop: '0px' },
    to: { opacity: 1, height: data?.dataUrl ? '460px' : '0px', marginTop: data?.dataUrl ? '16px' : '0px' },
    config: { tension: 200, duration: 200, friction: 20 },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 font-sans">
      <main className="w-full max-w-md p-8 space-y-8 bg-gray-900 rounded-lg shadow-lg">
        <animated.div style={animationProps} className="flex overflow-hidden flex-col items-center">
          <h1 className="text-white text-center text-2xl font-bold mb-8">
            {t('title')}
          </h1>
          <div className="p-4 bg-white rounded-lg">
            {data?.dataUrl && <Image src={data?.dataUrl} alt="QR Code" width={200} height={200} />}
          </div>
          <p className="text-white text-center mt-10">
            {t('description')}
          </p>
        </animated.div>
      </main>
    </div>
  );
}
