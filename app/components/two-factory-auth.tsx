"use client";

import { useState } from 'react';
import QrVerify from './qr-verification';
import { Enable2fa } from './enable-2fa';

interface TwoFactorAuthProps {
  isInitiallyEnabled: boolean;
  login: string
}

export default function TwoFactorAuth({ isInitiallyEnabled, login }: TwoFactorAuthProps) {
  const [qrCode, setQrCode] = useState<string>('');

  const onSuccess = () => {
    setQrCode('');
  };

  return (
    <div className="w-full max-w-md p-6 bg-gray-700 rounded-lg mt-6">
      <Enable2fa init={isInitiallyEnabled} setQrCode={setQrCode} />
      <QrVerify qrCode={qrCode} login={login} onSuccess={onSuccess} />
    </div>
  );
}
