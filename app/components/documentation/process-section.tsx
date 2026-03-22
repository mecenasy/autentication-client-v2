'use client';

import { useTranslations } from 'next-intl';
import { CodeBlock } from './code-block';

export const ProcessSection = () => {
  const t = useTranslations('documentation');
  const tCode = useTranslations('documentation.code_blocks');

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-white mb-6 border-b border-gray-700 pb-2">{t('sections.process.title')}</h2>

      <div className="mb-10">
        <h3 className="text-xl font-medium text-white mb-3">{t('sections.process.step1.title')}</h3>
        <p className="mb-4 text-gray-300">
          {t('sections.process.step1.desc')}
          <br />
          {t('sections.process.step1.param')}
          <code className="bg-gray-800 px-1 rounded text-green-400">{t('sections.process.step1.nonce')}</code>
        </p>

        <CodeBlock code={
          `const openLogin = () => { 
// ${tCode('open_login_comment_1')} 
const nonce = crypto.randomUUID(); 
sessionStorage.setItem('auth_nonce', nonce); 

const clientId = "${tCode('your_client_id')}"; 

// ${tCode('open_login_comment_2')} 
const loginUrl = https://auth-provider.com/login/CLIENT_ID?nonce=\${nonce}; 

// ${tCode('open_login_comment_3')} 
window.open(loginUrl, 'AuthWindow', 'width=500,height=600'); 
};`
        } />
      </div>
      <div className="mb-10">
        <h3 className="text-xl font-medium text-white mb-3">{t('sections.process.step2.title')}</h3>
        <p className="mb-4 text-gray-300">
          {t('sections.process.step2.desc')}
        </p>
        <p className="mb-2 text-gray-300 font-semibold">{t('sections.process.step2.structure')}</p>
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('sections.process.step2.p1').split('|')[1].trim()}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  {t('sections.process.step2.p1').split('|')[2].trim()}
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-900 divide-y divide-gray-700">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{t('sections.process.step2.p3').split('|')[1].trim()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{t('sections.process.step2.p3').split('|')[2].trim()}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{t('sections.process.step2.p4').split('|')[1].trim()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{t('sections.process.step2.p4').split('|')[2].trim()}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{t('sections.process.step2.p5').split('|')[1].trim()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{t('sections.process.step2.p5').split('|')[2].trim()}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-2"><strong className="text-white">{t('sections.process.step2.task')}</strong></p>

        <CodeBlock code={
          `window.addEventListener('message', async (event) => { 
// ${tCode('listener_comment_1')} 
// ${tCode('listener_comment_2')} 
if (event.origin !== "https://auth-provider.com") return; 

// ${tCode('listener_comment_3')} 
// ${tCode('listener_comment_4')} 
if (!event.data || event.data.type !== 'AUTH_SUCCESS') { return; } 

// ${tCode('listener_comment_5')} 
const { token, nonce: receivedNonce } = event.data.payload || event.data; 
const storedNonce = sessionStorage.getItem('auth_nonce'); 

// ${tCode('listener_comment_6')} 
if (receivedNonce !== storedNonce) { 
console.error("${tCode('listener_error_nonce')}"); 
return; 
} 

console.log("${tCode('listener_success_token')}"); 

// ${tCode('listener_comment_7')} 
try { 
const response = await fetch('/api/auth/verify', { 
  method: 'POST', 
  headers: { 'Content-Type': 'application/json' }, 
  body: JSON.stringify({ token }) 
}); 

const result = await response.json(); 

if (result.success) { 
  // ${tCode('listener_comment_8')} 
  sessionStorage.removeItem('auth_nonce'); 
  // ${tCode('listener_comment_9')} 
  localStorage.setItem('user_jwt', result.userToken); 
  window.location.href = '/dashboard'; 
} else { 
  alert("${tCode('listener_error_login')}" + result.error); 
} 
} catch (err) { 
console.error("${tCode('listener_error_critical')}", err); 
} 
});`} />1383 7143
      </div>

      <h2 className="text-2xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">{t('sections.process.step3.title')}</h2>
      <p className="mb-4 text-gray-300">{t('sections.process.step3.desc')}</p>

      <div className="bg-gray-800 p-4 rounded-lg mb-6 border border-gray-700">
        <p className="font-mono text-green-400">{t('sections.process.step3.endpoint')}</p>
      </div>

      <p className="mb-2 font-semibold">{t('sections.process.step3.params')}</p>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                {t('sections.process.step3.p1').split('|')[1].trim()}
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                {t('sections.process.step3.p1').split('|')[2].trim()}
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-900 divide-y divide-gray-700">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{t('sections.process.step3.p3').split('|')[1].trim()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{t('sections.process.step3.p3').split('|')[2].trim()}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{t('sections.process.step3.p4').split('|')[1].trim()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{t('sections.process.step3.p4').split('|')[2].trim()}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{t('sections.process.step3.p5').split('|')[1].trim()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{t('sections.process.step3.p5').split('|')[2].trim()}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <CodeBlock code={
        `const express = require('express');
const axios = require('axios'); // ${tCode('express_comment_1')}
const router = express.Router();

// ${tCode('express_comment_2')}
const CONFIG = {
CLIENT_ID: '${tCode('your_client_id')}',
CLIENT_SECRET: '${tCode('your_secret_key')}',
VERIFY_URL: 'https://auth-provider.com/api/verify',
FRONTEND_URL: '${tCode('your_frontend_url')}'
};

router.post('/api/auth/verify', async (req, res) => {
const { token } = req.body;

if (!token) {
    return res.status(400).json({ error: '${tCode('express_error_no_token')}' });
}

try {
    // ${tCode('express_comment_3')}
    const response = await axios.post(CONFIG.VERIFY_URL, {
        clientId: CONFIG.CLIENT_ID,
        clientUrl: CONFIG.FRONTEND_URL,
        token: token
    });

    const { 
      accessToken,
      secret,
      accessTokenExpiredIn,
      email,
      refreshToken,
      refreshTokenExpiredIn
      } = response.data;

    // ${tCode('express_comment_4')}
    // await redis.set("session:\${email}", secret, 'EX', accessTokenExpiredIn);
    // await redis.set("refresh:\${email}", refreshToken, 'EX', refreshTokenExpiredIn);

    // ${tCode('express_comment_5')}
    res.json({
        success: true,
        accessToken,
        email: email
    });

} catch (error) {
    console.error('${tCode('express_error_verification')}', error.response?.data || error.message);
    res.status(401).json({ error: '${tCode('express_error_invalid_token')}' });
}
});

module.exports = router;`} />
    </section>
  );
};
