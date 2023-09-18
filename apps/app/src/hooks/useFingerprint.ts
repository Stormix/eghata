import storage from '@/lib/storage';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { useEffect, useState } from 'react';

const useFingerprint = () => {
  const [fingerprint, setFingerprint] = useState<string | null>(storage.getFingerprint() ?? null);
  const set = (fingerprint: string) => {
    storage.setFingerprint(fingerprint);
    setFingerprint(fingerprint);
  };

  useEffect(() => {
    if (fingerprint) return;
    const getFingerprint = async () => {
      console.log('loading fingerprint');
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();

      set(visitorId);
    };

    getFingerprint();
  }, []);

  return {
    fingerprint,
    set
  };
};

export default useFingerprint;
