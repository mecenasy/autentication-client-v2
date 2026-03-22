import { useState } from 'react';
import { EnableBiometrics } from './enable-biometrics';
import BiometricsSettings from './biometrics-settings';


const Biometrics = () => {
  const [show, setShow] = useState<boolean | undefined>(false)

  return (
    <div className='w-full max-w-md p-6 bg-gray-700 rounded-lg mt-6' >
      {show && <EnableBiometrics setShow={setShow} />}
      <BiometricsSettings setShow={setShow} />
    </div>
  )
};

export default Biometrics;
